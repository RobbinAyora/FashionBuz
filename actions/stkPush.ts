'use server'
import axios from "axios";

// Define Params Interface
interface Params {
  phoneNumber: string;
  amount: number;
  name?: string;
  email?: string;
  address?: string;
}

// Create the function
export const sendStkPush = async (body: Params) => {
  try {
    const mpesaEnv = process.env.MPESA_ENVIRONMENT;
    const MPESA_BASE_URL =
      mpesaEnv === "live"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";

    const { phoneNumber, name = "Customer", amount } = body;

    // 🔐 Generate access token
    const auth: string = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const tokenRes = await axios.get(
      `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const token = tokenRes.data.access_token;

    // 📱 Format the phone number (assumes starting with 07...)
    const cleaned = phoneNumber.replace(/\D/g, ""); // remove non-digits
    const formattedPhone = cleaned.startsWith("254")
      ? cleaned
      : `254${cleaned.slice(-9)}`;

    // 🕒 Generate timestamp
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    // 🧾 Build the STK Push payload
    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL!,
      AccountReference: name,
      TransactionDesc: `Payment for ${name}`,
    };

    console.log("📲 Sending STK Push:", payload);

    // 📤 Send STK Push request
    const stkPushResp = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ STK push success:", stkPushResp.data);
    return stkPushResp.data;
  } catch (error: any) {
    console.error("❌ STK push failed:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.errorMessage || "STK push failed. Try again later."
    );
  }
};








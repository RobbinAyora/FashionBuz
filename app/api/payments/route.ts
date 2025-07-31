import { connectDB } from "@/lib/db";
import Payments from "@/models/Payments";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB();
    const payments = await Payments.find().sort({ createdAt: -1} )
    return NextResponse.json(payments)
}
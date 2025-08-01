import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import connectDB from '@/utils/connectDB'
import Users from '@/models/Users'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  const { email, password } = req.body

  const user = await Users.findOne({ email })
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' })

  res.setHeader('Set-Cookie', serialize('token', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24
  }))

  res.status(200).json({ message: 'Logged in' })
}

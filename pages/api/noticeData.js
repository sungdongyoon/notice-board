import { connectDB } from "@/utill/database";

export default async function handler(req, res) {
  const db = await connectDB;
  const collection = db.collection("notice-board");
  const noticeData = await collection.find({}).toArray();

  res.status(200).json({ noticeData });
}
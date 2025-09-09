import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Task from "@/app/models/task.model";

// GET all tasks
export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

// POST new task
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newTask = await Task.create(body);
  return NextResponse.json(newTask);
}
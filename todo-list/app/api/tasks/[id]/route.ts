import { NextResponse } from "next/server";
import {connectDB} from "@/app/lib/mongodb";
import ITaskDocument from "@/app/models/task.model";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }>  }
) {
  await connectDB(); // kết nối mongo
 const { id } = await context.params; // cần await
  const body = await req.json();

  try {
    const task = await ITaskDocument.findByIdAndUpdate(
      id, body, { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
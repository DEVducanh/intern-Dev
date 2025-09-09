"use client";
import { ITask } from "@/types/task.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import useCreate from "../hook/useCreate";
import { useForm } from "react-hook-form";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ITaskDocument } from "./../models/task.model";

function DraggableTask({
  task,
  children,
}: {
  task: ITask;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-700 p-3 rounded-md mb-2 flex justify-between items-center"
    >
      {/* Nội dung card (form edit, text, button Edit...) */}
      <div className="flex-1">{children}</div>

      {/* Drag handle riêng */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-2 py-1 bg-gray-600 rounded ml-2"
        title="Kéo thả"
      >
        ☰
      </div>
    </div>
  );
}

function DroppableColumn({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-gray-800 rounded-lg p-4 w-1/3">
      {children}
    </div>
  );
}

const Tasktable = () => {
  const createTask = useCreate();
  const queryClient = useQueryClient();
  const [showInput, setShowInput] = useState(false);
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
  } = useForm<ITask>();

  const { data } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/tasks");
      return res.data;
    },
  });

  const onSubmit = (value: ITask) => {
    createTask.mutate({
      ...value,
      // status: "todo", // mặc định khi thêm task
    });
    setShowInput(false);
  };

  //   Edit Task
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm<{ text: string }>();

  // Chọn task để edit
  const taskToEdit = data?.find((task) => task._id === editingId);

  useEffect(() => {
    if (taskToEdit) {
      resetEdit({ text: taskToEdit.text });
    }
  }, [taskToEdit, resetEdit]);

  const Edit = useMutation({
    mutationFn: async (value: { text: string }) => {
      if (!taskToEdit) return;
      return axios.put(`/api/tasks/${taskToEdit._id}`, value);
    },
    onSuccess: () => {
      alert("Success");
      setEditingId(null); // tắt edit
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const OnEdit = (value: { text: string }) => {
    Edit.mutate(value);
  };

  // Update lại status
  const updateStatus = useMutation({
    mutationFn: async (task: ITask) =>
      axios.put(`/api/tasks/${task._id}`, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const task = data?.find((t) => t._id === active.id);
    if (!task) return;

    // Nếu thả vào cột mới → update status
    if (task.status !== over.id) {
      updateStatus.mutate({ ...task, status: over.id as ITask["status"] });
    }
  };

  // const columns = {
  //   todo: "Cần làm",
  //   doing: "Đang làm",
  //   done: "Đã xong",
  // };

  const columns = useMemo(() => {
    return [
      {
        colId: "todo",
        title: "Cần Làm",
        dataList: (data || [])?.filter((task) => task.status === "todo"),
      },
      {
        colId: "doing",
        title: "Đang Làm",
        dataList: (data || [])?.filter((task) => task.status === "doing"),
      },
      {
        colId: "done",
        title: "Đã xong",
        dataList: (data || [])?.filter((task) => task.status === "done"),
      },
    ];
  }, [data]);

  return (
    <div className=" bg-gray-700  min-h-screen p-6 text-white">
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {columns.map(({ colId, title, dataList }) => (
            <DroppableColumn id={colId} key={colId}>
              <h2 className="text-lg font-semibold mb-4">{title}</h2>

              {dataList?.map((task) => (
                <DraggableTask key={task._id} task={task}>
                  {/* Giữ nguyên UI task của bạn ở đây */}
                  <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center mb-2">
                    {editingId === task._id ? (
                      <form
                        onSubmit={handleSubmitEdit(OnEdit)}
                        className="flex space-x-2 w-full"
                      >
                        <input
                          {...registerEdit("text", { required: true })}
                          className="border px-2 py-1 rounded flex-1 text-black"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-yellow-400 text-white rounded"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <span>{task.text}</span>
                        <button
                          className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
                          onClick={() => setEditingId(task._id)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </DraggableTask>
              ))}

              {/* Giữ nguyên form thêm task của bạn */}
              {colId === "todo" && showInput && (
                <form
                  onSubmit={handleSubmitAdd(onSubmit)}
                  className="mt-2 flex space-x-2"
                >
                  <input
                    {...registerAdd("text", { required: true })}
                    className="flex-1 p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    placeholder="Nhập nhiệm vụ..."
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                    onClick={() => setShowInput(false)}
                  >
                    Hủy
                  </button>
                </form>
              )}
              {colId === "todo" && !showInput && (
                <button
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  onClick={() => setShowInput(true)}
                >
                  + Thêm thẻ
                </button>
              )}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Tasktable;

"use client";
import { ITask } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useCreate from "../hook/useCreate";
import { useForm } from "react-hook-form";

const Tasktable = () => {
  const createTask = useCreate();
  const queryClient = useQueryClient();
  const [showInput, setShowInput] = useState(false);
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
  } = useForm<ITask>();
  const { data, isLoading, error } = useQuery<ITask[]>({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/tasks");
      return res.data;
    },
  });

  const onSubmit = (value: ITask) => {
    createTask.mutate(value);
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
  const taskToEdit = data?.find((task) => task.id === editingId);

  useEffect(() => {
    if (taskToEdit) {
      resetEdit({ text: taskToEdit.text });
    }
  }, [taskToEdit, resetEdit]);

  const Edit = useMutation({
    mutationFn: async (value: { text: string }) => {
      if (!taskToEdit) return;
      return axios.put(`http://localhost:3001/tasks/${taskToEdit.id}`, value);
    },
    onSuccess: () => {
      alert("Success");
      setEditingId(null); // tắt edit
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  const OnEdit = (value: { text: string }) => {
    Edit.mutate(value);
  };
  //   if (isLoading) return <p>Loading...</p>;
  //   if (error instanceof Error) return <p>Error: {error.message}</p>;
  return (
    <body className="bg-gray-700  min-h-screen p-6 text-white">
      <div className="flex space-x-4">
        {/* <!-- Cột: Cần làm --> */}

        <div className="bg-gray-800 rounded-lg p-4 w-1/3">
          <h2 className="text-lg font-semibold mb-4">Cần làm</h2>
          <div className="space-y-2">
            {data?.map((task) => (
              <div
                className="bg-gray-700 p-3 rounded-md flex justify-between items-center"
                key={task.id}
              >
                {editingId === task.id ? (
                  <form
                    onSubmit={handleSubmitEdit(OnEdit)}
                    className="flex space-x-2"
                  >
                    <input
                      {...registerEdit("text", { required: true })}
                      className="border px-2 py-1 rounded flex-1"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  task.text
                )}

                <button
                  className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  onClick={() => setEditingId(task.id)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>

          {showInput && (
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
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Thêm
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
                onClick={() => setShowInput(false)}
              >
                Hủy
              </button>
            </form>
          )}

          <button
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center"
            onClick={() => setShowInput(true)}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Thêm thẻ
          </button>
        </div>

        {/* <!-- Cột: Đang làm --> */}
        {/* <div className="bg-gray-800 rounded-lg p-4 w-1/3">
          <h2 className="text-lg font-semibold mb-4">Đang làm</h2>
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded-md">Task 2</div>
          </div>
          <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Thêm thẻ
          </button>
        </div> */}

        {/* <!-- Cột: Đã xong --> */}
        {/* <div className="bg-gray-800 rounded-lg p-4 w-1/3">
          <h2 className="text-lg font-semibold mb-4">Đã xong</h2>
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded-md">Task 1</div>
            <div className="bg-gray-700 p-3 rounded-md">gggg</div>
          </div>
          <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Thêm thẻ
          </button>
        </div> */}
      </div>
    </body>
  );
};

export default Tasktable;

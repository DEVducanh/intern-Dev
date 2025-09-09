"use client";
import { ITask } from "@/types/task.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const TodoList = () => {
  const queryClient = useQueryClient();
  // Lấy dữ liệu
  const { data, isLoading, error } = useQuery<ITask[]>({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/tasks");
      return res.data;
    },
  });

  // Xóa Task
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`http://localhost:3001/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  const deleteTask = async (id: string) => {
    if (window.confirm("Xoa ?")) {
      mutate(id);
    }
  };

  //   Editing task
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  // Chọn task để edit
  const taskToEdit = data?.find((task) => task._id === editingId);

  // Khi bắt đầu edit → reset form
  useEffect(() => {
    if (taskToEdit) {
      reset({ text: taskToEdit.text });
    }
  }, [taskToEdit, reset]);

  // Mutation update task
  const Edit = useMutation({
    mutationFn: async (value: { text: string }) => {
      if (!taskToEdit) return;
      return axios.put(`http://localhost:3001/tasks/${taskToEdit._id}`, value);
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
  // -----------------------------------------------------
  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 border border-gray-300">
                {editingId === task._id ? (
                  <form
                    onSubmit={handleSubmit(OnEdit)}
                    className="flex space-x-2"
                  >
                    <input
                      {...register("text", { required: true })}
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
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center space-x-2">
                {editingId !== task._id && (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setEditingId(task._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

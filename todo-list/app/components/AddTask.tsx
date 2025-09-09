"use client";

import { ITask } from "@/types/task.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddTask = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>();

  const { mutate } = useMutation({
    mutationFn: async (value: ITask) => {
      return await axios.post("http://localhost:3001/tasks", value);
    },
    onSuccess: () => {
      alert("Succsess");
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  const addTask = (value: ITask) => {
    mutate(value);
  };
  return (
    <div className="p-4 border rounded shadow-sm space-y-4">
      <form
        onSubmit={handleSubmit(addTask)}
        className="flex items-center space-x-2"
      >
        <input
          {...register("text", { required: true })}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;

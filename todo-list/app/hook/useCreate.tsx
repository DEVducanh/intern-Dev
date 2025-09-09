// import { ITask as ITaskType } from "@/types/task.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ITask } from "@/types/task.type";


const useCreate = () => {
  const queryClient = useQueryClient();
  const createTask = useMutation({
    mutationFn: async (value: ITask) => {
      return await axios.post("/api/tasks", value);
    },
    onSuccess: () => {
      alert("Succsess");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return createTask;
};

export default useCreate;

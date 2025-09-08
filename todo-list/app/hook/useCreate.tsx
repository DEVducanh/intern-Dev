import { ITask } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const useCreate =  () => {
    const queryClient = useQueryClient();
    const createTask = useMutation({
        mutationFn: async (value: ITask) => {
          return await axios.post("http://localhost:3001/tasks", value);
        },
        onSuccess: () => {
          alert("Succsess");
          queryClient.invalidateQueries({ queryKey: ["task"] });
        },
      });
  return  createTask
}

export default useCreate

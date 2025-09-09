import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiBase } from "../utils/axios";
import { ITask } from "@/types/task.type";

export const requestCreateTask = (): Promise<AxiosResponse<ITask[]>> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/api/tasks",
  };
  return apiBase(config);
};

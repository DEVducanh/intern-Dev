export interface ITask {
  _id: string;
  text: string;
  status?: "todo" | "doing" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}
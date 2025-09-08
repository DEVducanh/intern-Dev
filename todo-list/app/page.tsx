import AddTask from "./components/AddTask";
import Tasktable from "./components/Tasktable";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <html className="max-w-4xl mx-auto mt-4 bg-blue-600">
      <Tasktable />
    </html>
  );
}

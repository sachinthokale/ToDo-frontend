import axios from "axios";
import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          "https://todo-backend-6bnq.onrender.com/get-tasks"
        );

        if (response.status == 200) {
          setTasks(response.data.tasks);
          console.log(response.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);

  const handleDelete = (taskId) => {
    console.log("home ", taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };
  return (
    <div className=" w-screen h-auto p-2  bg-gray-200">
      <div className="w-full flex flex-wrap gap-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;

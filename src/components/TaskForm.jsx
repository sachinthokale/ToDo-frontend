import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const { taskId } = useParams();
  const location = useLocation();
  console.log(location.state);
  console.log(taskId);

  useEffect(() => {
    if (location.state) {
      const { title, description, status, dueDate } = location.state;

      setTitle(title);
      setDescription(description);
      setStatus(status);
      setDueDate(new Date(dueDate).toISOString().split("T")[0]);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskId) {
      console.log("inside save");
      const response = await axios.put(
        `https://todo-backend-6bnq.onrender.com/update-task/${taskId}`,
        {
          title,
          description,
          status,
          dueDate,
        }
      );
      if (response.status == 200) {
        console.log(response);
        toast(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      const response = await axios.post(
        "https://todo-backend-6bnq.onrender.com/add-task",
        {
          title,
          description,
          status,
          dueDate,
        }
      );
      if (response.status == 200) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F1FAEE]">
      <form
        onSubmit={handleSubmit}
        className=" w-4/5 lg:w-3/5 mx-auto p-4 bg-white rounded-lg shadow "
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#3A86FF]"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#3A86FF]"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-[#3A86FF]"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-[#3A86FF]"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="p-2 rounded bg-[#3A86FF] text-white font-bold w-full"
          >
            {taskId ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

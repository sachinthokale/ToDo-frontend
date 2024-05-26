import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
/* eslint-disable react/prop-types */

const TaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate();
  const handleTaskDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://todo-backend-6bnq.onrender.com/delete-task/${taskId}`
      );
      if (response.status == 200) {
        onDelete(taskId);
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
    } catch (error) {
      console.log(error);
    }
  };
  const statusColor = () => {
    if (task.status == "Pending") {
      return "text-yellow-500";
    } else if (task.status == "In Progress") {
      return "text-red-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className=" p-2 w-full lg:w-[48%] my-2  rounded-lg bg-white shadow-md">
      <h1 className="text-xl text-gray-600 font-bold">{task.title}</h1>
      <p className="text-sm text-gray-500">{task.description} </p>
      <p className="text-md text-gray-500">
        {" "}
        Due Date: {task.dueDate.split("T")[0]}
      </p>
      <p className={`${statusColor()} font-bold`}>{task.status}</p>

      <div className="w-full  flex flex-row-reverse">
        <button
          onClick={() => navigate(`/edit-task/${task._id}`, { state: task })}
          className=" text-[#3A86FF]"
        >
          <NoteAltIcon fontSize="large" />
        </button>
        <button
          onClick={() => {
            handleTaskDelete(task._id);
          }}
          className=" text-[#3A86FF]"
        >
          <DeleteIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

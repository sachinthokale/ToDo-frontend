import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TaskForm from "./components/TaskForm";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/edit-task/:taskId" element={<TaskForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

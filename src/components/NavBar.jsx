import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  console.log(location.pathname);

  const isHomePage = location.pathname == "/" ? true : false;
  return (
    <nav className=" h-20 lg:h-1/6 bg-white rounded flex justify-around items-center p-2 w-full">
      <h1 className="text-3xl font-bold text-[#3A86FF]">TASK TRACKER</h1>
      {isHomePage ? (
        <Link
          to="/add-task"
          className=" p-2 rounded bg-[#3A86FF] text-white font-bold"
        >
          Add Task
        </Link>
      ) : (
        <Link to="/" className=" p-2 rounded bg-[#3A86FF] text-white font-bold">
          Home
        </Link>
      )}
    </nav>
  );
};

export default NavBar;

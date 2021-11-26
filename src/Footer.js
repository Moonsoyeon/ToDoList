import { memo } from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  // const { pathname } = useLocation();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "30px 0px 0px 0px",
      }}
    >
      <p className="pt-6 ml-2">{`${props.count} items left`}</p>

      <div className="flex items-center mx-4">
        <Link
          className="p-2 pl-3 pr-3 bg-transparent ml-2 mr-1 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
          to="/"
        >
          All
        </Link>
        <Link
          className="p-2 pl-3 pr-3 bg-transparent mr-1 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
          to="/active"
        >
          Active
        </Link>
        <Link
          className="p-2 pl-3 pr-3 bg-transparent mr-4 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
          to="/completed"
        >
          Completed
        </Link>
      </div>
      {/* <button
        className="p-2 pl-3 pr-3 bg-transparent ml-6 mr-1 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
        onClick={() => props.setMode("All")}
      >
        All
      </button>
      <button
        className="p-2 pl-3 pr-3 bg-transparent mr-1 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
        onClick={() => props.setMode("Active")}
      >
        Active
      </button>
      <button
        className="p-2 pl-3 pr-3 bg-transparent mr-5 border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:text-gray-100 focus:border-4 focus:bg-blue-500"
        onClick={() => props.setMode("Completed")}
      >
        Completed
      </button> */}
      <button
        className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
        onClick={props.clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}
export default memo(Footer);

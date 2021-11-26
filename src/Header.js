import React, { memo } from "react";

function Header(props) {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button
          onClick={props.allDone}
          className="py-1 px-1 border-2 border-blue-400"
        >
          ✔
        </button>
        <input
          className="bg-gray-180 appearance-none ml-2 border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          onChange={props.onChangeText}
          onKeyPress={props.onKeyPress}
          value={props.text}
          placeholder="todos"
        />
      </div>
    </React.Fragment>
  );
}

export default memo(Header);

import React, { memo } from "react";

function Todo(props) {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function onBlur(id) {
    setEdit(false);
    props.onEdit(id, ref.current.value);
  }

  function onKeyPress(id) {
    return (e) => {
      if (e.key === "Enter") {
        setEdit(false);
        props.onEdit(id, ref.current.value);
      }
    }; //jsp closer
  }

  React.useEffect(() => {
    if (edit) {
      ref.current.focus();
    }
  }, [edit]);

  if (edit) {
    return (
      <input
        type="text"
        className="w-full"
        defaultValue={props.text}
        ref={ref}
        onBlur={() => onBlur(props.id)}
        onKeyPress={onKeyPress(props.id)}
      />
    );
  }

  return (
    <div
      className="flex items-center"
      //style={{
      //  display: "flex",
      //}}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onDoubleClick={() => setEdit(true)}
      //마우스 올리면 x버튼 생김
    >
      <div
        className="flex flex-1 items-center p-3"
        //style={{
        //  flex: 1,
        //  display: "flex",
        //}}
      >
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => props.toggleTodo(props.id, props.checked)}
          className="mr-3 h-6 w-6"
        />
        <p
          style={{
            textDecoration: props.checked ? "line-through" : "none",
          }}
        >
          {props.text}
        </p>
      </div>
      {show && <button onClick={() => props.deleteTodo(props.id)}>X</button>}
    </div>
  );
}

export default memo(Todo);

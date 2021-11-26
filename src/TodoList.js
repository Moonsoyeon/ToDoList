import React from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Todo from "./Todo";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router";
import { db } from "./firebase-config";

function TodoList() {
  const { pathname } = useLocation();
  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [filteredTodos, setFilteredTodos] = React.useState([]);

  const onChangeText = React.useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onKeyPress = React.useCallback(
    async (e) => {
      const todosCollectionRef = collection(db, "todos");
      if (e.key === "Enter") {
        await addDoc(todosCollectionRef, {
          text: text,
          checked: false,
        });
        //  setTodos([
        //   ...todos,
        //   {
        //     id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        //     text: text,
        //     checked: false,
        //   },
        // ]);
        setText("");
      }
    },
    [text]
  );

  const toggleTodo = React.useCallback(async (id, checked) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { checked: !checked });
    // setTodos(
    //   todos.map((x) => {
    //     if (x.id === id) {
    //       return {
    //         ...x,
    //         checked: !x.checked,
    //       };
    //     } else {
    //       return x;
    //     }
    //   })
    // );
  }, []);

  const deleteTodo = React.useCallback(async (id) => {
    // setTodos(todos.filter((x) => x.id !== id));
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
  }, []);

  const clearCompleted = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    // todos
    //   .filter((todo) => todo.checked)
    //   .forEach((todo) => {
    //     const todoDoc = doc(db, "todos", todo.id);
    //     batch.delete(todoDoc);
    //   });
    await batch.commit();
    // setTodos(todos.filter((x) => !x.checked));
  }, []);

  const allDone = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { checked: true });
    });
    await batch.commit();
    // todos
    //   .filter((todo) => !todo.checked)
    //   .forEach((todo) => {
    //     const todoDoc = doc(db, "todos", todo.id);
    //     batch.update(todoDoc, { checked: true });
    //   });
    // await batch.commit();

    // setTodos(todos.map((x) => ({ ...x, checked: true })));
  }, []);

  const onEdit = React.useCallback(async (id, text) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { text });
    // setTodos(
    //   todos.map((x) => {
    //     if (x.id === id) {
    //       return {
    //         ...x,
    //         text: text,
    //       };
    //     } else {
    //       return x;
    //     }
    //   })
    // );
  }, []);

  React.useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    const unsub = onSnapshot(todosCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsub();
    };
    // setFilteredTodos();
    // const getUsers = async () => {
    //   const data = await getDocs(todosCollectionRef);
    //   setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getUsers();
  }, []);

  React.useEffect(() => {
    setFilteredTodos(
      todos.filter((x) => {
        if (pathname === "/active") {
          return !x.checked;
        } else if (pathname === "/completed") {
          return x.checked;
        } else {
          return true;
        }
      })
    );
  }, [todos, pathname]);

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-yellow-50"
      // style={{
      //  backgroundColor: "#eeeeee",
      //  width: "100%",
      //  height: "100vh",
      //  display: "flex",
      //  justifyContent: "center",
      //  alignItems: "center",
      // }}
    >
      <div>
        <h1
          style={{
            fontSize: "100px",
            color: "rgba(137, 215, 245, 0.74)",
            textAlign: "center",
          }}
        >
          Todos
        </h1>
        <div className="p-16 bg-white">
          <Header
            allDone={allDone}
            onChangeText={onChangeText}
            onKeyPress={onKeyPress}
            text={text}
          />

          {filteredTodos.map((x, i) => (
            <Todo
              key={i}
              id={x.id}
              text={x.text}
              checked={x.checked}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              onEdit={onEdit}
            />
          ))}

          <Footer
            count={todos.filter((x) => !x.checked).length}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoList;

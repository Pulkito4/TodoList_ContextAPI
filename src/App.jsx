import { useState } from "react";
import "./App.css";
import { TodoContext, TodoProvider } from "./contexts";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/Todoitem";

function App() {
	// in useState "todos" we have all the todos list
	const [todos, setTodos] = useState([]);

	// here we are adding functionlaity for individual todo item
	const addTodo = (todo) => [
		//accessing the previous state of the array "todos"
		setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]),
	];

	const updateTodo = (id, todo) => {
		/*here basically we access the previous state of "todos" and get an array 
    then we apply a loop (map) on this array 
    in this map "prevTodo" is each element of the todos array (looped once)
    then we check for condition which prevTodo's id match to that of the id passed in the "updateTodo" method
    if the id match then we update the previous todo with the new one, otherwise let the prevTodo remain as it is
    */

		setTodos((prev) =>
			prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
		);
	};

	const deleteTodo = (id) => {
		/* in this method we first access the previosu state of the todos array
    then we make a new array in which all the previous todo are present except the one whos id has been passed in deteleTodo
    hence we use filter and access each individual todo in the array 
    now since filter works for true values,
    so we apply a condition such that only those todos are passed into the new array who's id do not match to that of the id passed in the deleteTodo method
    */

		setTodos((prev) => prev.filter((todo) => todo.id != id));
	};

	const toggleComplete = (id) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id
					? { ...prevTodo, completed: !prevTodo.completed }
					: prevTodo
			)
		);
	};
	// using useEffect will help us get all the already existing , if any, todos from the local storage as soon as the window first loads

	// NOTE: we can always access local storage directly as long as we are not going into Server Side Rendering

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem("todos"));

		if (todos && todos.length > 0) {
			setTodos(todos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<TodoProvider
			value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
			<div className="bg-[#172842] min-h-screen py-8">
				<div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
					<h1 className="text-2xl font-bold text-center mb-8 mt-2">
						Manage Your Todos
					</h1>
					<div className="mb-4">
						<TodoForm />
					</div>
					<div className="flex flex-wrap gap-y-3">
						{todos.map((todo)=>(
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;

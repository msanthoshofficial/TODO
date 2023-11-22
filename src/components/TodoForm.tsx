import { useState } from "react";
import { useTodoContext } from "../contexts";

function TodoForm() {
	const [todo, setTodo] = useState("");
	const { addTodo } = useTodoContext();

	const add = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!todo) return;
		addTodo({ todo, completed: false, date: new Date().toISOString() });
		setTodo("");
	};

	return (
		<form onSubmit={add} className="flex justify-center items-center gap-4">
			<input
				className="input w-full "
				type="text"
				placeholder="Add a new todo..."
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button className="btn btn-neutral" type="submit">
				Add
			</button>
		</form>
	);
}

export default TodoForm;

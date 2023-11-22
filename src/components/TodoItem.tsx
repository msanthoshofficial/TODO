import { useState } from "react";
import { useTodoContext } from "../contexts";

type Todo = {
	id: string;
	todo: string;
	completed: boolean;
	date: string;
};

const DateFormatter = ({ isoString }: { isoString: string }) => {
	// Convert ISO string to Date object
	const date = new Date(isoString);

	// Get day and month
	const day = date.getDate();
	const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
		date
	);

	// Format the date as "22 Nov"
	const formattedDate = `${day} ${month}`;

	return <span>{formattedDate}</span>;
};

function TodoItem({ todo }: { todo: Partial<Todo> }) {
	const [todoMsg, setTodoMsg] = useState(todo.todo);
	const [isEditable, setIsEditable] = useState(false);
	const { updateTodo, removeTodo, toggleTodo } = useTodoContext();

	const editTodo = () => {
		updateTodo(todo.id as string, { ...todo, todo: todoMsg });
		setIsEditable(false);
	};

	const toggleTodoComplete = () => {
		toggleTodo(todo.id as string);
	};

	return (
		<>
			<div className="card  bg-base-100 shadow-xl p-4 my-4 flex justify-between items-center flex-row gap-2">
				<div className="flex justify-center items-center flex-row gap-4">
					<div className="form-control">
						<input
							type="checkbox"
							checked={todo.completed}
							className="checkbox checkbox-info"
							onChange={toggleTodoComplete}
						/>
					</div>
					<div className="font-medium badge badge-accent">
						<DateFormatter
							isoString={todo.date as string}
						></DateFormatter>
					</div>
				</div>
				<div
					className={`text-2xl mx-2 ${
						todo.completed ? "line-through italic " : ""
					}`}
				>
					{isEditable ? (
						<input
							type="text"
							placeholder="Type here"
							value={todoMsg}
							onChange={(e) => setTodoMsg(e.target.value)}
							className="input input-sm input-ghost w-full max-w-xs"
						/>
					) : (
						todoMsg
					)}
				</div>
				<div className="flex justify-center items-center flex-row gap-4">
					<div
						className="cursor-pointer"
						onClick={() => {
							if (todo.completed) return;
							if (isEditable) {
								editTodo();
							} else {
								setIsEditable((prev) => !prev);
							}
						}}
					>
						{isEditable ? "🗃️" : "✏️"}
					</div>
					<div
						className="cursor-pointer"
						onClick={() => removeTodo(todo.id as string)}
					>
						🗑️
					</div>
				</div>
			</div>
		</>
	);
}

export default TodoItem;

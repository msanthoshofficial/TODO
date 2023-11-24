import { createContext, useContext } from "react";
import { nanoid } from "nanoid";

type Todo = {
	id: string;
	todo: string;
	completed: boolean;
	date: string;
};

type TodoContextType = {
	todos: Partial<Todo>[];
	addTodo: (todo: Partial<Todo>) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	updateTodo: (id: string, todo: Partial<Todo>) => void;
};

export const TodoContext = createContext<TodoContextType>({
	todos: [
		{
			id: nanoid(),
			todo: "First TODO",
			completed: false,
			date: new Date().toISOString(),
		},
	],
	addTodo: (todo: Partial<Todo>) => {
		todo;
	},
	removeTodo: (id: string) => {
		id;
	},
	toggleTodo: (id: string) => {
		id;
	},
	updateTodo: (id: string, todo: Partial<Todo>) => {
		console.log(id, todo);
	},
});

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;

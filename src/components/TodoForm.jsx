import React from 'react'
import { useState } from 'react';
import { useTodo } from '../contexts';

function TodoForm() {
    const [todo, setTodo]= useState("")
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault()
        if(!todo) return 

        // we can pass only an object here because in App.jsx in our functionality we are spreading an object 
        // hence we cannot just pass a string (here todo) to addTodo becuase then there will be nothing to spread
        
        addTodo({todo, completed:false})
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
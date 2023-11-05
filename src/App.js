import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoMain from "./TodoMain";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TodoMain />} path="/" />
                <Route element={<h1>New Todo List</h1>} path="/new" />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TodoContainer />} path="/" />
                <Route element={<h1>New Todo List</h1>} path="/new" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

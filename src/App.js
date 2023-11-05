import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoHome from "./TodoHome";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoHome /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

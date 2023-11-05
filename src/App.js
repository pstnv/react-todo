import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoMain from "./TodoMain";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TodoMain />} path="/" />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;

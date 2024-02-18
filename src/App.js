import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import ListsContainer from "./components/ListsContainer/ListsContainer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ListsContainer />} path="/" />
                <Route element={<TodoContainer />} path="/list/:id" />
                <Route path="/list/*" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

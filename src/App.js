import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import ListsContainer from "./components/ListsContainer/ListsContainer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ListsContainer />} path="/" />
                <Route element={<TodoContainer />} path="/list/:id" />
                <Route element={<ListsContainer />} path="*" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

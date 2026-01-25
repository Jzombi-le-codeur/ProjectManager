import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from './Project/Project';
import Home from "./Home/Home";
import Error from "./Error/Error";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:project_id" element={<Project />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}
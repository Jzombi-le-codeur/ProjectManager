import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/Header";
import Project from './Project/Project';
import Home from "./Home/Home";
import Error from "./Error/Error";
import "../Styles/app.css";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:project_id" element={<Project />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Project from './Project/Project'
import Home from "./Home/Home";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"><Home /></Route>
                <Route path="/project"><Project /></Route>
            </Routes>
        </BrowserRouter>
    )
}
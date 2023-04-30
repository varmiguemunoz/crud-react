import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages/home";
import HighPriority from "../pages/highPriority";
import NavBar from "../components/navbar";

export default function RoutesApp() {
    return (
        <Router>
        <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hightask" element={<HighPriority />} />
            </Routes>
        </Router>
    )
}
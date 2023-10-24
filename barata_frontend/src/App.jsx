import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Dashboard, Login, Register, OtherPage, DownloadPage, ChargingStation } from './pages'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Work from "./components/Work";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {

    const { currentUser } = useContext(AuthContext)

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="otherpage" element={<OtherPage />} />
                    <Route path="downloadreport" element={<DownloadPage />} />
                    <Route path="chargingstation" element={<ChargingStation />} />
                    <Route path="chargingstation" element={<ChargingStation />} />
                </Route>
                <Route index element={<div className="App">
                        <Home />
                        <About />
                        <Work />
                        <Testimonial />
                        <Contact />
                        <Footer />
                    </div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
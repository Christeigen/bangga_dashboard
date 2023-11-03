import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Dashboard, Login, Register, OtherPage, DownloadPage, ChargingStation, HomePage, TentangKamiPage, ProductPage } from './pages'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {

    const { currentUser } = useContext(AuthContext)

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />
    };

    return (
        <Router>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/tentang-kami" element={<TentangKamiPage />} />
                <Route path="/produk" element={<ProductPage />} />
                <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="otherpage" element={<OtherPage />} />
                    <Route path="downloadreport" element={<DownloadPage />} />
                    <Route path="chargingstation" element={<ChargingStation />} />
                    <Route path="chargingstation" element={<ChargingStation />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
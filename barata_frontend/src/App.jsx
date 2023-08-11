import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Dashboard, Login, OtherPage, DownloadPage } from './pages'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'


function App() {

    const {currentUser} = useContext(AuthContext)

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to = "/login" />
    };
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
                    <Route index element={<Dashboard />} />
                    <Route path="otherpage" element={<OtherPage />} />
                    <Route path="downloadreport" element={<DownloadPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
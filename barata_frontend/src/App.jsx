import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Dashboard, Login, OtherPage } from './pages'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'


function App() {

    const {currentUser} = useContext(AuthContext)

    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to = "/login" />
    };

    console.log(currentUser)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
                    <Route index element={<Dashboard />} />
                    <Route path="otherpage" element={<OtherPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
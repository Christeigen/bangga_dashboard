// import barataLogo from '/src/assets/barata.png'
import { useState, useContext } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/src/firebase"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

    const {dispatch} = useContext(AuthContext)

    // Handle Login Form
    const [formData, setFormData] = useState(
        {
            username: "", 
            password: "",
        }
    )

    function handleChange(event) {
        console.log(event)
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        console.log(formData)
    }

    const navigate = useNavigate()

    function handleLogin(event) {
        event.preventDefault()
        let email = formData.username
        console.log(email)
        let password = formData.password
        console.log(password)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                dispatch({type:"LOGIN", payload:user})
                navigate('/')
            })
            .catch((error) => {
                setError(true);
            });
    }

    // Hide Password

    const [pw, setHidePw] = useState(true)

    function handleToggle(){
        console.log('hide')
        setHidePw((pw) => !pw); 
    }

    // Error

    const [error,setError] = useState(false)


    return (
    <>
        <div className="form_container absolute max-w-sm w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 z-101 bg-white p-7 pt-9 rounded-lg shadow-xl shadow-slate-300">
            <form action="{% url 'login' %}" method="POST">

                {/* <a href="https://www.barata.id/" target="blank">
                    <img src={barataLogo} className="logo barata w-2/5 m-auto my-10" alt="Barata logo" />
                </a> */}

                <h2 className="font-nunito text-2xl font-extrabold mb-2">Welcome!</h2>
                <h4 className="font-nunito font-normal  text-gray-400">Please log-in to your account to access the dashboard</h4>
        
                <div className="input_box relative mt-8 w-full h-10">
                    <input type="username" 
                    name="username" 
                    placeholder="Enter your username" 
                    onChange={handleChange}
                    value={formData.username}
                    id="username" required 
                    className=" h-full w-full outline-none px-8 text-gray-700 transition duration-200 ease border-b-2 border-gray-300 focus:border-blue-950" />
                    <i className="uil uil-user username absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-lg left-0"></i>
                </div>
        
                <div className="input_box relative mt-8 w-full h-10">
                    <input type= { pw === true ? "password" : "text"}
                    name="password" 
                    placeholder="Enter your password" 
                    onChange={handleChange}
                    value={formData.password}
                    id="password" required 
                    className="h-full w-full outline-none px-8 text-gray-700 transition duration-200 ease border-b-2 border-gray-300 focus:border-blue-950" />
                    <i className="uil uil-lock password absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-lg left-0"></i>
                    <i id = "pw_hide"
                    onClick = {handleToggle}
                    className= {`uil ${pw === true ? "uil-eye-slash" : "uil-eye"} pw_hide absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-base right-0 cursor-pointer`}></i>
                </div>
        
                <button onClick = {handleLogin}
                className="button bg-blue-950 hover:bg-black text-white font-bold py-2 px-4 rounded-full mt-8 w-full font-nunito" id="loginnow" type="submit">
                    Login Now
                </button>
        
            </form>

            {error && <div className = "mx-15 mt-4 text-center text-sm text-red-600">Wrong email or password!</div>}
        </div>
    </>
  )
}

export default Login
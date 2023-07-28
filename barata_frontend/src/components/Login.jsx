import barataLogo from '/src/assets/barata.png'

const Login = () => {
  return (
    <>
    <div className="form_container absolute max-w-sm w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 z-101 bg-white p-7 rounded-lg shadow-xl shadow-slate-300">
        <form action="{% url 'login' %}" method="POST">

            <a href="https://www.barata.id/" target="_blank">
                <img src={barataLogo} className="logo barata w-2/5 m-auto my-8" alt="Barata logo" />
            </a>
    
            <h2 className="font-nunito text-2xl font-extrabold mb-2">Welcome!</h2>
            <h4 className="font-nunito font-medium  text-gray-700">Please log-in to your account and access the dashboard</h4>
    
            <div className="input_box relative mt-8 w-full h-10">
                <input type="username" 
                name="username" 
                placeholder="Enter your username" 
                id="username" required 
                className=" h-full w-full outline-none px-8 text-gray-700 transition duration-200 ease border-b-2 border-gray-400 focus:border-blue-950" />
                <i className="uil uil-user username absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-lg left-0"></i>
            </div>
    
            <div className="input_box relative mt-8 w-full h-10">
                <input type="password" 
                name="password" 
                placeholder="Enter your password" 
                id="password" required 
                className="h-full w-full outline-none px-8 text-gray-700 transition duration-200 ease border-b-2 border-gray-400 focus:border-blue-950" />
                <i className="uil uil-lock password absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-lg left-0"></i>
                <i id = "pw_hide"
                className="uil uil-eye-slash pw_hide absolute top-1/2 transform -translate-y-1/2 text-gray-700 text-base right-0 cursor-pointer"></i>
            </div>
    
            <button className="button bg-blue-950 hover:bg-black text-white font-bold py-2 px-4 rounded-full mt-8 w-full font-nunito" id="loginnow" type="submit">Login Now</button>
    
        </form>
    </div>
    </>
  )
}

export default Login
import barataLogo from '/src/assets/barata.png'
import classNames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/Navigation'

const linkClass =
	'flex items-center gap-2 font-light px-4 py-2 hover:bg-stone-50 hover:no-underline rounded-md text-base font-normal'

export default function Sidebar() {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Handle Logout

  function handleLogout() {
    localStorage.setItem("user", null);
    navigate('/login')
  }

  return (
    <div className = "bg-white w-64 p-3 flex flex-col text-black border-r border-gray-200">

      <a href="https://www.barata.id/" target="blank">
        <img src={barataLogo} className="logo barata w-3/5 mx-auto mt-8 mb-3" alt="Barata logo" />
      </a>

      <div className="py-8 flex flex-1 flex-col gap-1">

				{DASHBOARD_SIDEBAR_LINKS.map((link) => (

        <Link
          key={link.key} 
          to={link.path}
          className={classNames(pathname === link.path ? 'bg-stone-100 text-black font-medium' : 'text-neutral-400', linkClass)}
        >
          <span className="text-xl">{link.icon}</span>
          {link.label}
        </Link>
				))}

			</div>
      
      <div 
      onClick={handleLogout}
      className={classNames(linkClass, 'cursor-pointer text-red-500 mb-2')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
			</div>
    </div>
  )
}



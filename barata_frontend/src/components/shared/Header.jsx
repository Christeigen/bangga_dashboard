// import { useState, useContext, useEffect, useRef } from "react";
// import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
// import { GoBell } from "react-icons/go";
// import { NotificationContext } from '/src/context/NotificationContext';

// export default function Header() {
//   const [formData, setFormData] = useState({
//     search: ""
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   }

//   const { notif } = useContext(NotificationContext);

//   // notification button
//   const [notification, setHideNotification] = useState(false);
//   const notificationRef = useRef();
//   const buttonRef = useRef();

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (!buttonRef.current.contains(event.target) && !notificationRef.current.contains(event.target)) {
//         setHideNotification(false);
//       }
//     }

//     window.addEventListener("click", handleClickOutside);

//     return () => {
//       window.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   function handleNotification() {
//     setHideNotification(!notification);
//   }

//   return (
//     <div className="bg-white h-16 px-4 my-4 mx-6 flex items-center justify-between rounded-lg shadow-sm">
//       <div className="flex">
//         <HiOutlineMagnifyingGlass className="m-2 mr-3 text-xl" />
//         <form>
//           <input
//             type="text"
//             name="search"
//             placeholder="Search ..."
//             onChange={handleChange}
//             value={formData.search}
//             id="search"
//             className="h-full w-full pb-1 mr-3 outline-none text-neutral-400 text-base"
//           />
//         </form>
//       </div>

//       <button ref={buttonRef} onClick={handleNotification}>
//         <GoBell className="m-2 mr-3 text-xl relative" />
//         {notif.length > 0 ? (
//           <div className="animate-pulse rounded-full bg-red-700 text-white text-[10px] absolute top-7 right-12 w-4 h-4 flex items-center justify-center p-1">
//             {notif.length}
//           </div>
//         ) : null}

//         {notification === true ? (
//           <div ref={notificationRef} className="absolute top-24 right-9 bg-stone-100 rounded-lg shadow-xl">
//             {notif.map((n) => (
//               <div key={n.key} className="border-b p-3 px-5 text-sm">
//                 {n}
//               </div>
//             ))}
//           </div>
//         ) : null}
//       </button>
//     </div>
//   );
// }

import { useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { GoBell } from 'react-icons/go';

export default function Header({ notif }) {
  const [formData, setFormData] = useState({
    search: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const [showNotification, setShowNotification] = useState(false);

  function handleNotificationClick() {
    setShowNotification(!showNotification);
  }

  return (
    <div className="bg-white h-16 px-4 my-4 mx-6 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex">
        <HiOutlineMagnifyingGlass className="m-2 mr-3 text-xl" />
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search ..."
            onChange={handleChange}
            value={formData.search}
            id="search"
            className="h-full w-full pb-1 mr-3 outline-none text-neutral-400 text-base"
          />
        </form>
      </div>

      <button onClick={handleNotificationClick}>
        <GoBell className="m-2 mr-3 text-xl relative" />
        {notif.length > 0 ? (
          <div className="animate-pulse rounded-full bg-red-700 text-white text-[10px] absolute top-7 right-12 w-4 h-4 flex items-center justify-center p-1">
            {notif.length}
          </div>
        ) : null}

        {showNotification && (
          <div className="absolute top-24 right-9 bg-stone-100 rounded-lg shadow-xl">
            {notif.map((n) => (
              <div key={n.key} className="border-b p-3 px-5 text-sm">
                {n}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

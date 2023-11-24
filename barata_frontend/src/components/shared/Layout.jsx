import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import axiosInstance from '/src/components/shared/axios';


export default function Layout() {

    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;

    // Access the UID from the user object
    const uid = user ? user.uid : null;
    console.log(uid)

    const [loading, setLoading] = useState(true);
    const [bookData, setBookData] = useState([]);
    const [chargingstationData, setChargingstationData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [mitraData, setMitraData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);
    const [notificationMessages, setNotificationMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookResponse, chargingstationResponse, customerResponse, mitraResponse,withdrawResponse] = await Promise.all([

                    // ==== Get data using https://bangga-evcs.id

                    axios.get('https://bangga-evcs.id/api/bookdata/'),
                    axios.get('https://bangga-evcs.id/api/chargingstationdata/'),
                    axios.get('https://bangga-evcs.id/api/customerdata/'),
                    axios.get('https://bangga-evcs.id/api/mitradata/'),
                    axios.get('https://bangga-evcs.id/api/withdrawdata/')
                    
                    // === Get data from localhost
                    
                    // axios.get('http://127.0.0.1:8000/api/bookdata/'),
                    // axios.get('http://127.0.0.1:8000/api/chargingstationdata/'),
                    // axios.get('http://127.0.0.1:8000/api/customerdata/'),
                    // axios.get('http://127.0.0.1:8000/api/mitradata/'),
                    // axios.get('http://127.0.0.1:8000/api/withdrawdata/')


                    // API using JWT ( set up the api url from axios.jsx in shared/company_profile/)
                
                    // axiosInstance.get('bookdata/').catch((error) => {console.log(error)} ),
                    // axiosInstance.get('chargingstationdata/'),
                    // axiosInstance.get('customerdata/'),
                    // axiosInstance.get('mitradata/'),
                    // axiosInstance.get('withdrawdata/')

                    
                ]);

                // console.log(bookResponse)
                // console.log(chargingstationResponse)
                // console.log(customerResponse)
                // console.log(mitraResponse)
                // console.log(withdrawResponse)

                const filteredBookData = bookResponse.data
                .sort((a, b) => {
                    const dateA = new Date(a.data.orderDate);
                    const dateB = new Date(b.data.orderDate);
                    return dateA - dateB;
                });

                setBookData(filteredBookData);

                const filteredChargingStationData = chargingstationResponse.data.filter(item => item.data !== null);
                setChargingstationData(filteredChargingStationData);

                setCustomerData(customerResponse.data);
                setMitraData(mitraResponse.data);
                setWithdrawData(withdrawResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        checkInactive(); // Call checkInactive after fetching chargingstationData
    }, [chargingstationData]);

    const checkInactive = () => {
        if (!chargingstationData) {
        return;
        }

        const messages = [];

        chargingstationData.forEach((item) => {
        if (item.data && item.data.status === 'tidak aktif') {
            messages.push(`Charging station ${item.key} is not active`);
        }
        });

        setNotificationMessages(messages);
    };


    if (loading) {
        return <div className = "flex items-center justify-center h-screen">
                    <p className="mr-2 text-gray-600 text-lg">Loading </p>
                    <div className="flex items-center space-x-2">
                        <div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce"></div>
                        <div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce delay-5000"></div>
                        <div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce delay-10000"></div>
                    </div>
                </div>;
    }

    return (
    <div className="bg-stone-50 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header notif={notificationMessages} />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet context = {[bookData, chargingstationData, customerData, mitraData, withdrawData]}/>
        </div>
      </div>
    </div>
    );
}


// USED IF WE ARE DIRECTLY FETCHING DATA IN REACT


// import { getDatabase, ref, onValue } from 'firebase/database';
// import { app } from '/src/firebase';

// const db = getDatabase(app);

// export default function Layout() {
//   const [bookData, setBookData] = useState([]);
//   const [chargingstationData, setChargingstationData] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notificationMessages, setNotificationMessages] = useState([]);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [bookData, chargingstationData, userData] = await Promise.all([
//           fetchDataFromTable('book', { sort: true }),
//           fetchDataFromTable('charging_station'),
//           fetchDataFromTable('users'),
//         ]);

//         setBookData(bookData);
//         setChargingstationData(chargingstationData);
//         setUserData(userData);
//         setLoading(false);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     checkInactive(); // Call checkInactive after fetching chargingstationData
//   }, [chargingstationData]);

//   const fetchDataFromTable = (tableName, options = {}) => {
//     const dbRef = ref(db, tableName);

//     return new Promise((resolve, reject) => {
//       onValue(
//         dbRef,
//         (snapshot) => {
//           let records = [];
//           snapshot.forEach((childSnapshot) => {
//             let keyName = childSnapshot.key;
//             let data = childSnapshot.val();
//             records.push({ key: keyName, data: data });
//           });

//           if (options.sort) {
//             records.sort((a, b) => {
//               const dateA = new Date(a.data.orderDate);
//               const dateB = new Date(b.data.orderDate);
//               return dateA - dateB;
//             });
//           }

//           resolve(records);
//         },
//         reject
//       );
//     });
//   };

//   const checkInactive = () => {
//     if (!chargingstationData) {
//       return;
//     }
//     const messages = [];

//     chargingstationData.forEach((item) => {
//       if (item.data && item.data.status === 'tidak aktif') {
//         messages.push(`Charging station ${item.key} is not active`);
//       }
//     });

//     setNotificationMessages(messages);
//   };


//   if (loading) {
//     return <div className = "flex items-center justify-center h-screen">
// 				<p className="mr-2 text-gray-600 text-lg">Loading </p>
// 				<div className="flex items-center space-x-2">
// 					<div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce"></div>
// 					<div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce delay-5000"></div>
// 					<div className=" mt-2 w-1 h-1 rounded-full bg-blue-950 animate-bounce delay-10000"></div>
// 				</div>
// 			</div>;
//   }

//   return (
//     <div className="bg-stone-50 h-screen w-screen overflow-hidden flex flex-row">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Header notif={notificationMessages} />
//         <div className="flex-1 p-4 min-h-0 overflow-auto">
//           <Outlet context = {[bookData, chargingstationData, userData]}/>
//         </div>
//       </div>
//     </div>
//   );
// }

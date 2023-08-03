import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '/src/firebase';

const db = getDatabase(app);

export default function Layout() {
  const [bookData, setBookData] = useState([]);
  const [chargingstationData, setChargingstationData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, chargingstationData, userData] = await Promise.all([
          fetchDataFromTable('book', { sort: true }),
          fetchDataFromTable('charging_station'),
          fetchDataFromTable('users'),
        ]);

        setBookData(bookData);
        setChargingstationData(chargingstationData);
        setUserData(userData);
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

  const fetchDataFromTable = (tableName, options = {}) => {
    const dbRef = ref(db, tableName);

    return new Promise((resolve, reject) => {
      onValue(
        dbRef,
        (snapshot) => {
          let records = [];
          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();
            records.push({ key: keyName, data: data });
          });

          if (options.sort) {
            records.sort((a, b) => {
              const dateA = new Date(a.data.orderDate);
              const dateB = new Date(b.data.orderDate);
              return dateA - dateB;
            });
          }

          resolve(records);
        },
        reject
      );
    });
  };

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
          <Outlet context = {[bookData, chargingstationData, userData]}/>
        </div>
      </div>
    </div>
  );
}


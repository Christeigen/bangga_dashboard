import TableView from "/src/components/table/TableView";
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";

export default function chargingStationView() {
  const [bookData, chargingstationData] = useOutletContext()

  const addColumn = data => {
    return data.map(user => ({ ...user.data, customer: 1 }));
  };

  const bookCust = addColumn(bookData)

  const groupAndSumData = (data, selectedVar) => {
    return data.reduce((acc, item) => {
      const csName = item.data.data.name
      const location = item.data.data.location
      const csId = item.data.csId
      const provinsi = item.data.provinsi;
      const totalPrice = item.data.totalPrice
      const totalDuration = item.data.duration
      const totalCustomer = item.data.customer
      const status = item.data.data.status
      if (selectedVar == "provinsi") {
        const existingprovinsi = acc.findIndex((accItem) => accItem.provinsi === provinsi);
        if (existingprovinsi !== -1) {
          acc[existingprovinsi].totalPrice += totalPrice;
          acc[existingprovinsi].totalDuration += totalDuration;
          acc[existingprovinsi].totalCustomer += totalCustomer;
        } else {
          acc.push({ csId, provinsi, totalPrice, totalDuration, totalCustomer });
        }
        return acc;
      } else if (selectedVar == "csId") {
        const existingcsId = acc.findIndex((accItem) => accItem.csId === csId);
        if (existingcsId !== -1) {
          acc[existingcsId].totalPrice += totalPrice;
          acc[existingcsId].totalDuration += totalDuration;
          acc[existingcsId].totalCustomer += totalCustomer;
        } else {
          acc.push({ csId, provinsi, totalPrice, totalDuration, totalCustomer, location, csName, status });
        }
        return acc;
      }
    }, []);
  };
  const combinedData = bookCust.map((item1) => {
    const matchingItem = chargingstationData.find((item2) => item2.data.csId === item1.csId);

    const mergedData = { ...item1, ...matchingItem };
    return { data: mergedData };
  });
  const csIds = chargingstationData.map(item => item.data.csId).sort((a, b) => parseInt(a) - parseInt(b));
  const zero = []
  for (let i = 0; i <= csIds.length - 1; i++) {
    const csIdToCheck = csIds[i];
    const foundItem = combinedData.find((item) => item.data.csId === `${csIdToCheck}`);
    if (!foundItem) {
      const newData = {
        csId: `${csIdToCheck}`,
        duration: 0,
        totalPrice: 0,
        status: 0,
        customer: 0,
      };
      zero.push({ data: newData })
    }
  }
  const additionalData = zero.map((item1) => {
    const matchingItem = chargingstationData.find((item2) => item2.data.csId === item1.data.csId);

    const mergedData = { ...item1.data, ...matchingItem };
    return { data: mergedData };
  });
  additionalData.forEach(df => {
    combinedData.push({ data: df.data })
  })

  combinedData.sort((a, b) => a.data.csId - b.data.csId);

  const province = combinedData
    .map(item => {
      const provinsi = item.data.data.location.split(", ").slice(-2)[0];
      item.data.provinsi = provinsi;
      return { data: item.data };
    });

  const totalData = groupAndSumData(combinedData, "csId")
  totalData.forEach(item => {
    if (item.status === 0) {
      item.status_avail = "Active";
    } else if (item.status === 100) {
      item.status_avail = "Charging";
    } else if (item.status === 200) {
      item.status_avail = "Inactive";
    }
  });

  const provinces = [
    "All",
    "Aceh",
    "Sumatera Utara",
    "Sumatera Selatan",
    "Sumatera Barat",
    "Bengkulu",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Lampung",
    "Bangka Belitung",
    "Kalimantan Barat",
    "Kalimantan Timur",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Utara",
    "Banten",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Bali",
    "Nusa Tenggara Timur",
    "Nusa Tenggara Barat",
    "Gorontalo",
    "Sulawesi Barat",
    "Sulawesi Tengah",
    "Sulawesi Utara",
    "Sulawesi Tenggara",
    "Sulawesi Selatan",
    "Maluku Utara",
    "Maluku",
    "Papua Barat",
    "Papua",
    "Papua Selatan",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat Daya"
  ];
  const [selectedProvince, setSelectedProvince] = useState('All');

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  return (
    <>
      <div>
        Province
        <select
          className="text-sm outline-none text-black px-2 py-2 ml-3"
          id="database"
          name="database"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>
      <TableView
        source={totalData}
        selectedProvince={selectedProvince} />
    </>
  );
}
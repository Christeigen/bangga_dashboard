import React from "react";
import {
  Card,
  Title,
  Bold,
  Text,
  List,
  ListItem,
  Tab,
  TabList,
  TabGroup,
  Grid,
} from "@tremor/react";
import cs from '/src/assets/csBanggaCrop.png'
import cheap from '/src/assets/keunggulan_1.png'
import efficient from '/src/assets/keunggulan_2.png'
import easy from '/src/assets/keunggulan_3.png'
import { Navbar, Footer } from '/src/components/shared/company_profile/index.js';

const table1 = [
  {
    name: "Input voltage",
    spesifications: "230V AC",
  },
  {
    name: "Input frequency",
    spesifications: "50/60 Hz",
  },
  {
    name: "Output voltage",
    spesifications: "230V AC",
  },
  {
    name: "Output frequency",
    spesifications: "50/60 Hz",
  },
  {
    name: "Max output power",
    spesifications: "7,3 KW",
  },
  {
    name: "Max output current",
    spesifications: "32A",
  },
];

const table2 = [
  {
    name: "Insultation Resistance",
    spesifications: "DC500v",
  },
  {
    name: "Pin temp rise",
    spesifications: "< 50k",
  },
  {
    name: "Withstand voltage",
    spesifications: "2500 V",
  },
  {
    name: "Contact impedance",
    spesifications: "0,5m Max",
  },
  {
    name: "Charging interface",
    spesifications: "IEC 62196, Type 2",
  },
  {
    name: "Operating Temperature",
    spesifications: "-30 C + 50 C",
  },
];

const ProductPage = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      <div className="px-16">
        <Navbar />
      </div>
      <div className="space-y-32 mt-8">
        <div className="diff flex flex-col px-16 gap-y-16">
          <div className="image&desc flex justify-center items-center">
            <img src={cs} className="cs basis-1/2 max-w-screen-sm ml-[100px] mb-[50px]" />
            <div className="desc flex flex-col gap-y-8 justify-center max-w-1/2 mr-[100px]">
              <h1 className="text-4xl font-bold font-poppins text-sky-900">BANGGA EVCS</h1>
              <h1 className="text-xl font-poppins">
                Bangga EVCS merupakan platform charging station yang dilengkapi dengan mobile application sehingga memudahkan pengguna dalam melakukan transaksi energi, tracking, dan memudahkan dalam mengetahui status dan lokasi Charging Station terdekat. 
                Aplikasi ini juga memfasilitasi transaksi sewa-menyewa Charging Station.
              </h1>
              <h1 className="text-xl font-poppins">
                Bangga EVCS telah memenuhi standar PerMen ESDM No. 13 Tahun 2020, diantaranya adalah Over Current Protection, Protective Earth Conductor (Earthing System), Over/Under Voltage and Frequency Protection
              </h1>
              <div className="strenght flex flex-row justify-center gap-x-32 mt-[30px]">
                <div className="flex flex-col gap-y-5">
                  <img src={cheap} className="w-24 h-24" />
                  <h1 className="text-center text-black font-bold  font-poppins text-2xl">Harga <br/> Terjangkau</h1>
                </div>
                <div className="flex flex-col gap-y-5">
                  <img src={efficient} className="w-24 h-24" />
                  <h1 className="text-center text-black font-bold font-poppins text-2xl">Cepat dan <br/> Efisien</h1>
                </div>
                <div className="flex flex-col gap-y-5">
                  <img src={easy} className="w-24 h-24" />
                  <h1 className="text-center text-black font-bold font-poppins text-2xl">Mudah <br/> diakses</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="Spesifications flex flex-col gap-y-5 mx-[150px]">
            <h1 className="text-4xl italic font-bold text-sky-900">Spesifikasi</h1>
            <Grid numItemsMd={2} className="gap-x-8 gap-y-2">
              <div>
                <List className="mt-2">
                  {table1.map((item) => (
                    <ListItem key={item.name}>
                      <h1 className="text-xl font-poppins">{item.name}</h1>
                      <h1 className="text-xl font-poppins">
                        <Bold>{item.spesifications}</Bold>
                      </h1>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div>
                <List className="mt-2">
                  {table2.map((item) => (
                    <ListItem key={item.name}>
                      <h1 className="text-xl font-poppins">{item.name}</h1>
                      <h1 className="text-xl font-poppins">
                        <Bold>{item.spesifications}</Bold>
                      </h1>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;

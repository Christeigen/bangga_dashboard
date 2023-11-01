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
import cs from '/src/assets/cs.jpg'
import cheap from '/src/assets/icon.png'

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
    spesifications: "IEC 62196, Tyoe 2",
  },
  {
    name: "Operating Temperature",
    spesifications: "-30 C + 50 C",
  },
];

const About = () => {
  return (
    <div class="background px-32 py-32 bg-white">
      <div className="diff flex flex-col gap-y-32">
        <div class="image&desc flex flex-row gap-x-32">
          <img src={cs} className="cs basis-3/12 max-w-screen-sm" />
          <div className="desc basis-8/12 flex flex-col gap-y-12">
            <h1 className="text-6xl italic font-bold text-sky-900">BANGGA EVCS</h1>
            <h1 className="text-4xl font-poppins">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </h1>
            <div className="strenght flex flex-row justify-center gap-x-44">
              <div className="flex flex-col gap-y-5">
                <img src={cheap} className="w-48 h-48" />
                <h1 className="text-center text-black font-bold text-4xl pr-24">Harga Terjangkau</h1>
              </div>
              <div className="flex flex-col gap-y-5">
                <img src={cheap} className="w-48 h-48" />
                <h1 className="text-center text-black font-bold text-4xl pr-20">Cepat dan Efisien</h1>
              </div>
              <div className="flex flex-col gap-y-5">
                <img src={cheap} className="w-48 h-48" />
                <h1 className="text-center text-black font-bold text-4xl">Mudah diakses</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="Spesifications flex flex-col gap-y-5">
          <h1 className="text-6xl italic font-bold text-sky-900">Spesifikasi</h1>
          <Grid numItemsMd={2} className="gap-x-8 gap-y-2">
            <div>
              <List className="mt-2">
                {table1.map((item) => (
                  <ListItem key={item.name}>
                    <h1 className="text-4xl font-poppins">{item.name}</h1>
                    <h1 className="text-4xl font-poppins">
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
                    <h1 className="text-4xl font-poppins">{item.name}</h1>
                    <h1 className="text-4xl font-poppins">
                      <Bold>{item.spesifications}</Bold>
                    </h1>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default About;

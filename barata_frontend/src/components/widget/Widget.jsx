import { Link } from 'react-router-dom'
import { HiUsers} from 'react-icons/hi2'
import {BsEvStationFill, BsBugFill, BsBarChartFill} from "react-icons/bs"

export default function Widget({type, source}) {

    let data

    switch (type) {
        case "customer":
        data = {
            title: "Total Customers",
            description: "penjelasan untuk user",
            value: Array.isArray(source) ? source.length : 0,
            isMoney: false,
            link_label: "View all users",
            link_path: "",
            icon: (<HiUsers />),
        };
        break;
        case "station":
        data = {
            title: "Total Charging Stations",
            description: "penjelasan untuk charging station",
            value: Array.isArray(source) ? source.length : 0,
            isMoney: false,
            link_label: "View all charging stations",
            link_path: "",
            icon: (<BsEvStationFill />),
        };
        break;
        case "transaction":
        data = {
            title: "Transaction Statistic",
            description: "penjelasan untuk transaction statistic",
            value: source.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.data.totalPrice;
            }, 0),
            isMoney: true,
            link_label: "See details",
            link_path: "",
            icon: (<BsBarChartFill />),
        };
        break;
        case "bug":
        data = {
            title: "Bug Reports",
            description: "penjelasan untuk bug",
            value: 0,
            isMoney: false,
            link_label: "See details",
            link_path: "",
            icon: (<BsBugFill />),
        };
        break;
        default:
        break;
    }

    return (
    
    <div className=" bg-white h-28 w-1/4 mb-5 rounded-lg shadow-sm">

        <div className="px-5 mt-3  text-stone-500 text-[17px]">{data.title}</div> 
        {/* <div className=" px-5 text-stone-300 font-light text-sm">{data.description}</div> */}

        <div className = "flex items-center justify-between">
            
            <div className="px-5 left flex flex-col">
                <span className="text-3xl mt-1 text-blue-900">
                {data.isMoney && "Rp"} {data.value}
                </span>
                <Link
                    key={data.key} 
                    to={data.link_path}
                    className= "mt-2 text-stone-500 font-light text-xs hover:text-blue-500"
                >
                {data.link_label}
                </Link>
            </div>
        
            <div className="pr-5 text-3xl text-stone-100">
                {data.icon}
            </div>

        </div>

    </div>
    )
  }

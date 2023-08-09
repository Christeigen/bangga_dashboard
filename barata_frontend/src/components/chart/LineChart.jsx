import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'
import 'chartjs-adapter-date-fns';
import {useState} from 'react'

export default function LineChart({source, title}) {

    function groupAndSumData(data, groupBy) {
      return data.reduce((acc, item) => {
        const x = new Date(item.data.orderDate);
        const y = item.data.totalPrice;
        let key;

        switch (groupBy) {
          case "week":
            const weekStart = new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay());
            key = weekStart.setHours(0, 0, 0, 0);
            break;
          case "day":
            key = new Date(x).setHours(0, 0, 0, 0);
            break;
          case "month":
            key = new Date(x.getFullYear(), x.getMonth(), 1).setHours(0, 0, 0, 0);
            break;
          default:
            console.log("Invalid groupBy value. Please choose 'week', 'day', or 'month'.");
            return acc; // Return the original accumulator if invalid groupBy value
        }

        const existingEntry = acc.find(item => item.x === key);
        if (existingEntry) {
          existingEntry.y += y;
        } else {
          acc.push({ x: key, y });
        }

        return acc;
      }, []);
    }

    const [formData, setFormData] = useState(
      {
        period: "day"
      }
    )
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const chartData = {

        datasets: [
          {
            label: 'Price',
            data: groupAndSumData(source, formData.period),
            borderColor: 'rgb(30 58 138)',
            borderWidth: 1,
          },
        ],
      };

    const chartOptions = {
        scales: {
          x: {
            type: 'time',
            time: {
                unit:formData.period,
            },
          },
        },
        plugins: {
          legend: {
            display: false
          }
        }
      };


    
    return (
        <div className="bg-white p-5 rounded-lg drop-shadow-sm shadow-sm flex-1"> 
          <div className = "flex justify-between">
            <div className = "px-1 pb-2 text-stone-500 text-[17px]">{title}</div>
            <select
                className = "text-sm outline-none"
                id="period" 
                value={formData.period}
                onChange={handleChange}
                name="period"
            >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
            </select>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      );
};

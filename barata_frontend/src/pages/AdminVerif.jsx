import {
    Card,
    Title,
    Tab,
    TabList,
    TabGroup,
    TabPanel,
    TabPanels,
    DateRangePicker,
    DateRangePickerItem
} from "@tremor/react";
import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import TableTopUp from "/src/components/table/TableTopUp";
import TableWithdraw from "/src/components/table/TableWithdraw";

export default function AdminVerif() {
    const [bookData, chargingstationData, customerData, mitraData, withdrawData] = useOutletContext()

    const [value, setValue] = useState({
        from: '',
        to: '',
    });


    withdrawData.forEach(item => {
        {
            Object.keys(item.data.totalPrice).map((key) => {
                if (item.data.totalPrice[key].is_verif == 0) {
                    item.data.totalPrice[key].status = "Waiting";
                } else if (item.data.totalPrice[key].is_verif == 100) {
                    item.data.totalPrice[key].status = "Accepted";
                } else if (item.data.totalPrice[key].is_verif == 200) {
                    item.data.totalPrice[key].status = "Rejected";
                }
            })
        }
    });

    withdrawData.forEach(item => {
        {
            Object.keys(item.data.withdraw).map((key) => {
                if (item.data.withdraw[key].is_verif == 0) {
                    item.data.withdraw[key].status = "Waiting";
                } else if (item.data.withdraw[key].is_verif == 100) {
                    item.data.withdraw[key].status = "Accepted";
                } else if (item.data.withdraw[key].is_verif == 200) {
                    item.data.withdraw[key].status = "Rejected";
                }
            })
        }
    });

    const status = ["All", "Waiting", "Accepted", "Rejected"];
    const [selectedStatus, setStatus] = useState('All');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <Card>
            <Title>Admin Verification</Title>
            <TabGroup className="mt-4">
                <div className="flex flex-row gap-8 max-h-[37px]">
                    <TabList variant="solid">
                        <Tab><div className="text-black text-sm">Top up</div></Tab>
                        <Tab><div className="text-black text-sm">Withdraw</div></Tab>
                    </TabList>
                    <div className="text-blue-900 font-bold border-[1px] px-5 py-[4px] rounded-l-xl">Status</div>
                    <select
                        className="text-sm outline-none text-black px-2 ml-[-35px] border-[1px] rounded-r-xl"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                    >
                        {status.map((cond, index) => (
                            <option key={index} value={cond}>
                                {cond}
                            </option>
                        ))}
                    </select>
                    <div className="font-bold text-base">
                        <DateRangePicker
                            className="max-w-md mx-auto bg-white text-blue-900 text-base"
                            value={value}
                            onValueChange={setValue}
                            selectPlaceholder="All Data"
                            color="rose"
                        >
                            <DateRangePickerItem
                                className="text-blue-900 bg-white text-base"
                                key="today"
                                value="today"
                                from={new Date()}>
                                Today
                            </DateRangePickerItem>
                            <DateRangePickerItem
                                className="text-blue-900 bg-white text-base"
                                key="last7days"
                                value="last7days"
                                from={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                                to={new Date()}>
                                Last 7 days
                            </DateRangePickerItem>
                            <DateRangePickerItem
                                className="text-blue-900 bg-white text-base"
                                key="last30days"
                                value="last30days"
                                from={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                                to={new Date()}>
                                Last 30 days
                            </DateRangePickerItem>
                            <DateRangePickerItem
                                className="text-blue-900 bg-white text-base"
                                key="monthtodate"
                                value="monthtodate"
                                from={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                                to={new Date()}>
                                Month to Date
                            </DateRangePickerItem>
                            <DateRangePickerItem
                                className="text-blue-900 bg-white text-base"
                                key="yeartodate"
                                value="yeartodate"
                                from={new Date(new Date().getFullYear(), 0, 1)}
                                to={new Date()}>
                                Year to Date
                            </DateRangePickerItem>
                        </DateRangePicker>
                    </div>
                </div>
                <TabPanels>
                    <TabPanel>
                        <TableTopUp source = {withdrawData} datefilter = {value}/>
                    </TabPanel>
                    <TabPanel>
                        <TableWithdraw source = {withdrawData} datefilter = {value}/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    )
}
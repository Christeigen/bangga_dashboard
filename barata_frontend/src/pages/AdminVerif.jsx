import {
    Card,
    Grid,
    Title,
    Table,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableRow,
    Tab,
    TabList,
    TabGroup,
    TabPanel,
    TabPanels,
    DateRangePicker,
    DateRangePickerItem
} from "@tremor/react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { useOutletContext } from "react-router-dom";
import { useState } from 'react';
import check from '/src/assets/check.jpg'
import cross from '/src/assets/cross.jpg'

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
                console.log("key", key)
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
    console.log("withdraw data", withdrawData)

    const status = ["All", "Waiting", "Accepted", "Rejected"];
    const [selectedStatus, setStatus] = useState('All');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <Card>
            <Title>Verifikasi Admin</Title>
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
                        <Table>
                            <TableRow>
                                <TableHeaderCell className="text-left">Name</TableHeaderCell>
                                <TableHeaderCell className="text-center">Bank Account Number</TableHeaderCell>
                                <TableHeaderCell className="text-center">Created At</TableHeaderCell>
                                <TableHeaderCell className="text-center">Amount</TableHeaderCell>
                                <TableHeaderCell className="text-center">Payment Receipt</TableHeaderCell>
                                <TableHeaderCell className="text-center">Confirmation</TableHeaderCell>
                                <TableHeaderCell className="text-center">Status</TableHeaderCell>
                            </TableRow>
                            <TableBody>
                                {withdrawData.map((item, index) => (
                                    Object.keys(item.data.totalPrice).map((key, cellIndex) => (
                                        <TableRow key={`${index}-${cellIndex}`}>
                                            <TableCell key={`name-${cellIndex}`} className="text-left">{item.data.totalPrice[key].name}</TableCell>
                                            <TableCell key={`noRek-${cellIndex}`} className="text-center">{item.data.totalPrice[key].noRek}</TableCell>
                                            <TableCell key={`createdAt-${cellIndex}`} className="text-center">{item.data.totalPrice[key].createdAt}</TableCell>
                                            <TableCell key={`amount-${cellIndex}`} className="text-center">{item.data.totalPrice[key].amount}</TableCell>
                                            <TableCell key={`paymentReceipt-${cellIndex}`} className="text-center">
                                                <button className={`px-2 py-2 text-white text-sm bg-blue-900 rounded-lg hover:bg-black`}>See Details</button>
                                            </TableCell>
                                            <TableCell key={`confirmation-${cellIndex}`} className="justify-center">
                                                <div className="flex flex-row gap-2 justify-center">
                                                    <button><img src={check} className="w-8" /></button>
                                                    <button><img src={cross} className="w-8" /></button>
                                                </div>
                                            </TableCell>
                                            <TableCell key={`status-${cellIndex}`} className="text-center">{item.data.totalPrice[key].status}</TableCell>
                                        </TableRow>
                                    ))
                                ))}
                            </TableBody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table>
                            <TableRow>
                                {/* <TableHeaderCell className="text-left">Name</TableHeaderCell> */}
                                {/* <TableHeaderCell className="text-center">Bank Account Number</TableHeaderCell> */}
                                <TableHeaderCell className="text-center">Created At</TableHeaderCell>
                                <TableHeaderCell className="text-center">Amount</TableHeaderCell>
                                {/* <TableHeaderCell className="text-center">Payment Receipt</TableHeaderCell> */}
                                <TableHeaderCell className="text-center">Confirmation</TableHeaderCell>
                                <TableHeaderCell className="text-center">Status</TableHeaderCell>
                            </TableRow>
                            <TableBody>
                                {withdrawData.map((item, index) => (
                                    Object.keys(item.data.withdraw).map((key, cellIndex) => (
                                        <TableRow key={`${index}-${cellIndex}`}>
                                            {/* <TableCell key={`name-${cellIndex}`} className="text-left">{item.data.withdraw[key].name}</TableCell>
                                            <TableCell key={`noRek-${cellIndex}`} className="text-center">{item.data.withdraw[key].noRek}</TableCell> */}
                                            <TableCell key={`createdAt-${cellIndex}`} className="text-center">{item.data.withdraw[key].createdAt}</TableCell>
                                            <TableCell key={`amount-${cellIndex}`} className="text-center">{item.data.withdraw[key].amount}</TableCell>
                                            <TableCell key={`confirmation-${cellIndex}`} className="justify-center">
                                                <div className="flex flex-row gap-2 justify-center">
                                                    <button><img src={check} className="w-8" /></button>
                                                    <button><img src={cross} className="w-8" /></button>
                                                </div>
                                            </TableCell>
                                            <TableCell key={`status-${cellIndex}`} className="text-center">{item.data.withdraw[key].status}</TableCell>
                                        </TableRow>
                                    ))
                                ))}
                            </TableBody>
                        </Table>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    )
}
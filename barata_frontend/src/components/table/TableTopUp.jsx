import {
    Table,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableRow,
} from "@tremor/react";
import { useState } from 'react';
import check from '/src/assets/check.jpg'
import cross from '/src/assets/cross.jpg'

export default function tableTopUp({ source, datefilter }) {

    const [newStatus, setNewStatus] = useState(false)

    const handleAccept = () => {
        setNewStatus('accept');
        updateStatus('accept');
    };

    const handleReject = () => {
        setNewStatus('reject');
        updateStatus('reject');
    };

    const filteredData = source.filter((item) => {
        if (datefilter && datefilter.from && datefilter.to) {
            const totalPriceKeys = Object.keys(item.data.totalPrice);
            console.log("from", datefilter.from)
            console.log("to", datefilter.to)
            // Check if any totalPrice item has a createdAt within the date range
            const totalPriceWithinRange = totalPriceKeys.some((key) => {
                const createdAt = new Date(item.data.totalPrice[key].createdAt);
                return createdAt >= datefilter.from && createdAt <= datefilter.to;
            });

            // Return true if either totalPrice or withdraw has a createdAt within the date range
            return totalPriceWithinRange;
        }

        // If no date filter, return true for all items
        return true;
    });

    return (
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
                {filteredData.map((item, index) => (
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
                                    <button onClick={handleAccept}><img src={check} className="w-8" /></button>
                                    <button onClick={handleReject}><img src={cross} className="w-8" /></button>
                                </div>
                            </TableCell>
                            <TableCell key={`status-${cellIndex}`} className="text-center">{item.data.totalPrice[key].status}</TableCell>
                        </TableRow>
                    ))
                ))}
            </TableBody>
        </Table>
    )
}
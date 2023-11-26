import {
    Table,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableRow
} from "@tremor/react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { useState } from 'react';
import check from '/src/assets/check.jpg'
import cross from '/src/assets/cross.jpg'

export default function tableWithdraw({ source, datefilter }) {

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
          const withdrawKeys = Object.keys(item.data.withdraw);
      
          // Check if any withdraw item has a createdAt within the date range
          const withdrawWithinRange = withdrawKeys.some((key) => {
            const createdAt = new Date(item.data.withdraw[key].createdAt);
            return createdAt >= datefilter.from && createdAt <= datefilter.to;
          });
      
          // Return true if either totalPrice or withdraw has a createdAt within the date range
          return withdrawWithinRange;
        }
      
        // If no date filter, return true for all items
        return true;
      });

    return (
        <Table>
            <TableRow>
                <TableHeaderCell className="text-center">Created At</TableHeaderCell>
                <TableHeaderCell className="text-center">Amount</TableHeaderCell>
                <TableHeaderCell className="text-center">Confirmation</TableHeaderCell>
                <TableHeaderCell className="text-center">Status</TableHeaderCell>
            </TableRow>
            <TableBody>
                {filteredData.map((item, index) => (
                    Object.keys(item.data.withdraw).map((key, cellIndex) => (
                        <TableRow key={`${index}-${cellIndex}`}>
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
    )
}
import {
    Table,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableRow,
} from "@tremor/react";
import { useState } from 'react';
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import Modal from '/src/components/modal/modalFb'
import StatButton from '/src/components/shared/company_profile/StatButton'

export default function tableTopUp({ source, datefilter }) {

    const filteredData = source.filter((item) => {
        if (datefilter && datefilter.from && datefilter.to) {
            const totalPriceKeys = Object.keys(item.data.totalPrice);

            const totalPriceWithinRange = totalPriceKeys.some((key) => {
                const createdAt = new Date(item.data.totalPrice[key].createdAt);
                return createdAt >= datefilter.from && createdAt <= datefilter.to;
            });

            return totalPriceWithinRange;
        }

        return true;
    });

    return (
        <Table>
            <TableRow>
                <TableHeaderCell className="text-left">Name</TableHeaderCell>
                <TableHeaderCell className="text-center">Bank Account Number</TableHeaderCell>
                <TableHeaderCell className="text-center">Created At</TableHeaderCell>
                <TableHeaderCell className="text-center">Amount</TableHeaderCell>
                <TableHeaderCell className="text-center">Image Path</TableHeaderCell>
                <TableHeaderCell className="text-center">Payment Receipt</TableHeaderCell>
                <TableHeaderCell className="text-center">Confirmation</TableHeaderCell>
                <TableHeaderCell className="text-center">Status</TableHeaderCell>
            </TableRow>
            <TableBody>
                {filteredData.map((item, index) => (
                    Object.keys(item.data.totalPrice).map((key, cellIndex) => {

                        return (
                            <TableRow key={`${index}-${cellIndex}`}>
                                <TableCell key={`name-${cellIndex}`} className="text-left">{item.data.totalPrice[key].name}</TableCell>
                                <TableCell key={`noRek-${cellIndex}`} className="text-center">{item.data.totalPrice[key].noRek}</TableCell>
                                <TableCell key={`createdAt-${cellIndex}`} className="text-center">{item.data.totalPrice[key].createdAt}</TableCell>
                                <TableCell key={`amount-${cellIndex}`} className="text-center">{item.data.totalPrice[key].amount}</TableCell>
                                <TableCell key={`imgpath-${cellIndex}`} className="text-center">{item.data.totalPrice[key].imagePath}</TableCell>
                                <TableCell key={`paymentReceipt-${cellIndex}`} className="text-center">
                                    <Modal custKey={item.key} imgPath={item.data.totalPrice[key].imagePath}/>
                                </TableCell>
                                <TableCell key={`confirmation-${cellIndex}`} className="justify-center">
                                    <StatButton 
                                        customer_id={item.key}
                                        withdraw_id={key}
                                        status={item.data.totalPrice[key].is_verif}
                                    />
                                </TableCell>
                                <TableCell key={`status-${cellIndex}`} className="text-center">{item.data.totalPrice[key].status}</TableCell>
                            </TableRow>
                        );
                    })
                ))}
            </TableBody>
        </Table>
    )
}
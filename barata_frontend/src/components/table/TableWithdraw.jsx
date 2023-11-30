import {
    Table,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableRow
} from "@tremor/react";
import { useState } from 'react';
import check from '/src/assets/check.jpg'
import cross from '/src/assets/cross.jpg'
import StatButton from '/src/components/shared/company_profile/StatButton'

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

          const withdrawWithinRange = withdrawKeys.some((key) => {
            const createdAt = new Date(item.data.withdraw[key].createdAt);
            return createdAt >= datefilter.from && createdAt <= datefilter.to;
          });
          return withdrawWithinRange;
        }

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
                                <StatButton status={item.data.withdraw[key].is_verif} />
                            </TableCell>
                            <TableCell key={`status-${cellIndex}`} className="text-center">{item.data.withdraw[key].status}</TableCell>
                        </TableRow>
                    ))
                ))}
            </TableBody>
        </Table>
    )
}
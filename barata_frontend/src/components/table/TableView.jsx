import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
  } from "@tremor/react";
  
  const tableView = ({ source }) => {
    return (
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Id</TableHeaderCell>
              <TableHeaderCell className="text-right">Provinsi</TableHeaderCell>
              {/* <TableHeaderCell className="text-right">Location</TableHeaderCell> */}
              <TableHeaderCell className="text-right">Total Customer</TableHeaderCell>
              <TableHeaderCell className="text-right">Total Duration</TableHeaderCell>
              <TableHeaderCell className="text-right">Total Sales</TableHeaderCell>
              <TableHeaderCell className="text-right">Status</TableHeaderCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {source.map((item) => (
              <TableRow key={item.csName}>
                <TableCell>{item.csName}</TableCell>
                <TableCell className="text-right">{item.csId}</TableCell>
                <TableCell className="text-right">{item.provinsi}</TableCell>
                {/* <TableCell className="text-right">{item.location}</TableCell> */}
                <TableCell className="text-right">{item.totalCustomer}</TableCell>
                <TableCell className="text-right">{item.totalDuration}</TableCell>
                <TableCell className="text-right">{item.totalPrice}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={item.deltaType} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
export default tableView
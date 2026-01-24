import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

interface ActivityData {
  id: number;
  steps: number;
  sleep: number;
  date: string;
}

const UserData = () => {
  //this should be API response data
  const [data, setData] = useState<ActivityData[]>([]);
  useEffect(() => {
    axios.get<ActivityData[]>("http://127.0.0.1:8000/data/").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Steps</TableCell>
              <TableCell align="right">Sleep (h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dp) => (
              <TableRow
                key={dp.id + dp.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dp.date}
                </TableCell>
                <TableCell align="right">{dp.steps}</TableCell>
                <TableCell align="right">{dp.sleep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserData;

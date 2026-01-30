import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useActivityData from "../../hooks/useActivityData";
import type { ActivityData } from "../../hooks/useActivityData";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const UserData = () => {
  //this should be API response data
  const handleDelete = (id: number) => {
    axios
      .delete("http://localhost:8000/data/" + id)
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  };
  const { data, error } = useActivityData();
  return (
    <>
      <NavBar />
      {error && <p>{error}</p>}{" "}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1300,
          margin: "auto",
          marginTop: "2rem",
          backgroundColor: "#242424",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Steps</TableCell>
              <TableCell align="right">Sleep (h)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dp) => (
              <TableRow
                key={dp.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dp.date}
                </TableCell>
                <TableCell align="right">{dp.steps}</TableCell>
                <TableCell align="right">{dp.sleep}</TableCell>
                <TableCell align="right" sx={{ width: "0px" }}>
                  <button
                    onClick={() => {
                      handleDelete(dp.id);
                    }}
                  >
                    delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserData;

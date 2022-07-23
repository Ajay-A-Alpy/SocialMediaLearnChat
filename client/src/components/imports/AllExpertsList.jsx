import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllExperts} from "../../redux/features/adminSlice";
import {useNavigate} from "react-router-dom";
import * as api from "../../redux/api";

function AllExpertList() {
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllExperts(navigate));
  }, [change]);

  const handleBlock = (id) => {
    let data = {
      userId: id,
      isExpert: true,
    };
    const block = async () => {
      try {
        await api.blockUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    block();
    setChange(!change);
  };

  const handleUnBlock = (id) => {
    let data = {
      userId: id,
      isExpert: true,
    };
    const unblock = async () => {
      try {
        await api.unblockUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    unblock();
    setChange(!change);
  };

  const {allExperts} = useSelector((state) => ({...state.admin}));
  return (
    <Box
      flex={4}
      sx={{backgroundColor: "#0071c5", height: "85vh", padding: "2rem"}}
    >
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl no</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Place</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExperts.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.mobile}</TableCell>
                <TableCell align="left">{row.place}</TableCell>
                <TableCell align="left">
                  {row?.blockStatus ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUnBlock.bind(this, row._id)}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleBlock.bind(this, row._id)}
                    >
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllExpertList;

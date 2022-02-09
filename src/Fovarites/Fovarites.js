import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TableRow, Typography } from "@mui/material";
import { hotelsContext } from "../MyContext/MyContext";
import { Link } from "react-router-dom";
// import { calcTotalPrice } from "./CartPrice";
import { ArrowBack, DeleteForeverOutlined } from "@material-ui/icons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Cart() {
  const { favorite,
    getFavorite,
    deleteFromFavorite,  } = useContext(hotelsContext);
  useEffect(() => {
    getFavorite()
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorite.products ? (
            <>
              {favorite.products.map((elem, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      width="200px"
                      src={elem.item._document.data.value.mapValue.fields.image.stringValue}
                      alt={elem.item._document.data.value.mapValue.fields.name.stringValue}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {elem.item._document.data.value.mapValue.fields.name.stringValue}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        deleteFromFavorite(elem.item.id, elem.item.price)
                      }
                    >
                      <DeleteForeverOutlined />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell>
                <h1>Loading...</h1>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Link to="/list">
                <Button variant="contained" color="primary">
                  <ArrowBack  />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

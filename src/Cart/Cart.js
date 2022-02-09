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
import { calcTotalPrice } from "./CartPrice";
import { DeleteForeverOutlined } from "@material-ui/icons";

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
  const { cart, getCart, deleteFromCart, changeProductCount } = useContext(hotelsContext);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Count</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products ? (
            <>
              {cart.products.map((elem, index) => (
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
                  <StyledTableCell height="120" align="center">
                    {elem.item._document.data.value.mapValue.fields.price.integerValue}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <input
                      type="number"
                      value={elem.count}
                      onChange={(e) =>
                        changeProductCount(e.target.value, elem.item.id)
                      }
                      min="1"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                   {elem.item.subPrice}
                   {console.log(elem.subPrice, "ss")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        deleteFromCart(elem.item.id, elem.item.price)
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
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>
              <Typography variant="h5">Total:</Typography>
            </TableCell>
            {cart.products ? (
              <TableCell align="right">
                <Typography variant="h5">
                  {calcTotalPrice(cart.products)}
                </Typography>
              </TableCell>
            ) : null}
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Link to="/credit">
                <Button variant="contained" color="primary">
                  BUY
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

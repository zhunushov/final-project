import React, { useContext } from "react";
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
import { DeleteForeverOutlined } from "@material-ui/icons";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
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
  const { cart, hotels  } = useContext(hotelsContext);

  function removetocart(item) {
    hotels.map((i) => {
      if(i.id == item.id){
        i.cart = false
      }
    })
    db.collection("cart").doc(`${item.id}`).delete()
  }
  function incrementHotel (item) {
    db.collection("cart").doc(`${item.id}`).update("quantity",
     fs.firestore.FieldValue.increment(1))
    
  }
  function decrementHotel(item) {
   db.collection('cart').doc(`${item.id}`).update("quantity", fs.firestore.FieldValue.increment(-1))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Count</StyledTableCell>
            <StyledTableCell align="center">SubPrice</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.length > 0 ? (
            <>
              {cart.map((elem, index) => (
                <StyledTableRow key={elem.id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      width="200px"
                      src={elem.image}
                      alt={elem.name}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {elem.price}
                  </StyledTableCell>
                  <StyledTableCell height="120" align="center">
                    {elem.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => incrementHotel(elem)}>
                      +
                    </Button>
                      {elem.quantity}
                      <Button onClick={() => decrementHotel(elem)}>
                      -
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                   { console.log(elem.subPrice, "sub")}
                   {elem.subPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        removetocart(elem)
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
            {cart.hotels ? (
              <TableCell align="right">
                <Typography variant="h5">
                  {total()}
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

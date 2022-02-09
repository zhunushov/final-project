import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { Bookmark, ShoppingCart } from '@material-ui/icons';
import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hotelsContext } from '../../../MyContext/MyContext';
const ListStore = ({ item }) => {  
    const {addCartHotel, handleDelete, checkHotelInCart, addFovHotel } = useContext(hotelsContext)

    return (
      <>
      <CssBaseline />
            <Grid gutterBottom  style={{margin : "10px" , paddingTop: "20px"}}>
           <Card container style={{alignItems:'center', maxWidth: "75%",  borderRadius: "4%", justifyContent: "center" , margin: "auto" , backgroundColor: "#628C9C"}}>
            <CardMedia image={item._document.data.value.mapValue.fields.image.stringValue}  style={{height: 400,  maxWidth: "100%",  margin: "14px",  borderRadius: "4%",}} />
            <CardContent>
          <div style={{display: "flex", justifyContent: "space-between"}}>
             <Typography  variant='h6'>
              Name:  {item._document.data.value.mapValue.fields.name.stringValue}
             </Typography>
             <Typography  variant='h5'>
              Type:   {item._document.data.value.mapValue.fields.brand.stringValue}
             </Typography>
             <Typography  variant='body1'>
              Price $  {item._document.data.value.mapValue.fields.price.stringValue}
             </Typography>
             <Typography variant='h6'>
               Rading:  {item._document.data.value.mapValue.fields.rating.stringValue}
               </Typography>

               <IconButton  onClick={() => addCartHotel(item)}
               color={checkHotelInCart(item.id) ? "varning" : "inherit"}
              >
              <ShoppingCart/>
            </IconButton>
            <Button onClick={() => addFovHotel(item)}>
              <Bookmark  color='green'/>
            </Button>
            </div>

            <Button
             onClick={() =>  handleDelete(item.id)}
             className="btn-danger">
             Delete
             </Button>
             <Link to={`edit/${item.id}`}  style={{textDecoration: "none"}}>
             <Button >
                 Edit
             </Button>
             </Link>

           </CardContent>
            </Card>
           </Grid>
    </>
    );
};

export default ListStore;
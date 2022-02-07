import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { ShoppingBasketOutlined } from '@material-ui/icons';
import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotelsContext } from '../../../MyContext/MyContext';

const ListStore = () => {
  // // {item._document.data.value.mapValue.fields.rating.stringValue}
  //   const dispatch = useDispatch()
  //   const hotels = useSelector(state =>  state.hotelReducer.hotels);
    const { hotels, getHotelsCard, addCartHotel, handleDelete } = useContext(hotelsContext)
    console.log(hotels);

    useEffect(() => {
        getHotelsCard()
    },[])

    return (
      <>
      <CssBaseline />
       <Box  spacing={2}>
      { hotels && hotels.length > 0 ? (
         hotels.map((item, index) => (
           <Grid xs={24} sm={2} md={6} >
             <Grid >
           <Card container key={index}>
            <CardMedia image={item._document.data.value.mapValue.fields.image.stringValue}  style={{height: 350}} />
            <CardContent>
             <Typography  variant='h6'>
               {item._document.data.value.mapValue.fields.name.stringValue}
             </Typography>
             <Typography  variant='h5'>
               {item._document.data.value.mapValue.fields.brand.stringValue}
             </Typography>
             <Typography  variant='p'>
               {item._document.data.value.mapValue.fields.price.stringValue}
             </Typography>
             <Typography variant='h6'>
               {item._document.data.value.mapValue.fields.rating.stringValue}
               <IconButton>
              <ShoppingBasketOutlined  
              onClick={() => addCartHotel(item)}
              // color={checkHotelInCart(item.id) ? "secondary" : "inherit"}
              />
            </IconButton>

            <Button
            onClick={() =>  handleDelete(item.id)}
            className="btn-danger">
             Delete
             </Button>
             <Link to={`edit/${item.id}`} >
             <Button >
                 Edit
             </Button>
             </Link>

             </Typography>
           </CardContent>
        </Card>
             </Grid>
           </Grid>
        ))): (<h1 style={{textAlign:'center'}}>loading...</h1> )}
    </Box>
    </>
    );
};

export default ListStore;
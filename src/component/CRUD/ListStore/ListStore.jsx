import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { ShoppingBasketOutlined } from '@material-ui/icons';
import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotelsContext } from '../../../MyContext/MyContext';

const ListStore = () => {

    const { hotels, cart,  getHotelsCard,  handleDelete } = useContext(hotelsContext)

    useEffect(() => {
        getHotelsCard()
    },[])

    useEffect(() => {
      db.collection("cart")
      .onSnapshot((querySnapshot) => {
        let p = []
        querySnapshot.forEach((doc) => {
          p.push(doc.data())
          hotels.map((i) => {
            if(i.id == doc.data().id){
              i.cart = true
            }
          })
        })
       setHotels(p)
      })
  }, [])

function  addCart (item) {

  hotels.map((i) => {
   if(i.id == item.id) {
     i.cart = true
   }
 })

 db.collection("cart").doc(`${item.id}`).set(item, {merge: true})
}



function total() {
 let x = 0 
 cart.map((i) => {
   x += i.price * i.quantity

 })
 return x
}

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

           {
             item.cart == false && 
               <IconButton  onClick={() => addCart(item)}  >
               <ShoppingBasketOutlined/>
               </IconButton>
            }
            {
              item.cart == true && 
              <IconButton  onClick={() => addCart(item)}  >
              <ShoppingBasketOutlined color='secondary'/>
              </IconButton>
            }

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
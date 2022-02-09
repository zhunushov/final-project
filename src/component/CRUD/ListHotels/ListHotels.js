import React, { useEffect } from 'react';
import { useContext } from 'react';
import { hotelsContext } from '../../../MyContext/MyContext';
import { Box, Grid, } from "@material-ui/core"
import CartHotels from "../CartHotel/CartHotels"
const ListHotels = () => {
   const { hotels , getHotelsCard} = useContext(hotelsContext)
    useEffect(() => {
    getHotelsCard()
    },[])
    return (
      <>
        <Box style={{ backgroundColor: "#AEDFFA", marginTop: "-30px"}}>
        <Grid >
          {hotels.length > 0 ? (
            hotels.map((item, index) => (
              <Grid item   key={index}>
                <CartHotels item={item} key={index} />
              </Grid>
            ))
          ) : (
            <h1>Loading...</h1>
          )
          }
        </Grid>
      </Box>
      </>
    
    );
};

export default ListHotels;
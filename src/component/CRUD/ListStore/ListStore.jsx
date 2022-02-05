import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getHotelsCard } from '../../CrudRedux';
import CardStore from './CardStore/CardStore';

const ListStore = () => {
    const dispatch = useDispatch()
    const hotels = useSelector(state =>  state.hotelReducer.hotels);

    useEffect(() => {
        dispatch(getHotelsCard())
    },[])

    return (
    <Box>
       <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {hotels && hotels.length > 0 ? (
          hotels.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
               <CardStore item={item} key={index} />
            </Grid>
          ))
        ) : (
          <h1>Loading....</h1>
        )}
        </Grid>
    </Box>
    );
};

export default ListStore;
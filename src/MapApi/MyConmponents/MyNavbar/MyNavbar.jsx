import React, { useState }from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Badge, Box, Button, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style'
import { ShoppingBasket } from '@material-ui/icons';

const MyNavbar = () => {
    const classes = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}> 
               <Typography variant='h5' className={classes.title}>
                   Travel Advisor
               </Typography>
               <Box display="flex">
                   <Typography variant="h6" className={classes.title}>
                       Explore new places
                   </Typography>
                   {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
                       <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase placeholder='Search....' classes={{ root: classes.inputRoot, input: classes.inputInput}} />
                       </div>
                   {/* </Autocomplete> */}
               </Box>
               <Badge  badgeContent={cartLength} color="secondary">
                <ShoppingBasket
                  sx={{ color: "text.secondary" }}
                  style={{ marginRight: "10px" }}
                  fontSize="large"
                />
              </Badge>
            </Toolbar>
        </AppBar>
    );
};

export default MyNavbar;
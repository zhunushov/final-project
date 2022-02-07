import React, { useContext, useState }from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Badge, Box, Button, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style'
import {  ShoppingCart } from '@material-ui/icons';
import { hotelsContext } from '../../../MyContext/MyContext';
import { logout, useAuth } from '../../../Auth/Auth';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    
    const currentUser = useAuth()
    const { cartLength } = useContext(hotelsContext)
    const classes = useStyles()


    
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

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
                   <Link to="/cart" style={{ color: "white" }}>
                    <IconButton color="inherit">
                      <Badge badgeContent={cartLength} color="secondary">
                    <ShoppingCart />
                    </Badge>
                </IconButton>
                  </Link>
              { currentUser?.email }
              {currentUser ? (
            <Button
              loadingPosition="end"
              variant="contained"
            
              disabled={!currentUser}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          ) : null}

               </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyNavbar;
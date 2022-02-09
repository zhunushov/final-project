import React, { useContext, useState }from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar,  Badge,  Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style'
import {  AccountCircle, LocalDiningOutlined, More, NextWeek, PersonAdd } from '@material-ui/icons';
import { hotelsContext } from '../../../MyContext/MyContext';
import { logout, useAuth } from '../../../Auth/Auth';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
const MyNavbar = ({ onPlaceChanged , onLoad }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // !!!!!!!!!!!!!!!!!!!
    const currentUser = useAuth()
    const classes = useStyles()

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );
     


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <Button onClick={logout}>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Button>
        <Link to='/login' style={{textDecoration: 'none'}}>
      <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
        </Link>
      <Link to="/register" style={{textDecoration: 'none'}}> 
       <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
      </Link>
    </Menu>
  );

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
                  </Link>
                   {currentUser?.email.substring(0, currentUser.email.length - 10)}
                   <IconButton
                   size="large"
                   edge="end"
                   aria-label="account of current user"
                   aria-controls={menuId}
                   aria-haspopup="true"
                   onClick={handleProfileMenuOpen}
                    color="inherit" >
              <AccountCircle />
            </IconButton>
               </Box>
               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <More />
              </IconButton>
             </Box>
            </Toolbar>
            {renderMenu}
             {renderMobileMenu}
        </AppBar>
    );
};

export default MyNavbar;

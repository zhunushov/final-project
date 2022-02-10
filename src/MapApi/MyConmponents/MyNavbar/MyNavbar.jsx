import React, {  useState }from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar,   Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './style'
import {  AccountCircle, Chat } from '@material-ui/icons';
import { logout, useAuth } from '../../../Auth/Auth';
import { Link } from 'react-router-dom';
const MyNavbar = ({ onPlaceChanged , onLoad }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
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
  // !!!!!!!!!!!!!!!!!!!
    const currentUser = useAuth()
    const classes = useStyles()



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
                   <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                       <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase placeholder='Search....' classes={{ root: classes.inputRoot, input: classes.inputInput}} />
                       </div>
                   </Autocomplete>
                   <Link to="/chat">
            <Chat  color="secondary"/>
                    </Link>
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
             </Box>
            </Toolbar>
            {renderMenu}
        </AppBar>
    );
};

export default MyNavbar;

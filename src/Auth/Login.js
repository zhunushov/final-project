import { Box, Button, Container, CssBaseline, Typography, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from './Auth';
import { GoogleAuthProvider , signInWithPopup } from 'firebase/auth';
import { Form } from "react-bootstrap"
import { auth } from './Firebase';
import MyNavbar from '../MapApi/MyConmponents/MyNavbar/MyNavbar';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
    const provider = new GoogleAuthProvider()
    const authGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate()
    const handleSubmit =(event) => {
        const data = new FormData(event.currentTerget)
        console.log({
            email: data.get("email"),
            password: data.get("password"),
          });
        handleSignIn(data.get('email'), data.get('password'))
        navigate('/')
    }
    async function handleSignIn (email, password) {
        try {
            await signin(email, password)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <MyNavbar/>
        <div style={{maxWidth: "70%",  display: "grid",margin: "auto", textAlign: "center", backgroundColor: "#C3D1FF", height: "100%", marginBottom: "18%"}}>
        <CssBaseline />
        <Typography variant='h4' style={{marginTop: "30px"}}> Sign In</Typography>
        <Box component='form' className="mb-3" noValidate   onSubmit={handleSubmit} >
          <div item xs={6} >
          <TextField
          required
          fullWidth
          name='email'
          label="Email">
          </TextField>
          </div>
          <div item xs={6} >
          <TextField
          required
          fullWidth
          type="password"
          name='password'
          label="Password"
          >
          </TextField>
          </div>
          <Grid style={{margin: "5px"}} >
              <Button type='submit' variant='contained'  color="primary">Sign In</Button>
              <Button onClick={authGoogle} style={{margin: "8px"}}  variant='contained' color='secondary'><GoogleIcon />Google </Button>
              <Link to='/register'  style={{ textDecoration: "none"}}><Button variant='outlined'color="primary" > Sign Up</Button></Link>
          </Grid>
        </Box>
     </div>
        </>
    );
};

export default Login;


import { Box, Button, Container, CssBaseline, Typography, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from './Auth';
const Login = () => {
   
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
        <Container>
        <CssBaseline />
        <Typography variant='h2'> Sign In</Typography>
        <Box component='form' noValidate   onSubmit={handleSubmit} >
          <Grid item xs={12} >
          <TextField
          required
          fullWidth
          name='email'
          label="Email"
          >
          </TextField>
          </Grid>
          <Grid item xs={12} >
          <TextField
          required
          fullWidth
          type="password"
          name='password'
          label="Password"
          >
          </TextField>
          </Grid>
          <Grid item xs={2} md={2} sm={2}>
              <Button type='submit' color="secondary">Sign In</Button>
              <Link to='/register'><Button> Sign Up</Button></Link>
          </Grid>
        </Box>
     </Container>
    );
};

export default Login;
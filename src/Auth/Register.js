import React  from 'react';
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core'
import { signUp } from './Auth';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    
    const navigate = useNavigate()
     const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get("email"),
            password: data.get("password"),
          });
          handleSignUp(data.get( 'email'), data.get("password"))
         navigate('/')
     } 
     async function handleSignUp(email, password) {
         try {
             await signUp(email, password)
         } catch (error) {
            console.log(error); 
         }
     }
    return (
        <Container>
           <CssBaseline />
           <Typography variant='h2'> Sign Up</Typography>
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
                 <Button type='submit' color="secondary">sign up</Button>
                 <Link to='/login'><Button> sign in</Button></Link>
             </Grid>
           </Box>
        </Container>
    );
};

export default Register;
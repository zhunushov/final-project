import React  from 'react';
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core'
import { signUp } from './Auth';
import { Link, useNavigate } from 'react-router-dom';
import MyNavbar from '../MapApi/MyConmponents/MyNavbar/MyNavbar';
import GoogleIcon from '@mui/icons-material/Google';
import { Form } from "react-bootstrap"
import { GoogleAuthProvider , signInWithPopup } from 'firebase/auth';
import { auth } from './Firebase';
const Register = () => {
    const provider = new GoogleAuthProvider()
    const authGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
        } catch (error) {
            console.log(error);
        }
    }
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
        <>
         <MyNavbar/>
        <div style={{maxWidth: "70%",  display: "grid",margin: "auto", textAlign: "center", backgroundColor: "#C3D1FF", height: "100%", marginBottom: "18%"}}>
        <CssBaseline />
        <Typography variant='h4' style={{marginTop: "30px"}}> Sign Up</Typography>
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
              <Button type='submit' variant='contained'  color="primary">Sign Up</Button>
              <Button onClick={authGoogle} style={{margin: "8px"}}  variant='contained' color='secondary'><GoogleIcon />Google </Button>
              <Link to='/login'  style={{ textDecoration: "none"}}><Button variant='outlined'color="primary" > Sign In</Button></Link>
          </Grid>
        </Box>
     </div>
        </>
    );
};

export default Register;
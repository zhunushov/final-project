
import { Box, Button,   TextField,
  } from '@mui/material';
  import React, { useContext, useState } from "react";
  import { ToastContainer } from "react-toastify";
import { hotelsContext } from '../MyContext/MyContext';
  const AddStore = () => {
    const { getProductsToBot  } = useContext(hotelsContext)
    const [newPost, setNewPost] = useState({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
    });
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(newPost);
      for (const key in newPost) {
        if (!newPost[key]) {
          alert("Заполните поля");
          return;
        }
       
      }
      getProductsToBot(newPost)
    setNewPost({firstName: '', lastName: "", address: "", country: ""  });
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
        <h2 style={{textAlign: 'center'}}>Add</h2>
          <Box sx={{ mt: "50px" }}>
            <TextField
              onChange={(e) => setNewPost({ ...newPost, firstName: e.target.value })}
              value={newPost.firstName}
              id="outlined-basic"
              label="Name"
              variant="standard"
              sx={{ width: "50%", marginLeft: "25%" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, lastName: e.target.value })}
              value={newPost.lastName}
              id="filled-basic"
              label="Brand"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, address: e.target.value })}
              value={newPost.address}
              id="standard-basic"
              label="Price"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, country: e.target.value })}
              value={newPost.country}
              id="standard-basic"
              label="Price"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
          </Box>
  
          <Button
            type="submit"
            sx={{ ml: "25%", width: "50%", mt: "20px" }}
            variant="contained"
            color="primary"
          >
            {" "}
            By
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  };
  
  export default AddStore;
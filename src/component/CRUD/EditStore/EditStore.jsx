
import { Box, Button,  FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from '@mui/material';
  import { editHotels, saveEditedHotel } from '../../CrudRedux';
  import React, { useEffect, useState } from "react";
  import { ToastContainer } from "react-toastify";
  import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
  const EditStore = () => {

    const dispatch = useDispatch()
    const edit = useSelector(state => state.hotelReducer.edit)
    const { id } = useParams()
    const [newPost, setNewPost] = useState({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      rating: "",
    });

    useEffect(() => {
       dispatch(editHotels(id))
    }, [id])
    
    useEffect(() => {
        if(edit) setNewPost(edit)
    }, [edit])

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(newPost);
      for (const key in newPost) {
        if (!newPost[key]) {
          alert("Заполните поля");
          return;
        }
      }
    dispatch(saveEditedHotel(newPost));
    setNewPost({ name: "",  brand: "",  price: "",  description: "",  image: "",  rating: "",});
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
        <h2>edit</h2>
          <Box sx={{ mt: "50px" }}>
            <TextField
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              value={newPost.name}
              id="outlined-basic"
              label="Name"
              variant="standard"
              sx={{ width: "50%", marginLeft: "25%" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, brand: e.target.value })}
              value={newPost.brand}
              id="filled-basic"
              label="Brand"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
              value={newPost.price}
              id="standard-basic"
              label="Price"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />

            <TextField
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              value={newPost.description}
              id="standard-basic"
              label="Description"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
            <TextField
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
              value={newPost.image}
              id="standard-basic"
              label="Image"
              variant="standard"
              sx={{ width: "50%", ml: "25%", mt: "20px" }}
            />
            <FormControl sx={{ width: "50%", ml: "25%", mt: "20px" }}>
              <InputLabel id="rating-select">Rating</InputLabel>
              <Select
                labelId="rating-select"
                label="Выберите рейтинг"
                onChange={(e) =>
                  setNewPost({ ...newPost, rating: e.target.value })
                }
                value={newPost.rating}>
                <MenuItem value="⭐️⭐️">⭐️⭐️✩✩✩</MenuItem>
                <MenuItem value="⭐️⭐️⭐️">⭐️⭐️⭐️✩✩</MenuItem>
                <MenuItem value="⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️✩</MenuItem>
                <MenuItem value="⭐️⭐️⭐️⭐️⭐️">⭐️⭐️⭐️⭐️⭐️</MenuItem>
                <MenuItem value="🌟🌟🌟🌟🌟">🌟🌟🌟🌟🌟</MenuItem>
              </Select>
            </FormControl>
          </Box>
  
          <Button
            type="submit"
            sx={{ ml: "25%", width: "50%", mt: "20px" }}
            variant="contained"
            color="primary"
          >
            {" "}
            Save
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  };
  
  export default EditStore;
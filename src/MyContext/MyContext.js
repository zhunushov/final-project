import  React, { createContext, useReducer } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { calcSubPrice, calcSubPriceFov, calcTotalPrice, calcTotalPriceFov } from "../Cart/CartPrice";
import { db } from "../Auth/Firebase";
import { toast } from "react-toastify";

export const hotelsContext = createContext()

const INIT_STATE = { 
    hotels: [],
    edit: null,
    // cart
    cart: {},
    cartlength: 0,
    favorites: {}
}
const GET_STORE = "GET_STORE"
const EDIT_STORE = "EDIT_STORE"

const GET_CART = "GET_CART"
const GET_CART_LENGTH = "GET_CART_LENGTH"

const FAVORITES = "FAVORITES"

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_STORE :
            return { ...state, hotels: action.payload}
        case EDIT_STORE:
            return { ...state , edit: action.payload}

        case GET_CART :
          return {...state, cart: action.payload}
          case GET_CART_LENGTH :
              return {...state, cartlength: action.payload}

        case FAVORITES :
            return {...state, favorites: action.payload}

        default : return state
    }
}

const MyContext = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //  ! create
     const createStore = async (newHotel) => {
        try {
            await addDoc(collection(db, "stores"), newHotel)
            getHotelsCard()
        } catch (error) {
            toast.success('Error')
        }
        
    }
  // !read
    const getHotelsCard = async () => {
        try{
            const res = query(collection(db, "stores"));
            const unsubscribe =  onSnapshot(res, (item) => {
            const hotels = [];
            item.forEach((item) => {
                hotels.push(item);
            });
            let action = {
              type: GET_STORE,
              payload: hotels
            }
            dispatch(action)});
          }catch(err){
                console.log(err)
        }
    }
    // ! Delete
     const handleDelete  = async (id) =>  {
        const delHot = doc(db, "stores", id)
        await deleteDoc(delHot)
        getHotelsCard() 
     };
    //  ! Edit 
     const editHotels = async (id) => {
      try {
          const docRef = doc(db, "stores", id);
          const docSnap = await getDoc(docRef);
          let action = {
            type: EDIT_STORE,
            payload: docSnap.data()
        }
        dispatch(action)
         
      } catch (error) {
          console.log('EDIT_HOTYEL_ERR', error);
      }
    }
    // ! Save
    const saveEditedHotel = async (id, newHotel) => {
      try {
          const docRef = doc(db, "stores", id);
          updateDoc(docRef, newHotel)
          getHotelsCard()
      } catch (error) {
          console.log('SAVE_HOTEL_ERR', error);
      }
     }

     // !   cart
    const addCartHotel = (hotel) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
          cart = {
            hotels: [],
            totalPrice: 0,
          };
        }
        let newProduct = {
          item: hotel,
          count: 1,
          subPrice: 0,
        };
        let filteredCart = cart.hotels.filter((elem) => elem.item.id === hotel.id);
        if (filteredCart.length > 0) {
          cart.hotels = cart.hotels.filter((elem) => elem.item.id !== hotel.id);
        } else {
          cart.hotels.push(newProduct);
        }
        
        newProduct.subPrice = calcSubPrice(newProduct);
        cart.totalPrice = calcTotalPrice(cart.hotels);
        localStorage.setItem("cart", JSON.stringify(cart));
    
        dispatch({
            type: GET_CART_LENGTH,
            payload: cart.hotels.length
        })
      };
    
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
          cart = {
            hotels: [],
            totalPrice: 0,
          };
        }
       
        dispatch({
            type: GET_CART_LENGTH,
            payload: cart.hotels.length,
          });
      };
    
      const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
          cart = {
            hotels: [],
            totalPrice: 0,
          };
        }
        dispatch({
            type: GET_CART,
            payload: cart
          });
      };
      
     const changeHotelCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.hotels = cart.hotels.map((elem) => {
          if (elem.item.id === id) {
            elem.count = count;
            elem.subPrice = calcSubPrice(elem);
          }
          return elem;
        });
        cart.totalPrice = calcTotalPrice(cart.hotels);
        localStorage.setItem("cart", JSON.stringify(cart));
        getCartLength();
        getCart();
      };
    
    const checkHotelInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
          cart = {
            hotels: [],
            totalPrice: 0,
          };
        }
        let newcart = cart.hotels.filter((elem) => elem.id === id);
        return newcart.length > 0 ? true : false;
      };
    
     const deleteFromCart = (id, price) => {
        let items = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < items.hotels.length; i++) {
          let targetItem = items.hotels[i].item.id
          let targetItemPrice = items.hotels[i].item.price

    
          if (targetItem == id) {
            items.hotels.splice(i, 1);
          }
          if (targetItemPrice == price) {
            items.totalPrice = items.totalPrice - price;
          }
        }
        items = JSON.stringify(items);
        localStorage.setItem("cart", items);
        getCart();
      };
      // !!!!!!!!!!!!!!!!!!!!!fovarites
      
      const addFovHotel = (hotel) => {
        let fav = JSON.parse(localStorage.getItem("fav"));
        if (!fav) {
          fav = {
            hotels: [],
            totalPrice: 0,
          };
        }
        let newProduct = {
          item: hotel,
          count: 1,
          subPrice: 0,
        };
        let filteredCart = fav.hotels.filter((elem) => elem.item.id === hotel.id);
        if (filteredCart.length > 0) {
          fav.hotels = fav.hotels.filter((elem) => elem.item.id !== hotel.id);
        } else {
          fav.hotels.push(newProduct);
        }
        
        newProduct.subPrice = calcSubPriceFov(newProduct);
        fav.totalPrice = calcTotalPriceFov(fav.hotels);
        localStorage.setItem("fav", JSON.stringify(fav));
    
        dispatch({
            type: FAVORITES,
            payload: fav
        })
      };
    
    const getFovLength = () => {
        let fav = JSON.parse(localStorage.getItem("fav"));
        if (!fav) {
          fav = {
            hotels: [],
            totalPrice: 0,
          };
        }
       
        dispatch({
            type: FAVORITES,
            payload: fav,
          });
      };
    
      const getFov = () => {
        let fav = JSON.parse(localStorage.getItem("fav"));
        if (!fav) {
          fav = {
            hotels: [],
            totalPrice: 0,
          };
        }
        dispatch({
            type: FAVORITES,
            payload: fav
          });
      };
      
     const changeHotelCountFov = (count, id) => {
        let fav = JSON.parse(localStorage.getItem("fav"));
        fav.hotels = fav.hotels.map((elem) => {
          if (elem.item.id === id) {
            elem.count = count;
            elem.subPrice = calcSubPrice(elem);
          }
          return elem;
        });
        fav.totalPrice = calcTotalPrice(fav.hotels);
        localStorage.setItem("fav", JSON.stringify(fav));
        getFovLength();
        getFov();
      };
    
    const checkHotelInFov = (id) => {
        let fav = JSON.parse(localStorage.getItem("fav"));
        if (!fav) {
          fav = {
            hotels: [],
            totalPrice: 0,
          };
        }
        let newcart = fav.hotels.filter((elem) => elem.id === id);
        return newcart.length > 0 ? true : false;
      };
    
     const deleteFromFov = (id, price) => {
        let items = JSON.parse(localStorage.getItem("fav"));
        for (let i = 0; i < items.hotels.length; i++) {
          let targetItem = items.hotels[i].item.id
          let targetItemPrice = items.hotels[i].item.price

    
          if (targetItem == id) {
            items.hotels.splice(i, 1);
          }
          if (targetItemPrice == price) {
            items.totalPrice = items.totalPrice - price;
          }
        }
        items = JSON.stringify(items);
        localStorage.setItem("fav", items);
        getFov();
      };

    return (
        <hotelsContext.Provider
        value={{
         hotels: state.hotels,
         edit: state.edit,
         cart: state.cart,
         cartlength: state.cartlength,
         favorites: state.favorites,
         createStore,
         getHotelsCard,
         handleDelete,
         editHotels,
         saveEditedHotel,
        //  cart
         addCartHotel,
         getCart,
         getCartLength,
         changeHotelCount,
         checkHotelInCart,
         deleteFromCart,
        //  fov
        getFov,
        addFovHotel,
        changeHotelCountFov,
        checkHotelInFov,
        deleteFromFov

        }}>
            {props.children}
        </hotelsContext.Provider>
    );
};

export default MyContext;
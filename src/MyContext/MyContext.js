import  React, { createContext, useReducer } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { calcSubPrice, calcSubPriceFov, calcTotalPrice, calcTotalPriceFov } from "../Cart/CartPrice";
import { db } from "../Auth/Firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from '../Halpers'
export const hotelsContext = createContext()
console.log(API);
const INIT_STATE = { 
    hotels: [],
    edit: null,
    // cart
    cart: {},
    cartLength: 0,

    favorite: {},
    favoriteLength: 0,
    // 
    pagination: 1,

    // commnet
    comment:[],
    bottele: {}
}
const GET_STORE = "GET_STORE"
const EDIT_STORE = "EDIT_STORE"

const GET_CART = "GET_CART"
const GET_CART_LENGTH = "GET_CART_LENGTH"

const FAVORITES = "FAVORITES"
const CHANGE_FAVORITE_COUNT = "CHANGE_FAVORITE_COUNT"

const GET_COMMENT = "GET_COMMENT"

const BOT_TELEGRAM = "BOT_TELEGRAM"
const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_STORE :
            return { ...state, hotels: action.payload}
        case EDIT_STORE:
            return { ...state , edit: action.payload}

        case GET_CART :
          return {...state, cart: action.payload}
          case GET_CART_LENGTH :
              return {...state, cartLength: action.payload}

        case FAVORITES :
            return {...state, favorite: action.payload}
        case CHANGE_FAVORITE_COUNT :
            return {...state, favoriteLength: action.payload}
        case GET_COMMENT:
            return {...state, comment: action.payload.data, 
              pagination: Math.ceil(action.payload.headers["x-total-count"] / 3)
            }
        case BOT_TELEGRAM :
          return {...state, bottele: action.payload}

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
        const delHot = doc(db, "g", id)
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
    //  !COMMENT
    const addComment = async (commnetc ) => {
      console.log(commnetc, "db");
      try {
         const res =  await axios.post(API, commnetc)
         getComment()
         return res
      } catch (error) {
        console.log(error);
      }
    }
    const deleteCommnet = async (id) => {
      try {
        await axios.delete(`${API}/${id}`);
        getComment();
        toast.success("Успеншно удаленно!", { icon: "🚀" });
      } catch (error) {
        // ! toastify
        toast.success("Что то пошло не так!", { icon: "🚀" });
      }
    };
     
    const getComment =  async() => {
        try {
          const res = await axios.get(`${API}/${window.location.search}`)
          let action = {
            type: GET_COMMENT,
            payload: res
          }
          dispatch(action)
        } catch (error) {
           console.log(error);
        }
    }
     // !   cart
  
    const addProductInCart = (product) => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (!cart) {
          cart = {
              products: [],
              totalPrice: 0
          }
      }

      let newProduct = {
          item: product,
          count: 1,
          subPrice: 0
      }

      let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
      if (filteredCart.length > 0){
          cart.products = cart.products.filter(elem => elem.item.id !== product.id)
      }else {
          cart.products.push(newProduct)
      }
      newProduct.subPrice = calcSubPrice(newProduct)
      cart.totalPrice = calcTotalPrice(cart.products)
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
          type: GET_CART_LENGTH,
          payload: cart.products.length
      })
  }

  const getCartLength = () => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if(!cart){
          cart = {
              products: [],
              totalPrice: 0
          }
      }
      dispatch({
          type:  GET_CART_LENGTH,
          payload: cart.products.length
      })
  }

  const getCart = () => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if(!cart){
          cart = {
              products: [],
              totalPrice: 0
          }
      }
      dispatch({
          type: GET_CART,
          payload: cart
      })
  }

  const changeProductCount = (count, id) => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.products = cart.products.map(elem => {
          if(elem.item.id == id){
              elem.count = count
              elem.subPrice = calcSubPrice(elem)
          }
          return elem
      })
      cart.totalPrice = calcTotalPrice(cart.products)
      localStorage.setItem('cart', JSON.stringify(cart))
      getCart()
  }

  const checkProductInCart = (id) => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if(!cart){
          cart = {
              products: [],
              totalPrice: 0
          }
      }
      let newCart = cart.products.filter(elem => elem.item.id === id)
      return newCart.length>0 ? true : false
  } 


  // todo DELETE FROM CART

  const deleteFromCart =(id, price)=>{ 
      let items = JSON.parse(localStorage.getItem('cart')) 
      for (let i =0; i< items.products.length; i++) { 
         let targetItem = items.products[i].item.id
          let targetItemPrice = items.products[i].item.price
        if (targetItem == id) { 
            items.products.splice(i, 1); 
        } 
        if (targetItemPrice == price){ 
          items.totalPrice = items.totalPrice - price 
        } 
  } 
    items = JSON.stringify(items); 
    console.log(items) 
    localStorage.setItem("cart", items); 
    getCart() 
  }








    
      // !!!!!!!!!!!!!!!!!!!!!fovarites
    const addProductInFavorite = (product) => {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      if (!favorite) {
        favorite = {
          products: [],
          totalPrice: 0,
        };
      }
      let newProduct = {
        item: product,
        count: 1,
        subPrice: 0,
      };
      let filteredFavorite = favorite.products.filter(
        (elem) => elem.item.id === product.id
      );
      if (filteredFavorite.length > 0) {
        favorite.products = favorite.products.filter(
          (elem) => elem.item.id !== product.id
        );
      } else {
        favorite.products.push(newProduct);
      }
      newProduct.subPrice = calcSubPrice(newProduct);
      favorite.totalPrice = calcTotalPrice(favorite.products);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      dispatch({
        type: CHANGE_FAVORITE_COUNT,
        payload: favorite.products.length,
      });
    };
    const getFavoriteLength = () => {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      if (!favorite) {
        favorite = {
          products: [],
          totalPrice: 0,
        };
      }
      dispatch({
        type: CHANGE_FAVORITE_COUNT,
        payload: favorite.products.length,
      });
    };
    const getFavorite = () => {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      if (!favorite) {
        favorite = {
          products: [],
          totalPrice: 0,
        };
      }
      dispatch({
        type: FAVORITES,
        payload: favorite,
      });
    };
    const changeFavoriteCount = (count, id) => {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      favorite.products = favorite.products.map((elem) => {
        if (elem.item.id == id) {
          elem.count = count;
          elem.subPrice = calcSubPrice(elem);
        }
        return elem;
      });
      favorite.totalPrice = calcTotalPrice(favorite.products);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      getFavorite();
    };
    const checkProductInFavorite = (id) => {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      if (!favorite) {
        favorite = {
          products: [],
          totalPrice: 0,
        };
      }
      let newFavorite = favorite.products.filter((elem) => elem.item.id === id);
      return newFavorite.length > 0 ? true : false;
    };
    // todo DELETE FROM FAVORITE
    const deleteFromFavorite = (id, price) => {
      let items = JSON.parse(localStorage.getItem("favorite"));
      for (let i = 0; i < items.products.length; i++) {
        let targetItem = items.products[i].item.id
        let targetItemPrice = items.products[i].item.price
        if (targetItem == id) {
          items.products.splice(i, 1);
        }
        if (targetItemPrice == price) {
          items.totalPrice = items.totalPrice - price;
        }
      }
      items = JSON.stringify(items);
      console.log(items);
      localStorage.setItem("favorite", items);
      getFavorite();
    };
    //  ! Telegrm BOT

    return (
        <hotelsContext.Provider
        value={{
         hotels: state.hotels,
         edit: state.edit,
         createStore,
         getHotelsCard,
         handleDelete,
         editHotels,
         saveEditedHotel,
         //  cart
         cart: state.cart,
         cartlLength: state.cartLength,
         addProductInCart,
         getCartLength,
         getCart,
         changeProductCount,
         checkProductInCart,
         deleteFromCart,



        favorite: state.favorite,
        favoriteLength: state.favoriteLength,
        addProductInFavorite,
        getFavoriteLength,
        changeFavoriteCount,
        checkProductInFavorite,
        deleteFromFavorite,
        getFavorite,
        // COMMNET
        addComment,
        getComment,
        deleteCommnet,
        comment: state.comment,
        // pagi
        pagination: state.pagination
        }}>
            {props.children}
        </hotelsContext.Provider>
    );
};

export default MyContext;
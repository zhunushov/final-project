const INIT_STATE = { 
    hotels: [],
    hotel: null,
    edit: null,
    cart: {},
}

const GET_STORE = "GET_STORE"
const EDIT_STORE = "EDIT_STORE"

const GET_CART = "GET_CART"
const EDIT_CART = "EDIT_CART"
const FAVORITES = "FAVORITES"

export const hotelReducer = ( state = INIT_STATE, action) => {
    switch(action.type) {
        case GET_STORE :
            return { ...state, hotels: action.payload}
        case EDIT_STORE:
            return { ...state , edit: action.payload}
        default: return state 
    }
}

export const getHotelAction = (payload) => ({ type: GET_STORE, payload})
export const getEditedHotelAction = (payload) => ({ type: EDIT_STORE, payload})
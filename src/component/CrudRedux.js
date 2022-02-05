import  { getEditedHotelAction, getHotelAction } from "../Store/MyReducer" 
import { toast } from "react-toastify"
import {  addDoc, collection,   deleteDoc, getDocs,   doc,  onSnapshot, query, updateDoc, setDoc } from "firebase/firestore"; 
import { db } from "../Auth/Firebase";

export const createStore = (newHotel) => {
    return async ( dispatch ) => {
        try {
            await addDoc(collection(db, "stores"), newHotel)
            dispatch(getHotelsCard())
        } catch (error) {
            toast.arguments('Error')
        }
    }
}
export const getHotelsCard = () => {
    return async(dispatch)=>{
        try{
        const res = query(collection(db, "stores"));
        const unsubscribe = onSnapshot(res, (item) => {
        const hotels = [];
        item.forEach((item) => {
            hotels.push(item);
        });
        dispatch(getHotelAction(hotels))});
        }catch(err){
            console.log(err)
        }
    }
}

export const handleDelete  = async (id) =>  {
    const delHot = doc(db, "stores", id)
    await deleteDoc(delHot)
    getHotelsCard() 
};


export const editHotels = (id) => {
    return async ( dispatch ) => {
        try {
             await  setDoc(doc(db, "stores"));
             console.log(id);
            dispatch(getEditedHotelAction(id))
        } catch (error) {
            console.log(error);
        }
    }
}
export const saveEditedHotel = (id , newHotel) => {
    return async (dispatch) => {
        try {
            const unsub = onSnapshot(doc(db, "stores", newHotel))
            dispatch(getHotelsCard())
            return updateDoc (unsub, newHotel)
        } catch (error) {
            console.log(error);
        }
    }
}


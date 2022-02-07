// import  { getEditedHotelAction, getHotelAction } from "../Store/MyReducer" 
// import { toast } from "react-toastify"
// import {  addDoc, collection,   deleteDoc,    doc,  onSnapshot, query, updateDoc } from "firebase/firestore"; 
// import { db } from "../Auth/Firebase";

// export const createStore = (newHotel) => {
//     return async ( dispatch ) => {
//         try {
//             await addDoc(collection(db, "stores"), newHotel)
//             dispatch(getHotelsCard())
//         } catch (error) {
//             toast.arguments('Error')
//         }
//     }
// }
// export const getHotelsCard = () => {
//     return async(dispatch)=>{
//         try{
//         const res = query(collection(db, "stores"));
//         const unsubscribe = onSnapshot(res, (item) => {
//         const hotels = [];
//         item.forEach((item) => {
//             hotels.push(item);
//         });
//         dispatch(getHotelAction(hotels))});
//         }catch(err){
//             console.log(err)
//         }
//     }
// }
// export const handleDelete  = async (id) =>  {
//     const delHot = doc(db, "stores", id)
//     await deleteDoc(delHot)
//     getHotelsCard() 
// };
// export const editHotels = (id) => {
//     return async ( dispatch ) => {
//         try{
//             const res = query(collection(db, "stores"));
//             const unsubscribe = onSnapshot(res, (item) => {
//             const hotels = [];
//             item.forEach((item) => {
//                 hotels.push(item);
//             });
//             dispatch(getEditedHotelAction(hotels.id))});
//             console.log(id);
//             }catch(err){
//                 console.log(err)
//             }
//     }
// }


// export const saveEditedHotel = (  newHotel) => {
//     return async (dispatch) => {
//         try {
//             const res = await updateDoc(doc(db, newHotel), console.log(newHotel, "log"))
//             dispatch(getHotelsCard())
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


// export const detailHotel = (id) => {
//    return async  ( dispatch ) => {
//     try{
//         const res = query(collection(db, "stores"));
//         const unsubscribe = onSnapshot(res, (item) => {
//         const hotels = [];
//         item.forEach((item) => {
//             hotels.push(item);
//         });
//         dispatch(getEditedHotelAction(hotels.id))});
//         console.log(id);
//         }catch(err){
//             console.log(err)
//         }
//    }
// }


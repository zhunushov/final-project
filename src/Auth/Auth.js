import { auth }  from './Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}
export const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
export const logout = () => {
    return signOut (auth)
}
export function useAuth  () {
    const [currentuser, setCurrentUser] = useState()
    useEffect(()=> {
        const unsub = onAuthStateChanged( auth , user => {
            setCurrentUser(user)
        })
        return unsub
    }, [])
    return currentuser
}   
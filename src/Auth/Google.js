import React from 'react';
import { firebase } from './Firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import { Button } from '@material-ui/core'
const Google = () => {
    const GogoleSignIn = () => {
        const provider = new GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider)
        .then((re) => {
            console.log(re);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <Button onClick={GogoleSignIn}>
                Google
            </Button>
        </div>
    );
};

export default Google;
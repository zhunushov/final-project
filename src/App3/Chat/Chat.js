import React, { useState } from 'react';
import { useAuth } from "../../Auth/Auth"
import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core"
import { db } from '../../Auth/Firebase';
import firebase from 'firebase/compat/app';
import {addDoc, collection} from 'firebase/firestore'
import {useCollectionData} from "react-firebase-hooks/firestore";

const Chat = () => {
    const user = useAuth()
    const [ value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        collection(db, "messages")
    )
console.log(messages, 'mas');
    const sendMessage = async () => {
        addDoc(collection(db, "messages"), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
        })
        setValue("")
    }

    return (
        <Container>
            <Grid  container
            justirfy={"center"}
             style={{height: window.innerHeight - 50 , marginTop: "10px"}}>
               <div style={{width: "80%", height: "60vh", border: "1px solid gray", overflow: "auto "}}>
               
                {
                      messages ? messages.map(mes => (
                        <div style={{margin: "10px",
                               border: user.uid === mes.uid ? "2px solid green" : "2px dashed red",
                               marginLeft: user.uid === mes.uid ? "auto" : "10px",
                               width : 'fit-content', padding: "5px"}} >

                            <Grid container>

                                <Avatar src={mes.photoURL} />
                                <div> {mes.displayName}</div>
                            </Grid>
                            <div>{mes.text} </div>
                            
                        </div>
                    )): <h1>loading...</h1>
                }
               </div>
               <Grid container
               direction={"column"}
               alignItems={"flex-end"}
               style={{width: "80%"}}
               >
                   <TextField variant={"outlined"} fullWidth rowsMax={2} 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                   />
                   <Button  onClick={sendMessage} variant={"outlined"}>Отправить</Button>

               </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
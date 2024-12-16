import { useEffect, useState } from "react";

import { db, provider } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {

    // console.log(auth, provider)
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    // メッセージの送信
    const sendMessage = async (e) => {

        e.preventDefault();

        // メッセージから空であれば、送信しない
        if (!msg.trim()) {
            return;
        }

        try {
            // メッセージの翻訳
            // const translatedmsg = await translateMessage(msg);

            // 元と翻訳後のメッセージをfirestoreに格納
            const docRef = await addDoc(collection(db, "chats"), {
                original: msg,
                // translated: translatedmsg,
                timestamp: new Date(),
            });
            console.log("メッセージの追加に成功しました: ", docRef.id, docRef.msg, docRef.timestamp);

            // 初期化
            setMsg("");
            fetchMessages();

        } catch (e) {
            console.error("メッセージの追加に失敗しました: ", e);
        }
    };

    // メッセージの受信
    const fetchMessages = async () => {
        try {

            // メッセージを取得
            const querySnapshot = await getDocs(collection(db, "chats"));

            // 取得したメッセージを配列に格納し、それをまた格納
            const fetchMessages = [];
            querySnapshot.forEach((doc) => {
                const msg = doc.data();
                fetchMessages.push(msg.original, msg.translated);
                // console.log(`${doc.id} => ${doc.data()}`);
            });
            setMessages(fetchMessages);

        } catch (e) {
            console.error("メッセージの取得に失敗しました: ", e);
        }
    }

    // GoogleSignIn
    const auth = getAuth();
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h1>チャット</h1>

            <Button onClick={handleSignIn} variant="contained">
                Google
            </Button>
            {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> */}
            {/* Here is a gentle confirmation that your action was successful. */}
            {/* </Alert> */}
            {/* <Alert severity="success">This is a success Alert.</Alert>
            <Alert severity="info">This is an info Alert.</Alert>
            <Alert severity="warning">This is a warning Alert.</Alert>
            <Alert severity="error">This is an error Alert.</Alert> */}

            <meta name="viewport" content="initial-scale=1, width=device-width" />


            {/*
            <a rel="preconnect" href="https://fonts.googleapis.com">a</a>
            
            <a rel="preconnect" href="https://fonts.gstatic.com" crossorigin>a</a>
            
            <a
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            >
                a
            </a>
            */}

            {/*
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                />
            </Helmet>
            */}

            <form onSubmit={sendMessage}>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
                <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="メッセージを入力"
                />

                <button type="submit">
                    送信
                </button>
            </form>

            {messages.map((msg, index) => (
                <div key={index}>
                    {msg}
                </div>
            ))}

        </div>
    );
}
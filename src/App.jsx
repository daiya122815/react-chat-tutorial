import { useEffect, useState } from "react";

// データベース（firestore）
import { db, provider } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// oauth認証
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// ログイン状態の管理
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./firebase";
// const [user, loading, error] = useAuthState(auth);

// UI
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";

export default function App() {

    // firestoreに送信するメッセージと、firestoreに保存されたメッセージを受け取る配列
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    // メッセージの送信
    // const sendMessage = async (e) => {

    //     e.preventDefault();

    //     // メッセージから空なら、送信しない
    //     if (!msg.trim()) {
    //         return;
    //     }

    //     try {
    //         // const a = await connectfunctions(msg);
    //         // console.log(a);
    //         // メッセージの翻訳
    //         const translatemsg = await translateMessage(msg);

    //         // 元のメッセージと翻訳後のメッセージをfirestoreに格納
    //         const docRef = await addDoc(collection(db, "chats"), {
    //             timestamp: new Date(),
    //             original: msg,
    //             translated: translatemsg,
    //             // uid: user.uid,
    //             id: userEmail,
    //         });
    //         console.log("メッセージの追加に成功しました: ", docRef.id); //, docRef.msg, docRef.timestamp);

    //         // 初期化
    //         setMsg("");
    //         fetchMessages();

    //     } catch (e) {
    //         console.error("メッセージの追加に失敗しました: ", e);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // メッセージが空ならreturn
        if (!msg.trim()) return;

        try {
            // 2. ここに「sendMessage」の本体と同じ処理を記述
            //    (translateMessage, firestoreへの書き込みなど)

            // 入力されたmsgをJSON文字列にして、POSTメソッドを使用して、functionsに送る。
            const sendMsg = {
                message: msg,
            };

            // HTTPのPOSTメソッドでサーバーサイドに送る
            const response = await fetch("/.netlify/functions/serverless", {
                method: "POST",
                // headers: {
                // "Content-Type": "application/json"
                // },
                body: JSON.stringify(sendMsg),
            });

            // const translatemsg = await translateMessage(msg);
            
            // 必要であれば、このタイミングで
            // Netlify Functions への fetch も実行してOK
            // const response = await fetch("/.netlify/functions/serverless");
            const json = await response.json();
            console.log("Functions のレスポンス:", json);
            // const json = JSON.parse(stringjson);
            const translatemsg = json.message;
            
            const docRef = await addDoc(collection(db, "chats"), {
                timestamp: new Date(),
                original: msg,
                translated: translatemsg,
                id: userEmail,
            });
            console.log("メッセージ追加成功:", docRef.id);

            // 3. 入力欄をクリア & メッセージ一覧再取得など
            setMsg("");
            fetchMessages();

        } catch (error) {
            console.error("メッセージの追加に失敗:", error);
        }
    };

    // const connectfunctions = async (msg) => {

    //     // 入力されたmsgをJSON文字列にして、POSTメソッドを使用して、functionsに送る。
    //     const sendMsg = {
    //         message: "hello",
    //     };
    //     // const sendMessage = JSON.stringify({message: msg});

    //     // HTTPのPOSTメソッドでサーバーサイドに送る
    //     const response = await fetch("/.netlify/functions/serverless", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(sendMsg),
    //     });

    //     // const response2 = await fetch("/.netlify/functions/serverless");
    //     const data = await response.json();

    //     console.log(data);
    // }

    // const text = "hello";
    // const { messages } = require("../../src/App");

    const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;
    const translateMessage = async (text) => {
        try {
            const response = await fetch("https://api-free.deepl.com/v2/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    auth_key: DEEPL_API_KEY,
                    text: text,
                    target_lang: "JA",
                }),
            });

            if (!response.ok) {
                throw new Error("翻訳に失敗しました");
            }

            const data = await response.json();
            return data.translations[0].text;
        } catch (error) {
            console.error("翻訳エラー", error);
            return text;
        }
    }

    // メッセージの受信
    const fetchMessages = async () => {
        try {

            // メッセージを取得
            const querySnapshot = await getDocs(collection(db, "chats"));

            // 取得したメッセージを配列に格納し、それをまた格納
            const fetchMessages = [];
            querySnapshot.forEach((doc) => {
                const msg = doc.data();
                fetchMessages.push({
                    timestamp: msg.timestamp?.toDate()?.toISOString() || "", // Firestore Timestampを変換
                    original: msg.original,
                    translated: msg.translated,
                    // timestamp: msg.timestamp,
                    id: userEmail,
                });
                // fetchMessages.push(msg.original, msg.id);
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
                setLogin(true)
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
    // const [user] = useAuthState(auth);
    const currentUser = auth.currentUser;
    let userEmail = "";
    if (currentUser) {
        userEmail = currentUser.email;
    }

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    };

    /*
    if (localStorage.getItem()) {
        return true;
    }
    */

    useEffect(() => {
        // (async () => {
        //     const response = await fetch("/.netlify/functions/serverless");
        //     const data = await response.json();
        //     console.log(data);
        // })
        fetchMessages();
    }, []);

    return (
        <div>

            <Container>
                <Typography variant="h2" align="center">
                    Chat Space
                </Typography>

                <button className="gsi-material-button" onClick={handleSignIn}>
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }}>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            {/* <img
                                className="gsi-material-button-icon"
                                src="/images/web_light_rd_SI.svg"
                                alt="Google Logo"
                            /> */}
                        </div>
                        <span className="gsi-material-button-contents">Sign in with Google</span>
                        <span style={{ display: "none" }}>Sign in with Google</span>
                    </div>
                </button>

                {/* <Box display="flex" gap={2} my={2}>
                    <Button onClick={handleLogout} variant="outlined" color="error">
                        ログアウト
                    </Button>
                </Box> */}
                <Button onClick={handleLogout}>ログアウト</Button>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    // async (event) => {
                    // event.preventDefault();
                    // sendMessage();
                    // const response = await fetch("/.netlify/functions/serverless");
                    // const data = await response.json();
                    // console.log(data);
                    // }
                    display="flex"
                    gap={2}
                    my={2}>
                    {/* <Box component="form" display="flex" gap={2} my={2}> */}
                    <TextField
                        fullWidth
                        label="メッセージを入力"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                    // disabled={!user}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    // onClick={async (event) => {
                    //     event.preventDefault();
                    //     sendMessage();
                    //     const response = await fetch("/.netlify/functions/serverless");
                    //     const data = await response.json();
                    //     console.log(data);
                    // }}
                    >
                        送信
                    </Button>
                </Box>

                <Paper sx={{ p: 2, maxHeight: 400, overflowY: "auto" }}>
                    {messages.map((msg, index) => (
                        <Box key={index} mb={2}>

                            <Typography variant="caption" color="text.secondary">
                                {msg.timestamp} | {msg.id}
                            </Typography>

                            <Typography variant="body1" fontWeight="bold">
                                {msg.original}
                            </Typography>

                            <Typography variant="body2">
                                {msg.translated}
                            </Typography>
                        </Box>
                    ))}
                </Paper>

            </Container>
            <p><center>日本大学文理学部情報科学科Webプログラミングの演習課題</center></p>
            <p><center>5422003 大野航太郎</center></p>
        </div >
    );
}
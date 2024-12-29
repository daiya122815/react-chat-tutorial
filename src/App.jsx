import { useEffect, useState } from "react";

// データベース（firestore）
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// auth認証
import { provider } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// ログイン状態の管理
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./firebase";
// const [user, loading, error] = useAuthState(auth);

// UI関連
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import "./App.css";

export default function App() {

    // 入力されたメッセージと、firestoreに保存されたメッセージを管理する変数
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    // メッセージの送信とfirestoreに追加
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!msg.trim()) {
            return;
        }

        try {

            const user = auth.currentUser;
            if (!user) {
                console.error("ログインされていません。");
                return;
            }

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

            // 受け取り（JSONで返ってくる）
            const json = await response.json();
            console.log("functionsからのレスポンス:", json);
            const translatemsg = json.message;

            // firestoreに情報を追加
            const docRef = await addDoc(collection(db, "chats"), {
                timestamp: new Date(),
                original: msg,
                translated: translatemsg || "翻訳ができませんでした。",
                id: user.uid,
                email: user.email || "Unknown",
            });
            console.log("メッセージ追加成功:", docRef.id);

            // 入力欄をクリアし、追加されたメッセージを取得
            setMsg("");
            fetchMessages();

        } catch (error) {
            console.error("メッセージの追加に失敗:", error);
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
                fetchMessages.push({
                    timestamp: msg.timestamp?.toDate()?.toISOString() || "", // Firestore Timestampを変換
                    original: msg.original,
                    translated: msg.translated,
                    email: msg.email,
                });
            });
            setMessages(fetchMessages);

        } catch (e) {
            console.error("メッセージの取得に失敗しました: ", e);
        }
    }

    // GoogleSignIn
    const auth = getAuth();
    // const handleSignIn = () => {
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             setLogin(true)
    //             // IdP data available using getAdditionalUserInfo(result)
    //             // ...
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //         });
    // };

    // // const [user] = useAuthState(auth);
    // // const currentUser = auth.currentUser;
    // // const [email, setEmail] = useState("");
    // // if (currentUser) {
    // //     setEmail(currentUser.email);
    // // }

    // const handleLogout = async () => {
    //     try {
    //         await auth.signOut();
    //     } catch (error) {
    //         console.error("ログアウトエラー:", error);
    //     }
    // };

    const [user, setUser] = useState(null);
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const loggedInUser = result.user;
            setUser(loggedInUser);
            console.log("ログインしました。", loggedInUser);
        } catch (eroor) {
            console.error("ログインに失敗しました。", eroor);
        }
    }
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            console.log("ログアウトしました。")
        } catch (error) {
            console.log("ログアウトに失敗しました。", error);
        }
    }


    useEffect(() => {
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
                        </div>
                        <span className="gsi-material-button-contents">Sign in with Google</span>
                        <span style={{ display: "none" }}>Sign in with Google</span>
                    </div>
                </button>

                <Button onClick={handleSignOut}>ログアウト</Button>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
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
                    >
                        送信
                    </Button>
                </Box>

                <Paper sx={{ p: 2, maxHeight: 400, overflowY: "auto" }}>
                    {messages.map((msg, index) => (
                        <Box key={index} mb={2}>

                            <Typography variant="caption" color="text.secondary">
                                {msg.timestamp} | {msg.email}
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
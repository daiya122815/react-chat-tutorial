import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!msg.trim()) {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "chats"), {
                message: msg,
                timestamp: new Date(),
            });
            console.log("メッセージの追加に成功しました: ", docRef.id);
            
            setMsg("");
            fetchMessages();
            
        } catch (e) {
            console.error("メッセージの追加に失敗しました: ", e);
        }
    };

    const fetchMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "chats"));

            const fetchMessages = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchMessages.push(data.message);
                // console.log(`${doc.id} => ${doc.data()}`);
            });
            
            setMessages(fetchMessages);

        } catch (e) {
            console.error("メッセージの取得に失敗しました: ", e);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h1>チャット</h1>

            <form onSubmit={sendMessage}>
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

            {messages.map((message, index) => (
                <div key={index}>
                    {message}
                </div>
            ))}

        </div>
    );
}
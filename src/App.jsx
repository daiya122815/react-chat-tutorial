import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {

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
            // const translatemsg = await translateMessage(msg);
            
            // 元と翻訳後のメッセージをfirestoreに格納
            const docRef = await addDoc(collection(db, "chats"), {
                original: msg,
                translated: translatemsg,
                timestamp: new Date(),
            });
            // console.log("メッセージの追加に成功しました: ", docRef.id);

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

            {messages.map((msg, index) => (
                <div key={index}>
                    {msg}
                </div>
            ))}

        </div>
    );
}
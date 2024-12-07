import { useEffect, useState } from "react";
import { analytics } from "./firebase";

export default function App() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect;
    /*
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("/.netlify/functions/serverless");
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return; // 空白メッセージを無視

        try {
            const response = await fetch("/.netlify/functions/serverless", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (response.ok) {
                setInput(""); // 入力欄をクリア
                fetchMessages(); // メッセージ一覧を更新
            } else {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    */
    const handleSendMessage = () => {
        if (input.trim() !== '') {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div>
            <h1>チャット</h1>

            {messages.map((msg, index) => (
                <div key={index}>
                    {msg}
                </div>
            ))}

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力"
            />

            <button onClick={handleSendMessage}>
                送信
            </button>
        </div>
    );
}
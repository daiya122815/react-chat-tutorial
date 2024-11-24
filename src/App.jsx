import { useEffect, useState, useRef } from "react";

export default function App() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect;

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
                <div key={index}>{msg}</div>
            ))}

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力"
            />

            <button onClick={handleSendMessage}>送信</button>
        </div>
    );
}
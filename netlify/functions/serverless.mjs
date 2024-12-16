import 'dotenv/config';

export default async () => {
    // const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    // const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;

    const text = "hello";
    const { messages } = require("../../src/App");

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
            return data.translations[0].text; // 翻訳されたテキストを返す

        } catch (error) {
            console.error("翻訳エラー:", error);
            return text; // エラーの場合は元のテキストを返す
        }
    };

    const data = {
        message: messages,
        // translatemsg: translateMessage(text),
    };

    return new Response(JSON.stringify(data));
}
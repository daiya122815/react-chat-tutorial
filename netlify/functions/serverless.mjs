import 'dotenv/config';

export default async (req) => {
    // const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    // const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

    // .envからAPIキーを取得
    const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;
    // const key = import.meta.env.VITE_DEEPL_API_KEY;

    // HTTPのPOSTメソッドを取り出す
    const json = await req.json();
    // const json = JSON.parse(stringjson);
    const msg = json.message;

    // const msg = JSON.parse(req.body);
    // const text = input.text || "";

    // const translateMessage = async (textToTranslate) => {
    // try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            auth_key: DEEPL_API_KEY,
            text: msg,
            target_lang: "JA",
        }),
    });

    if (!response.ok) {
        throw new Error("翻訳に失敗しました");
    }

    const data = await response.json();
    const translatemsg = data.translations[0].text; // 翻訳されたテキストを返す
    const data2 = {
        message: translatemsg,
    };
    return new Response(JSON.stringify(data2));
    // return new Response(stringjson);
    // } catch (error) {
    // console.error("翻訳エラー:", error);
    // return JSON.stringify(json); // エラーの場合は元のテキストを返す
    // }
    // };

    // const translatedText = await translateMessage(text);
    // const data = {
    //     msg: messages,
    //     translatemsg: translateMessage(text),
    // };
    // const data = {
    //     message: key,
    // }
    // return new Response(msg);
};

// exports.handler = async (event, context) => {
//     const body = JSON.parse(event.body);

//     // return new Response(JSON.stringify(body));
//     return {
//         statusCode: 200,
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body),
//     };
// };
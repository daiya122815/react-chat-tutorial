export default async (req) => {

    // .envからAPIキーを取得
    const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;

    try {

        // フロントからのHTTPのJSONを取り出す
        const json = await req.json();
        const msg = json.message;

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
            throw new Error("翻訳ができませんでした。");
        }

        // 翻訳結果の取得
        const data = await response.json();
        const translatemsg = data.translations[0].text; // 翻訳されたテキストを返す

        // それをJSON文字列化し、フロントに返す
        const data2 = {
            message: translatemsg,
        };
        return new Response(JSON.stringify(data2));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            details: error.message,
        }));
    }
};
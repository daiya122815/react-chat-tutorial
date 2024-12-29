
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/serverless.mjs
var serverless_default = async (req) => {
  const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;
  try {
    const json = await req.json();
    const msg = json.message;
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text: msg,
        target_lang: "JA"
      })
    });
    if (!response.ok) {
      throw new Error("\u7FFB\u8A33\u304C\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
    }
    const data = await response.json();
    const translatemsg = data.translations[0].text;
    const data2 = {
      message: translatemsg
    };
    return new Response(JSON.stringify(data2));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      details: error.message
    }));
  }
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2VydmVybGVzcy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEpID0+IHtcblxuICAgIC8vIC5lbnZcdTMwNEJcdTMwODlBUElcdTMwQURcdTMwRkNcdTMwOTJcdTUzRDZcdTVGOTdcbiAgICBjb25zdCBERUVQTF9BUElfS0VZID0gcHJvY2Vzcy5lbnYuVklURV9ERUVQTF9BUElfS0VZO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICAvLyBcdTMwRDVcdTMwRURcdTMwRjNcdTMwQzhcdTMwNEJcdTMwODlcdTMwNkVIVFRQXHUzMDZFSlNPTlx1MzA5Mlx1NTNENlx1MzA4QVx1NTFGQVx1MzA1OVxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICAgICAgY29uc3QgbXNnID0ganNvbi5tZXNzYWdlO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS1mcmVlLmRlZXBsLmNvbS92Mi90cmFuc2xhdGVcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgICAgIGF1dGhfa2V5OiBERUVQTF9BUElfS0VZLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRfbGFuZzogXCJKQVwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlx1N0ZGQlx1OEEzM1x1MzA0Q1x1MzA2N1x1MzA0RFx1MzA3RVx1MzA1Qlx1MzA5M1x1MzA2N1x1MzA1N1x1MzA1Rlx1MzAwMlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1N0ZGQlx1OEEzM1x1N0Q1MFx1Njc5Q1x1MzA2RVx1NTNENlx1NUY5N1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVtc2cgPSBkYXRhLnRyYW5zbGF0aW9uc1swXS50ZXh0OyAvLyBcdTdGRkJcdThBMzNcdTMwNTVcdTMwOENcdTMwNUZcdTMwQzZcdTMwQURcdTMwQjlcdTMwQzhcdTMwOTJcdThGRDRcdTMwNTlcblxuICAgICAgICAvLyBcdTMwNURcdTMwOENcdTMwOTJKU09OXHU2NTg3XHU1QjU3XHU1MjE3XHU1MzE2XHUzMDU3XHUzMDAxXHUzMEQ1XHUzMEVEXHUzMEYzXHUzMEM4XHUzMDZCXHU4RkQ0XHUzMDU5XG4gICAgICAgIGNvbnN0IGRhdGEyID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogdHJhbnNsYXRlbXNnLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGRhdGEyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGV0YWlsczogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgfSkpO1xuICAgIH1cbn07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8scUJBQVEsT0FBTyxRQUFRO0FBRzFCLFFBQU0sZ0JBQWdCLFFBQVEsSUFBSTtBQUVsQyxNQUFJO0FBR0EsVUFBTSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBQzVCLFVBQU0sTUFBTSxLQUFLO0FBRWpCLFVBQU0sV0FBVyxNQUFNLE1BQU0sMkNBQTJDO0FBQUEsTUFDcEUsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLE1BQU0sSUFBSSxnQkFBZ0I7QUFBQSxRQUN0QixVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDakIsQ0FBQztBQUFBLElBQ0wsQ0FBQztBQUVELFFBQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxZQUFNLElBQUksTUFBTSwwRUFBYztBQUFBLElBQ2xDO0FBR0EsVUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFVBQU0sZUFBZSxLQUFLLGFBQWEsQ0FBQyxFQUFFO0FBRzFDLFVBQU0sUUFBUTtBQUFBLE1BQ1YsU0FBUztBQUFBLElBQ2I7QUFDQSxXQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsS0FBSyxDQUFDO0FBQUEsRUFDN0MsU0FBUyxPQUFPO0FBQ1osWUFBUSxNQUFNLEtBQUs7QUFDbkIsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVO0FBQUEsTUFDL0IsU0FBUyxNQUFNO0FBQUEsSUFDbkIsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=

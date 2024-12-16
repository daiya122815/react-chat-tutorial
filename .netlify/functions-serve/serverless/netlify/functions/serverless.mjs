
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
var firebaseConfig, app, analytics, db, provider;
var init_firebase = __esm({
  "src/firebase.jsx"() {
    firebaseConfig = {
      apiKey: "AIzaSyC_hKg0ACgm7Pv3zohnK4HYA9pDvmnxURw",
      authDomain: "react-chat-tutorial-35c0d.firebaseapp.com",
      projectId: "react-chat-tutorial-35c0d",
      storageBucket: "react-chat-tutorial-35c0d.firebasestorage.app",
      messagingSenderId: "382263524976",
      appId: "1:382263524976:web:224fc8c3ec7c1b7845beb5",
      measurementId: "G-K601LJ9S0Z"
    };
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    provider = new GoogleAuthProvider();
  }
});

// src/App.jsx
var App_exports = {};
__export(App_exports, {
  default: () => App
});
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider as GoogleAuthProvider2 } from "firebase/auth";
function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!msg.trim()) {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        original: msg,
        // translated: translatedmsg,
        timestamp: /* @__PURE__ */ new Date()
      });
      console.log("\u30E1\u30C3\u30BB\u30FC\u30B8\u306E\u8FFD\u52A0\u306B\u6210\u529F\u3057\u307E\u3057\u305F: ", docRef.id, docRef.msg, docRef.timestamp);
      setMsg("");
      fetchMessages();
    } catch (e2) {
      console.error("\u30E1\u30C3\u30BB\u30FC\u30B8\u306E\u8FFD\u52A0\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ", e2);
    }
  };
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "chats"));
      const fetchMessages2 = [];
      querySnapshot.forEach((doc) => {
        const msg2 = doc.data();
        fetchMessages2.push(msg2.original, msg2.translated);
      });
      setMessages(fetchMessages2);
    } catch (e) {
      console.error("\u30E1\u30C3\u30BB\u30FC\u30B8\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ", e);
    }
  };
  const auth = getAuth();
  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider2.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider2.credentialFromError(error);
    });
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "\u30C1\u30E3\u30C3\u30C8"), /* @__PURE__ */ React.createElement("button", { onClick: handleSignIn }, "Google"), /* @__PURE__ */ React.createElement("form", { onSubmit: sendMessage }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: msg,
      onChange: (e) => setMsg(e.target.value),
      placeholder: "\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B"
    }
  ), /* @__PURE__ */ React.createElement("button", { type: "submit" }, "\u9001\u4FE1")), messages.map((msg2, index) => /* @__PURE__ */ React.createElement("div", { key: index }, msg2)));
}
var init_App = __esm({
  "src/App.jsx"() {
    init_firebase();
  }
});

// netlify/functions/serverless.mjs
import "dotenv/config";
var serverless_default = async () => {
  const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;
  const text = "hello";
  const { messages } = (init_App(), __toCommonJS(App_exports));
  const translateMessage = async (text2) => {
    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          auth_key: DEEPL_API_KEY,
          text: text2,
          target_lang: "JA"
        })
      });
      if (!response.ok) {
        throw new Error("\u7FFB\u8A33\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
      }
      const data2 = await response.json();
      return data2.translations[0].text;
    } catch (error) {
      console.error("\u7FFB\u8A33\u30A8\u30E9\u30FC:", error);
      return text2;
    }
  };
  const data = {
    message: messages
    // translatemsg: translateMessage(text),
  };
  return new Response(JSON.stringify(data));
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2ZpcmViYXNlLmpzeCIsICJzcmMvQXBwLmpzeCIsICJuZXRsaWZ5L2Z1bmN0aW9ucy9zZXJ2ZXJsZXNzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gSW1wb3J0IHRoZSBmdW5jdGlvbnMgeW91IG5lZWQgZnJvbSB0aGUgU0RLcyB5b3UgbmVlZFxyXG5pbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xyXG5pbXBvcnQgeyBnZXRBbmFseXRpY3MgfSBmcm9tIFwiZmlyZWJhc2UvYW5hbHl0aWNzXCI7XHJcblxyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcbmltcG9ydCB7IEdvb2dsZUF1dGhQcm92aWRlciB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XHJcbi8vIFRPRE86IEFkZCBTREtzIGZvciBGaXJlYmFzZSBwcm9kdWN0cyB0aGF0IHlvdSB3YW50IHRvIHVzZVxyXG4vLyBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy93ZWIvc2V0dXAjYXZhaWxhYmxlLWxpYnJhcmllc1xyXG5cclxuLy8gWW91ciB3ZWIgYXBwJ3MgRmlyZWJhc2UgY29uZmlndXJhdGlvblxyXG4vLyBGb3IgRmlyZWJhc2UgSlMgU0RLIHY3LjIwLjAgYW5kIGxhdGVyLCBtZWFzdXJlbWVudElkIGlzIG9wdGlvbmFsXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGFwaUtleTogXCJBSXphU3lDX2hLZzBBQ2dtN1B2M3pvaG5LNEhZQTlwRHZtbnhVUndcIixcclxuICBhdXRoRG9tYWluOiBcInJlYWN0LWNoYXQtdHV0b3JpYWwtMzVjMGQuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgcHJvamVjdElkOiBcInJlYWN0LWNoYXQtdHV0b3JpYWwtMzVjMGRcIixcclxuICBzdG9yYWdlQnVja2V0OiBcInJlYWN0LWNoYXQtdHV0b3JpYWwtMzVjMGQuZmlyZWJhc2VzdG9yYWdlLmFwcFwiLFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjM4MjI2MzUyNDk3NlwiLFxyXG4gIGFwcElkOiBcIjE6MzgyMjYzNTI0OTc2OndlYjoyMjRmYzhjM2VjN2MxYjc4NDViZWI1XCIsXHJcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUs2MDFMSjlTMFpcIlxyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxyXG5jb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcclxuY29uc3QgYW5hbHl0aWNzID0gZ2V0QW5hbHl0aWNzKGFwcCk7XHJcbmNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XHJcblxyXG5jb25zdCBwcm92aWRlciA9IG5ldyBHb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuXHJcbmV4cG9ydCB7IGFuYWx5dGljcywgZGIsIHByb3ZpZGVyIH07XHJcblxyXG4vKlxyXG5jb25zdCB7IGluaXRpYWxpemVBcHAsIGFwcGxpY2F0aW9uRGVmYXVsdCwgY2VydCB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vYXBwJyk7XHJcbmNvbnN0IHsgZ2V0RmlyZXN0b3JlLCBUaW1lc3RhbXAsIEZpZWxkVmFsdWUsIEZpbHRlciB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJyk7XHJcbmluaXRpYWxpemVBcHAoKTtcclxuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoKTtcclxuKi8iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBkYiwgcHJvdmlkZXIgfSBmcm9tIFwiLi9maXJlYmFzZVwiO1xuaW1wb3J0IHsgY29sbGVjdGlvbiwgYWRkRG9jLCBnZXREb2NzIH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuXG5pbXBvcnQgeyBnZXRBdXRoLCBzaWduSW5XaXRoUG9wdXAsIEdvb2dsZUF1dGhQcm92aWRlciB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcblxuICAgIC8vIGNvbnNvbGUubG9nKGF1dGgsIHByb3ZpZGVyKVxuICAgIGNvbnN0IFttc2csIHNldE1zZ10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtdKTtcblxuICAgIC8vIFx1MzBFMVx1MzBDM1x1MzBCQlx1MzBGQ1x1MzBCOFx1MzA2RVx1OTAwMVx1NEZFMVxuICAgIGNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBcdTMwRTFcdTMwQzNcdTMwQkJcdTMwRkNcdTMwQjhcdTMwNEJcdTMwODlcdTdBN0FcdTMwNjdcdTMwNDJcdTMwOENcdTMwNzBcdTMwMDFcdTkwMDFcdTRGRTFcdTMwNTdcdTMwNkFcdTMwNDRcbiAgICAgICAgaWYgKCFtc2cudHJpbSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDZFXHU3RkZCXHU4QTMzXG4gICAgICAgICAgICAvLyBjb25zdCB0cmFuc2xhdGVkbXNnID0gYXdhaXQgdHJhbnNsYXRlTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBcdTUxNDNcdTMwNjhcdTdGRkJcdThBMzNcdTVGOENcdTMwNkVcdTMwRTFcdTMwQzNcdTMwQkJcdTMwRkNcdTMwQjhcdTMwOTJmaXJlc3RvcmVcdTMwNkJcdTY4M0NcdTdEMERcbiAgICAgICAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCBcImNoYXRzXCIpLCB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWw6IG1zZyxcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGVkOiB0cmFuc2xhdGVkbXNnLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJcdTMwRTFcdTMwQzNcdTMwQkJcdTMwRkNcdTMwQjhcdTMwNkVcdThGRkRcdTUyQTBcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUY6IFwiLCBkb2NSZWYuaWQsIGRvY1JlZi5tc2csIGRvY1JlZi50aW1lc3RhbXApO1xuXG4gICAgICAgICAgICAvLyBcdTUyMURcdTY3MUZcdTUzMTZcbiAgICAgICAgICAgIHNldE1zZyhcIlwiKTtcbiAgICAgICAgICAgIGZldGNoTWVzc2FnZXMoKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDZFXHU4RkZEXHU1MkEwXHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGOiBcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDZFXHU1M0Q3XHU0RkUxXG4gICAgY29uc3QgZmV0Y2hNZXNzYWdlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgLy8gXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDkyXHU1M0Q2XHU1Rjk3XG4gICAgICAgICAgICBjb25zdCBxdWVyeVNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhjb2xsZWN0aW9uKGRiLCBcImNoYXRzXCIpKTtcblxuICAgICAgICAgICAgLy8gXHU1M0Q2XHU1Rjk3XHUzMDU3XHUzMDVGXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDkyXHU5MTREXHU1MjE3XHUzMDZCXHU2ODNDXHU3RDBEXHUzMDU3XHUzMDAxXHUzMDVEXHUzMDhDXHUzMDkyXHUzMDdFXHUzMDVGXHU2ODNDXHU3RDBEXG4gICAgICAgICAgICBjb25zdCBmZXRjaE1lc3NhZ2VzID0gW107XG4gICAgICAgICAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGRvYy5kYXRhKCk7XG4gICAgICAgICAgICAgICAgZmV0Y2hNZXNzYWdlcy5wdXNoKG1zZy5vcmlnaW5hbCwgbXNnLnRyYW5zbGF0ZWQpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2RvYy5pZH0gPT4gJHtkb2MuZGF0YSgpfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRNZXNzYWdlcyhmZXRjaE1lc3NhZ2VzKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDZFXHU1M0Q2XHU1Rjk3XHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGOiBcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuY29uc3QgaGFuZGxlU2lnbkluID0gKCkgPT4ge1xuICAgIHNpZ25JbldpdGhQb3B1cChhdXRoLCBwcm92aWRlcilcbiAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIC8vIFRoaXMgZ2l2ZXMgeW91IGEgR29vZ2xlIEFjY2VzcyBUb2tlbi4gWW91IGNhbiB1c2UgaXQgdG8gYWNjZXNzIHRoZSBHb29nbGUgQVBJLlxuICAgIGNvbnN0IGNyZWRlbnRpYWwgPSBHb29nbGVBdXRoUHJvdmlkZXIuY3JlZGVudGlhbEZyb21SZXN1bHQocmVzdWx0KTtcbiAgICBjb25zdCB0b2tlbiA9IGNyZWRlbnRpYWwuYWNjZXNzVG9rZW47XG4gICAgLy8gVGhlIHNpZ25lZC1pbiB1c2VyIGluZm8uXG4gICAgY29uc3QgdXNlciA9IHJlc3VsdC51c2VyO1xuICAgIC8vIElkUCBkYXRhIGF2YWlsYWJsZSB1c2luZyBnZXRBZGRpdGlvbmFsVXNlckluZm8ocmVzdWx0KVxuICAgIC8vIC4uLlxuICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAvLyBIYW5kbGUgRXJyb3JzIGhlcmUuXG4gICAgY29uc3QgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cbiAgICBjb25zdCBlbWFpbCA9IGVycm9yLmN1c3RvbURhdGEuZW1haWw7XG4gICAgLy8gVGhlIEF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cbiAgICBjb25zdCBjcmVkZW50aWFsID0gR29vZ2xlQXV0aFByb3ZpZGVyLmNyZWRlbnRpYWxGcm9tRXJyb3IoZXJyb3IpO1xuICAgIC8vIC4uLlxuICB9KTtcbn07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaE1lc3NhZ2VzKCk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMT5cdTMwQzFcdTMwRTNcdTMwQzNcdTMwQzg8L2gxPlxuXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNpZ25Jbn0+XG4gICAgICAgICAgICAgICAgR29vZ2xlXG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3NlbmRNZXNzYWdlfT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bXNnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1zZyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiXHUzMEUxXHUzMEMzXHUzMEJCXHUzMEZDXHUzMEI4XHUzMDkyXHU1MTY1XHU1MjlCXCJcbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgIFx1OTAwMVx1NEZFMVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICB7bWVzc2FnZXMubWFwKChtc2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAge21zZ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuXG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59IiwgImltcG9ydCAnZG90ZW52L2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyBjb25zdCB7IGluaXRpYWxpemVBcHAsIGFwcGxpY2F0aW9uRGVmYXVsdCwgY2VydCB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vYXBwJyk7XHJcbiAgICAvLyBjb25zdCB7IGdldEZpcmVzdG9yZSwgVGltZXN0YW1wLCBGaWVsZFZhbHVlLCBGaWx0ZXIgfSA9IHJlcXVpcmUoJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZScpO1xyXG4gICAgY29uc3QgREVFUExfQVBJX0tFWSA9IHByb2Nlc3MuZW52LlZJVEVfREVFUExfQVBJX0tFWTtcclxuXHJcbiAgICBjb25zdCB0ZXh0ID0gXCJoZWxsb1wiO1xyXG4gICAgY29uc3QgeyBtZXNzYWdlcyB9ID0gcmVxdWlyZShcIi4uLy4uL3NyYy9BcHBcIik7XHJcblxyXG4gICAgY29uc3QgdHJhbnNsYXRlTWVzc2FnZSA9IGFzeW5jICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLWZyZWUuZGVlcGwuY29tL3YyL3RyYW5zbGF0ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0aF9rZXk6IERFRVBMX0FQSV9LRVksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRfbGFuZzogXCJKQVwiLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU3RkZCXHU4QTMzXHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS50cmFuc2xhdGlvbnNbMF0udGV4dDsgLy8gXHU3RkZCXHU4QTMzXHUzMDU1XHUzMDhDXHUzMDVGXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMDkyXHU4RkQ0XHUzMDU5XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTdGRkJcdThBMzNcdTMwQThcdTMwRTlcdTMwRkM6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHQ7IC8vIFx1MzBBOFx1MzBFOVx1MzBGQ1x1MzA2RVx1NTgzNFx1NTQwOFx1MzA2Rlx1NTE0M1x1MzA2RVx1MzBDNlx1MzBBRFx1MzBCOVx1MzBDOFx1MzA5Mlx1OEZENFx1MzA1OVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcyxcclxuICAgICAgICAvLyB0cmFuc2xhdGVtc2c6IHRyYW5zbGF0ZU1lc3NhZ2UodGV4dCksXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFFN0IsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUywwQkFBMEI7QUFMbkMsSUFXTSxnQkFXQSxLQUNBLFdBQ0EsSUFFQTtBQTFCTjtBQUFBO0FBV0EsSUFBTSxpQkFBaUI7QUFBQSxNQUNyQixRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixtQkFBbUI7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsSUFDakI7QUFHQSxJQUFNLE1BQU0sY0FBYyxjQUFjO0FBQ3hDLElBQU0sWUFBWSxhQUFhLEdBQUc7QUFDbEMsSUFBTSxLQUFLLGFBQWEsR0FBRztBQUUzQixJQUFNLFdBQVcsSUFBSSxtQkFBbUI7QUFBQTtBQUFBOzs7QUMxQnhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUyxXQUFXLGdCQUFnQjtBQUdwQyxTQUFTLFlBQVksUUFBUSxlQUFlO0FBRTVDLFNBQVMsU0FBUyxpQkFBaUIsc0JBQUFBLDJCQUEwQjtBQUU5QyxTQUFSLE1BQXVCO0FBRzFCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sSUFBSSxTQUFTLEVBQUU7QUFDakMsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQVMsQ0FBQyxDQUFDO0FBRzNDLFFBQU0sY0FBYyxPQUFPLE1BQU07QUFFN0IsTUFBRSxlQUFlO0FBR2pCLFFBQUksQ0FBQyxJQUFJLEtBQUssR0FBRztBQUNiO0FBQUEsSUFDSjtBQUVBLFFBQUk7QUFLQSxZQUFNLFNBQVMsTUFBTSxPQUFPLFdBQVcsSUFBSSxPQUFPLEdBQUc7QUFBQSxRQUNqRCxVQUFVO0FBQUE7QUFBQSxRQUVWLFdBQVcsb0JBQUksS0FBSztBQUFBLE1BQ3hCLENBQUM7QUFDRCxjQUFRLElBQUksZ0dBQXFCLE9BQU8sSUFBSSxPQUFPLEtBQUssT0FBTyxTQUFTO0FBR3hFLGFBQU8sRUFBRTtBQUNULG9CQUFjO0FBQUEsSUFFbEIsU0FBU0MsSUFBRztBQUNSLGNBQVEsTUFBTSxnR0FBcUJBLEVBQUM7QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFHQSxRQUFNLGdCQUFnQixZQUFZO0FBQzlCLFFBQUk7QUFHQSxZQUFNLGdCQUFnQixNQUFNLFFBQVEsV0FBVyxJQUFJLE9BQU8sQ0FBQztBQUczRCxZQUFNQyxpQkFBZ0IsQ0FBQztBQUN2QixvQkFBYyxRQUFRLENBQUMsUUFBUTtBQUMzQixjQUFNQyxPQUFNLElBQUksS0FBSztBQUNyQixRQUFBRCxlQUFjLEtBQUtDLEtBQUksVUFBVUEsS0FBSSxVQUFVO0FBQUEsTUFFbkQsQ0FBQztBQUNELGtCQUFZRCxjQUFhO0FBQUEsSUFFN0IsU0FBUyxHQUFHO0FBQ1IsY0FBUSxNQUFNLGdHQUFxQixDQUFDO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBRUEsUUFBTSxPQUFPLFFBQVE7QUFDekIsUUFBTSxlQUFlLE1BQU07QUFDdkIsb0JBQWdCLE1BQU0sUUFBUSxFQUMvQixLQUFLLENBQUMsV0FBVztBQUVoQixZQUFNLGFBQWFGLG9CQUFtQixxQkFBcUIsTUFBTTtBQUNqRSxZQUFNLFFBQVEsV0FBVztBQUV6QixZQUFNLE9BQU8sT0FBTztBQUFBLElBR3RCLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVTtBQUVsQixZQUFNLFlBQVksTUFBTTtBQUN4QixZQUFNLGVBQWUsTUFBTTtBQUUzQixZQUFNLFFBQVEsTUFBTSxXQUFXO0FBRS9CLFlBQU0sYUFBYUEsb0JBQW1CLG9CQUFvQixLQUFLO0FBQUEsSUFFakUsQ0FBQztBQUFBLEVBQ0g7QUFFSSxZQUFVLE1BQU07QUFDWixrQkFBYztBQUFBLEVBQ2xCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FDSSxvQ0FBQyxhQUNHLG9DQUFDLFlBQUcsMEJBQUksR0FFUixvQ0FBQyxZQUFPLFNBQVMsZ0JBQWMsUUFFL0IsR0FFQSxvQ0FBQyxVQUFLLFVBQVUsZUFDWjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0csTUFBSztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsVUFBVSxDQUFDLE1BQU0sT0FBTyxFQUFFLE9BQU8sS0FBSztBQUFBLE1BQ3RDLGFBQVk7QUFBQTtBQUFBLEVBQ2hCLEdBRUEsb0NBQUMsWUFBTyxNQUFLLFlBQVMsY0FFdEIsQ0FDSixHQUVDLFNBQVMsSUFBSSxDQUFDRyxNQUFLLFVBQ2hCLG9DQUFDLFNBQUksS0FBSyxTQUNMQSxJQUNMLENBQ0gsQ0FFTDtBQUVSO0FBekhBO0FBQUE7QUFFQTtBQUFBO0FBQUE7OztBQ0ZBLE9BQU87QUFFUCxJQUFPLHFCQUFRLFlBQVk7QUFHdkIsUUFBTSxnQkFBZ0IsUUFBUSxJQUFJO0FBRWxDLFFBQU0sT0FBTztBQUNiLFFBQU0sRUFBRSxTQUFTLElBQUk7QUFFckIsUUFBTSxtQkFBbUIsT0FBT0MsVUFBUztBQUNyQyxRQUFJO0FBQ0EsWUFBTSxXQUFXLE1BQU0sTUFBTSwyQ0FBMkM7QUFBQSxRQUNwRSxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDTCxnQkFBZ0I7QUFBQSxRQUNwQjtBQUFBLFFBQ0EsTUFBTSxJQUFJLGdCQUFnQjtBQUFBLFVBQ3RCLFVBQVU7QUFBQSxVQUNWLE1BQU1BO0FBQUEsVUFDTixhQUFhO0FBQUEsUUFDakIsQ0FBQztBQUFBLE1BQ0wsQ0FBQztBQUVELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxjQUFNLElBQUksTUFBTSx3REFBVztBQUFBLE1BQy9CO0FBRUEsWUFBTUMsUUFBTyxNQUFNLFNBQVMsS0FBSztBQUNqQyxhQUFPQSxNQUFLLGFBQWEsQ0FBQyxFQUFFO0FBQUEsSUFFaEMsU0FBUyxPQUFPO0FBQ1osY0FBUSxNQUFNLG1DQUFVLEtBQUs7QUFDN0IsYUFBT0Q7QUFBQSxJQUNYO0FBQUEsRUFDSjtBQUVBLFFBQU0sT0FBTztBQUFBLElBQ1QsU0FBUztBQUFBO0FBQUEsRUFFYjtBQUVBLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxJQUFJLENBQUM7QUFDNUM7IiwKICAibmFtZXMiOiBbIkdvb2dsZUF1dGhQcm92aWRlciIsICJlIiwgImZldGNoTWVzc2FnZXMiLCAibXNnIiwgInRleHQiLCAiZGF0YSJdCn0K

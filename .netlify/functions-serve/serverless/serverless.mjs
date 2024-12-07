
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// netlify/functions/serverless.mjs
var serverless_default = async () => {
  const { initializeApp, applicationDefault, cert } = __require("firebase-admin/app");
  const { getFirestore, Timestamp, FieldValue, Filter } = __require("firebase-admin/firestore");
  const data = {
    message: "Hello, World!"
  };
  return new Response(JSON.stringify(data));
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2VydmVybGVzcy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHsgaW5pdGlhbGl6ZUFwcCwgYXBwbGljYXRpb25EZWZhdWx0LCBjZXJ0IH0gPSByZXF1aXJlKCdmaXJlYmFzZS1hZG1pbi9hcHAnKTtcclxuICAgIGNvbnN0IHsgZ2V0RmlyZXN0b3JlLCBUaW1lc3RhbXAsIEZpZWxkVmFsdWUsIEZpbHRlciB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJyk7XHJcbiAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIG1lc3NhZ2U6IFwiSGVsbG8sIFdvcmxkIVwiLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFPLHFCQUFRLFlBQVk7QUFDdkIsUUFBTSxFQUFFLGVBQWUsb0JBQW9CLEtBQUssSUFBSSxVQUFRLG9CQUFvQjtBQUNoRixRQUFNLEVBQUUsY0FBYyxXQUFXLFlBQVksT0FBTyxJQUFJLFVBQVEsMEJBQTBCO0FBQzFGLFFBQU0sT0FBTztBQUFBLElBQ1QsU0FBUztBQUFBLEVBQ2I7QUFDQSxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQzVDOyIsCiAgIm5hbWVzIjogW10KfQo=

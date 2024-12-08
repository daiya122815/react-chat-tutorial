
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/serverless.mjs
var serverless_default = async () => {
  const data = {
    message: "Hello, World!"
  };
  return new Response(JSON.stringify(data));
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2VydmVybGVzcy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcclxuICAgIC8vIGNvbnN0IHsgaW5pdGlhbGl6ZUFwcCwgYXBwbGljYXRpb25EZWZhdWx0LCBjZXJ0IH0gPSByZXF1aXJlKCdmaXJlYmFzZS1hZG1pbi9hcHAnKTtcclxuICAgIC8vIGNvbnN0IHsgZ2V0RmlyZXN0b3JlLCBUaW1lc3RhbXAsIEZpZWxkVmFsdWUsIEZpbHRlciB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJyk7XHJcbiAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIG1lc3NhZ2U6IFwiSGVsbG8sIFdvcmxkIVwiLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8scUJBQVEsWUFBWTtBQUd2QixRQUFNLE9BQU87QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNiO0FBQ0EsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQztBQUM1QzsiLAogICJuYW1lcyI6IFtdCn0K

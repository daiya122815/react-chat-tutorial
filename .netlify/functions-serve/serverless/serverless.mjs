
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/serverless.mjs
import "dotenv/config";
var serverless_default = async () => {
  const key = import.meta.env.VITE_DEEPL_API_KEY;
  const data = {
    message: key
  };
  return new Response(JSON.stringify(data));
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2VydmVybGVzcy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIGltcG9ydCB7IG1zZyB9IGZyb20gXCIuLi8uLi9zcmMvQXBwXCI7XHJcbmltcG9ydCAnZG90ZW52L2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyBjb25zdCB7IGluaXRpYWxpemVBcHAsIGFwcGxpY2F0aW9uRGVmYXVsdCwgY2VydCB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vYXBwJyk7XHJcbiAgICAvLyBjb25zdCB7IGdldEZpcmVzdG9yZSwgVGltZXN0YW1wLCBGaWVsZFZhbHVlLCBGaWx0ZXIgfSA9IHJlcXVpcmUoJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZScpO1xyXG4gICAgY29uc3Qga2V5ID0gaW1wb3J0Lm1ldGEuZW52LlZJVEVfREVFUExfQVBJX0tFWTtcclxuICAgIC8vIGNvbnN0IGtleSA9IHByb2Nlc3MuZW52LlZJVEVfREVFUExfQVBJX0tFWTtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgbWVzc2FnZToga2V5LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUNBLE9BQU87QUFFUCxJQUFPLHFCQUFRLFlBQVk7QUFHdkIsUUFBTSxNQUFNLFlBQVksSUFBSTtBQUU1QixRQUFNLE9BQU87QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNiO0FBQ0EsU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQztBQUM1QzsiLAogICJuYW1lcyI6IFtdCn0K

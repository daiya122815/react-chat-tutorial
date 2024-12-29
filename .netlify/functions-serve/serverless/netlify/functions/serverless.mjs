
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/serverless.mjs
import "dotenv/config";
var serverless_default = async (req) => {
  const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;
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
    throw new Error("\u7FFB\u8A33\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
  }
  const data = await response.json();
  const translatemsg = data.translations[0].text;
  const data2 = {
    message: translatemsg
  };
  return new Response(JSON.stringify(data2));
};
export {
  serverless_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvc2VydmVybGVzcy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAnZG90ZW52L2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEpID0+IHtcbiAgICAvLyBjb25zdCB7IGluaXRpYWxpemVBcHAsIGFwcGxpY2F0aW9uRGVmYXVsdCwgY2VydCB9ID0gcmVxdWlyZSgnZmlyZWJhc2UtYWRtaW4vYXBwJyk7XG4gICAgLy8gY29uc3QgeyBnZXRGaXJlc3RvcmUsIFRpbWVzdGFtcCwgRmllbGRWYWx1ZSwgRmlsdGVyIH0gPSByZXF1aXJlKCdmaXJlYmFzZS1hZG1pbi9maXJlc3RvcmUnKTtcblxuICAgIC8vIC5lbnZcdTMwNEJcdTMwODlBUElcdTMwQURcdTMwRkNcdTMwOTJcdTUzRDZcdTVGOTdcbiAgICBjb25zdCBERUVQTF9BUElfS0VZID0gcHJvY2Vzcy5lbnYuVklURV9ERUVQTF9BUElfS0VZO1xuICAgIC8vIGNvbnN0IGtleSA9IGltcG9ydC5tZXRhLmVudi5WSVRFX0RFRVBMX0FQSV9LRVk7XG5cbiAgICAvLyBIVFRQXHUzMDZFUE9TVFx1MzBFMVx1MzBCRFx1MzBDM1x1MzBDOVx1MzA5Mlx1NTNENlx1MzA4QVx1NTFGQVx1MzA1OVxuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXEuanNvbigpO1xuICAgIC8vIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHN0cmluZ2pzb24pO1xuICAgIGNvbnN0IG1zZyA9IGpzb24ubWVzc2FnZTtcblxuICAgIC8vIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xuICAgIC8vIGNvbnN0IHRleHQgPSBpbnB1dC50ZXh0IHx8IFwiXCI7XG5cbiAgICAvLyBjb25zdCB0cmFuc2xhdGVNZXNzYWdlID0gYXN5bmMgKHRleHRUb1RyYW5zbGF0ZSkgPT4ge1xuICAgIC8vIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLWZyZWUuZGVlcGwuY29tL3YyL3RyYW5zbGF0ZVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgYXV0aF9rZXk6IERFRVBMX0FQSV9LRVksXG4gICAgICAgICAgICB0ZXh0OiBtc2csXG4gICAgICAgICAgICB0YXJnZXRfbGFuZzogXCJKQVwiLFxuICAgICAgICB9KSxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXHU3RkZCXHU4QTMzXHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgdHJhbnNsYXRlbXNnID0gZGF0YS50cmFuc2xhdGlvbnNbMF0udGV4dDsgLy8gXHU3RkZCXHU4QTMzXHUzMDU1XHUzMDhDXHUzMDVGXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMDkyXHU4RkQ0XHUzMDU5XG4gICAgY29uc3QgZGF0YTIgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHRyYW5zbGF0ZW1zZyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YTIpKTtcbiAgICAvLyByZXR1cm4gbmV3IFJlc3BvbnNlKHN0cmluZ2pzb24pO1xuICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gY29uc29sZS5lcnJvcihcIlx1N0ZGQlx1OEEzM1x1MzBBOFx1MzBFOVx1MzBGQzpcIiwgZXJyb3IpO1xuICAgIC8vIHJldHVybiBKU09OLnN0cmluZ2lmeShqc29uKTsgLy8gXHUzMEE4XHUzMEU5XHUzMEZDXHUzMDZFXHU1ODM0XHU1NDA4XHUzMDZGXHU1MTQzXHUzMDZFXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMDkyXHU4RkQ0XHUzMDU5XG4gICAgLy8gfVxuICAgIC8vIH07XG5cbiAgICAvLyBjb25zdCB0cmFuc2xhdGVkVGV4dCA9IGF3YWl0IHRyYW5zbGF0ZU1lc3NhZ2UodGV4dCk7XG4gICAgLy8gY29uc3QgZGF0YSA9IHtcbiAgICAvLyAgICAgbXNnOiBtZXNzYWdlcyxcbiAgICAvLyAgICAgdHJhbnNsYXRlbXNnOiB0cmFuc2xhdGVNZXNzYWdlKHRleHQpLFxuICAgIC8vIH07XG4gICAgLy8gY29uc3QgZGF0YSA9IHtcbiAgICAvLyAgICAgbWVzc2FnZToga2V5LFxuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gbmV3IFJlc3BvbnNlKG1zZyk7XG59O1xuXG4vLyBleHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbi8vICAgICBjb25zdCBib2R5ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcblxuLy8gICAgIC8vIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbi8vICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4vLyAgICAgfTtcbi8vIH07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLE9BQU87QUFFUCxJQUFPLHFCQUFRLE9BQU8sUUFBUTtBQUsxQixRQUFNLGdCQUFnQixRQUFRLElBQUk7QUFJbEMsUUFBTSxPQUFPLE1BQU0sSUFBSSxLQUFLO0FBRTVCLFFBQU0sTUFBTSxLQUFLO0FBT2pCLFFBQU0sV0FBVyxNQUFNLE1BQU0sMkNBQTJDO0FBQUEsSUFDcEUsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsSUFDcEI7QUFBQSxJQUNBLE1BQU0sSUFBSSxnQkFBZ0I7QUFBQSxNQUN0QixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0wsQ0FBQztBQUVELE1BQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxVQUFNLElBQUksTUFBTSx3REFBVztBQUFBLEVBQy9CO0FBRUEsUUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFFBQU0sZUFBZSxLQUFLLGFBQWEsQ0FBQyxFQUFFO0FBQzFDLFFBQU0sUUFBUTtBQUFBLElBQ1YsU0FBUztBQUFBLEVBQ2I7QUFDQSxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsS0FBSyxDQUFDO0FBaUI3QzsiLAogICJuYW1lcyI6IFtdCn0K

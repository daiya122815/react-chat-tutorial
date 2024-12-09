// import { msg } from "../../src/App";
import 'dotenv/config';

export default async () => {
    // const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    // const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    const key = import.meta.env.VITE_DEEPL_API_KEY;
    // const key = process.env.VITE_DEEPL_API_KEY;
    const data = {
        message: key,
    };
    return new Response(JSON.stringify(data));
}
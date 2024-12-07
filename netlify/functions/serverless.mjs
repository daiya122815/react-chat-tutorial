export default async () => {
    const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    const data = {
        message: "Hello, World!",
    };
    return new Response(JSON.stringify(data));
}
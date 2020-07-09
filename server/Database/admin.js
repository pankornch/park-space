const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
require('dotenv');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL

});

module.exports.db = admin.firestore();
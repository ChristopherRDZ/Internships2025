// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./internshipslist-firebase-adminsdk-41apm-08ba72ea4e.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://internshipslist.firebaseio.com'
});

module.exports = admin;

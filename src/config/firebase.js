import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const firestore = app.firestore();
const database = {
    notes: firestore.collection('notes'),
    trash: firestore.collection('trash'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurremtTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export {
    auth,
    firebase,
    database
}
export default app;

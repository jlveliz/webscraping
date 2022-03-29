// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDfL-Sf5RsRwPnswV0f2O6qt3d-EhAq2_w',
    authDomain: 'redux-demo-testing.firebaseapp.com',
    projectId: 'redux-demo-testing',
    storageBucket: 'redux-demo-testing.appspot.com',
    messagingSenderId: '127681541082',
    appId: '1:127681541082:web:7b42aeaa454c18207486e3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    app
}
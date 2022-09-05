import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
	apiKey: "AIzaSyBaKOXx0OiVYicGw6yF7o6m0GVBNt3wEA0",
	authDomain: "messenger-clone-d5721.firebaseapp.com",
	databaseURL: "https://messenger-clone-d5721.firebaseio.com",
	projectId: "messenger-clone-d5721",
	storageBucket: "messenger-clone-d5721.appspot.com",
	messagingSenderId: "110664471019",
	appId: "1:110664471019:web:dcb3354212db280f2cc9ae",
	measurementId: "G-CZG75QYDL6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore();

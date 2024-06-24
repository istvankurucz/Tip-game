import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAv-RA1uIWYDiJqE_Hv4bSfvXWRB-PESAM",
	authDomain: "tip-game-10a87.firebaseapp.com",
	projectId: "tip-game-10a87",
	storageBucket: "tip-game-10a87.appspot.com",
	messagingSenderId: "220588398176",
	appId: "1:220588398176:web:7f1f81412e1b4bac7f9505",
	measurementId: "G-QXSSNC3VEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

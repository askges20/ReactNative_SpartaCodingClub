//import * as firebase from 'firebase/app';
import firebase from 'firebase/app';

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
    apiKey: "AIzaSyBMXK-Vpv5wW6TYEKxMdzLGsKn4UY-vNX0",
    authDomain: "sparta-myhoneytip-yewon.firebaseapp.com",
    databaseURL: "https://sparta-myhoneytip-yewon-default-rtdb.firebaseio.com",
    projectId: "sparta-myhoneytip-yewon",
    storageBucket: "sparta-myhoneytip-yewon.appspot.com",
    messagingSenderId: "44731016366",
    appId: "1:44731016366:web:3e1b8f1f29b3440ddbb93f",
    measurementId: "G-E4WCLCL8P6"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()
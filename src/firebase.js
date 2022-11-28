import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrpapcpMo7RSzdqWMdkjVhxN2HodfaLF0",
  authDomain: "kanbanboard-86f74.firebaseapp.com",
  databaseURL: "https://kanbanboard-86f74-default-rtdb.firebaseio.com",
  projectId: "kanbanboard-86f74",
  storageBucket: "kanbanboard-86f74.appspot.com",
  messagingSenderId: "188231945218",
  appId: "1:188231945218:web:331432102c7cafdc246b1b",
};

const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);

export { database };

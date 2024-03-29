
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCTqmMrV2ga4kw2ORlEzieLV7-S-Q54hzQ",
  authDomain: "todo-list-cbd7a.firebaseapp.com",
  databaseURL: "https://todo-list-cbd7a-default-rtdb.firebaseio.com",
  projectId: "todo-list-cbd7a",
  storageBucket: "todo-list-cbd7a.appspot.com",
  messagingSenderId: "624522419277",
  appId: "1:624522419277:web:57721aafc6efe558d1d004"
};


const app = initializeApp(firebaseConfig)
export const db = getDatabase(App)
export const auth = getAuth()

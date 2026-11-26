import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyClZTN13IY1K-Ic-kMKAg2Z9GHaKFYS59k',
  authDomain: 'data-earthqueake.firebaseapp.com',
  databaseURL: 'https://data-earthqueake-default-rtdb.firebaseio.com',
  projectId: 'data-earthqueake',
  storageBucket: 'data-earthqueake.firebasestorage.app',
  messagingSenderId: '166342256761',
  appId: '1:166342256761:web:878ae1244028d126984ca8',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
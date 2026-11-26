import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB_HDdNjCB9oFt4JRTwdwdratNPMKK5ohE',
  authDomain: 'data-earthquake.firebaseapp.com',
  databaseURL: '<PEGA-AQUI-LA-URL-DE-TU-REALTIME-DATABASE>',
  projectId: 'data-earthquake',
  storageBucket: 'data-earthquake.firebasestorage.app',
  messagingSenderId: '728358213842',
  appId: '1:728358213842:web:d8e99c100ca94730edb50b',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
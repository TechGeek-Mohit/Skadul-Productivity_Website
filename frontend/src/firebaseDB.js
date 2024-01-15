import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React, { useState, useRef } from 'react';

const firebaseConfig = {
    // your firebase config
    apiKey: "##Put your own API Key from Firebase##",
    authDomain: "skadul-e2b60.firebaseapp.com",
    projectId: "skadul-e2b60",
    storageBucket: "skadul-e2b60.appspot.com",
    messagingSenderId: "443940722771",
    appId: "1:443940722771:web:728d20acccacefb22b4ea6",
    measurementId: "G-NDL79PHFR2"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  export {db}

 
  
  

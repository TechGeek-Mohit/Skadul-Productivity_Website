//import for firebase
import "./firebaseDB";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";
import React, { useState, useRef } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Text, Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import styles from "./App.module.css";

import MainPage from "./pages/MainPage/MainPage";
import Analytics from "./pages/MainPage/analytics/analytics";
import FocusMode from "./pages/MainPage/focusmode/focusmode";
import Schedule from "./pages/MainPage/schedule/schedule";



const auth = firebase.auth();
export { auth };

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div
    style={{
      backgroundImage: "url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}
    >
      <div className={styles.signInMessage}>
        <Text as="b" fontSize="6xl">
          Welcome to Skadual! 📝
        </Text>
        <Button
          leftIcon={<EmailIcon />}
          variant="solid"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

// export function SignOut() {
//   return (
//     auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
//   );
// }

function App() {
  const [user] = useAuthState(auth);
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <MainPage />;
      break;
    case "/home":
      component = <MainPage />;
      break;
    case "/focusmode":
      component = <FocusMode />;
      break;
    case "/analytics":
      component = <Analytics/>
      break;

    case "/signin":
      if (user) {
        window.location.href = "/";
      }
      component = <SignIn />;
      break;
  }

  const signout = () => {
    auth.signOut();
    window.location.href = "/";
  };
  return (
    <div className="App">
      <section>
        {user ? (
          <div>
            <>
              <NavBar signout={signout} />
              {component}
            </>
          </div>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

export default App;

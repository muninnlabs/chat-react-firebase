import "./App.css";

import "firebase/compat/firestore";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Chat } from "./Chat";
import Auth from "./components/Auth";

// interface Message {
//   id: string;
//   text: string;
//   createdAt: Timestamp;
//   uid: string;
//   photoURL: string;
// }

const cookies = new Cookies();

function App(): JSX.Element {
  // const [user] = useAuthState(auth);
  const [isAuth, setIsAuth] = useState(false);
  console.log("isAuth", isAuth);

  return (
    <div className="App">
      <header>
        <h1>Chat room</h1>
      </header>
      <section>
        {!isAuth ? (
          <div>
            <Auth setIsAuth={setIsAuth} />
          </div>
        ) : (
          <Chat />
        )}
      </section>

      {/* <section>{user ? <ChatRoom /> : <SignIn />}</section> */}
    </div>
  );
}



// function SignIn(): JSX.Element {
//   const signInWithGoogle = (): void => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
//   };

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>
//         Sign in with Google
//       </button>
//       <p>
//         Do not violate the community guidelines or you will be banned for life!
//       </p>
//     </>
//   );
// }

// function SignOut(): JSX.Element | null {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }



// function ChatMessage(props: { message: Message }): JSX.Element {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser!.uid ? "sent" : "received";

//   return (
//     <>
//       <div className={`message ${messageClass}`}>
//         <img
//           src={
//             photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
//           }
//           alt="User Avatar"
//         />
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }

export default App;

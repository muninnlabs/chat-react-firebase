import { auth } from '../firebase.config';
import { Message } from '../interfaces/Messages';

export default function ChatMessage(props: { message: Message }) {
    console.log(props.message);
  
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  
    return (
      <>
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
          <p>
            {text}
          </p>
        </div>
      </>
    );
  }
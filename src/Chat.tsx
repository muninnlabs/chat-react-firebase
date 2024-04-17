import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./components/ChatMessage";
import { auth, db } from "./firebase.config";
import { Message } from "./interfaces/Messages";



export const Chat = () => {
  const [room, setRoom] = useState<string | null>('default-room');
  const [formValue, setFormValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[] | undefined>([]);
  const messagesRef = collection(db, "messages");

  const roomInputRef = useRef<HTMLInputElement>(null);
  const dummy = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (querySnapshot): void => {
      const messages: Message[] = [];
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id } as Message);
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const createRoom = () => {
    if (roomInputRef.current) {
      setRoom(roomInputRef?.current.value);
    }
  };

  const { uid, photoURL, displayName } = auth.currentUser!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue === "") return;
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      displayName,
      room,
    });
    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {room ? (
        <>
          <main>
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}></span>
          </main>

          <form onSubmit={handleSubmit}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice"
            />

            <button type="submit" disabled={!formValue}>
              🕊️
            </button>
          </form>
        </>
      ) : (
        <div className="room">
          <label htmlFor="room">Enter room name</label>
          <input type="text" id="room" ref={roomInputRef} />
          <button onClick={createRoom}>Enter Chat</button>
        </div>
      )}
    </div>
  );
};

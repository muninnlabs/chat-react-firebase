import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth, provider } from "../firebase.config";
const cookies = new Cookies();

export default function Auth(props: any): JSX.Element {

  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth">
      <p>Sign with google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

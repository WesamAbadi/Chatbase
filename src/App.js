import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
//firebase imports
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//import "firebase/compat/auth";
//import firebase from "firebase/compat/app";

function App() {
  const [user] = useAuthState(auth);
  return <>{user ? <Chat /> : <SignIn />}</>;
}

export default App;

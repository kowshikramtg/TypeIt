import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import app from "./config";

const auth = getAuth(app);

const provider =
  new GoogleAuthProvider();

export const signInWithGoogle =
  () => {
    return signInWithPopup(
      auth,
      provider
    );
  };

export const logout = () => {
  return signOut(auth);
};

export default auth;
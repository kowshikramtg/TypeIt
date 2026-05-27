import {
  signInWithGoogle,
  logout,
} from "../firebase/auth";

import type { User } from "firebase/auth";

type AuthButtonProps = {
  user: User | null;
};

const AuthButton = ({
  user,
}: AuthButtonProps) => {
  return (
    <div className="absolute top-8 right-8">
      {!user ? (
        <button
          onClick={signInWithGoogle}
          className="
            px-5
            py-2
            rounded-xl
            bg-white
            text-black
            font-mono
            text-sm
            hover:scale-105
            transition-all
            duration-200
            cursor-pointer
          "
        >
          sign in
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={
              user.photoURL ||
              undefined
            }
            alt="profile"
            className="
              w-10
              h-10
              rounded-full
              border
              border-white/20
            "
          />

          <button
            onClick={logout}
            className="
              px-4
              py-2
              rounded-lg
              bg-red-500/10
              text-red-400
              font-mono
              text-sm
              hover:scale-105
              transition-all
              duration-200
              cursor-pointer
            "
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
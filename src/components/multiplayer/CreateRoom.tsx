import { createRoom } from "../../firebase/rooms";

import useAuth from "../../hooks/useAuth";

type Props = {
  setRoomId: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const CreateRoom = ({
  setRoomId,
}: Props) => {
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!user) return;

    const roomId = Math.random()
      .toString(36)
      .substring(2, 8);

    await createRoom(roomId, {
      uid: user.uid,
      name: user.displayName || "Player",
      photoURL: user.photoURL || "",
    });

    setRoomId(roomId);
  };

  return (
    <button
      onClick={handleCreate}
      className="
        px-5
        py-3
        rounded-xl
        bg-yellow-500
        text-black
        font-semibold
      "
    >
      Create Room
    </button>
  );
};

export default CreateRoom;
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";

const UserDetailsPage = () => {
  const { id } = useParams();

  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === id),
  );

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetailsPage;

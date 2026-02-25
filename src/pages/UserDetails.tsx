import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";

const UserDetails = () => {
  const { id } = useParams();
  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === id),
  );

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserDetails;

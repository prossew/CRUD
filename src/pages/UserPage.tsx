import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import type { RootState, AppDispatch } from "../app/store";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users Page</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;

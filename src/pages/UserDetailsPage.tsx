import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchUsers, type User } from "../features/users/usersSlice";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const user = users.find((u: User) => u.id === id);

  if (status === "loading") return <CircularProgress />;
  if (status === "failed")
    return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography color="error">User not found</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20 }}
      >
        Back
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>ID: {user.id}</Typography>
          <Typography>Email: {user.email}</Typography>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              style={{ marginTop: 10, width: 100, borderRadius: "50%" }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsPage;

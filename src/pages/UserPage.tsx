import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchUsers, deleteUser } from "../features/users/usersSlice";
import UserModal from "../components/UserModal";
import { Button, ButtonGroup } from "@mui/material";
import type { User } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleOpenUpdate = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <h1>Users Page</h1>

      <Button
        variant="contained"
        onClick={handleOpenCreate}
        style={{ marginBottom: 10 }}
      >
        Create User
      </Button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="outlined"
                      style={{ marginRight: 5 }}
                      onClick={(e) => {
                        e.stopPropagation(); // чтобы не срабатывал navigate
                        handleOpenUpdate(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteUser(user.id));
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <ButtonGroup variant="outlined">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    color={currentPage === page ? "primary" : "inherit"}
                  >
                    {page}
                  </Button>
                ),
              )}
            </ButtonGroup>
          </div>
        </>
      )}

      <UserModal
        open={modalOpen}
        handleClose={handleClose}
        user={selectedUser ?? undefined} 
      />
    </div>
  );
};

export default UsersPage;

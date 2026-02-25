import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { createUser, updateUser } from "../features/users/usersSlice";

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UserModal: React.FC<UserModalProps> = ({ open, handleClose, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      alert("All fields are required");
      return;
    }

    if (user) {
      dispatch(updateUser({ id: user.id, firstName, lastName, email }));
    } else {
      dispatch(createUser({ firstName, lastName, email }));
    }

    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {user ? "Update User" : "Create User"}
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {user ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;

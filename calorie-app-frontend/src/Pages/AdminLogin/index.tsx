import { TextField } from "@mui/material";
import { useState } from "react";
import { adminLogin } from "../../Services/api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export function AdminLogin() {
  const navigate = useNavigate();
  const [value, setValue] = useState("Admin");
  const [error, setError] = useState(false);

  const handleChange = (event: any) => {
    if (error) {
      setError(false);
    }
    setValue(event.target.value);
  };

  const login = () => {
    adminLogin(value).then((data: any) => {
      if (data) {
        console.log("login success");
        localStorage.setItem("admin", JSON.stringify(data));
        navigate(`/admin/home`);
      } else {
        console.log("login failed");
        setError(true);
      }
    });
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <TextField
        error={error}
        helperText={error && "Incorrect Username"}
        required
        id="outlined-required"
        label="Type Your Name"
        value={value}
        onChange={handleChange}
      />
      <Button
        className="button-wrapper"
        onClick={login}
        size="small"
        variant="contained"
      >
        Admin Login
      </Button>
    </div>
  );
}

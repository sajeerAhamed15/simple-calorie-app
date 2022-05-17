import { TextField } from "@mui/material";
import { useState } from "react";
import { adminLogin, getAdmin } from "../../Services/api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export function AdminLogin() {
  const navigate = useNavigate();
  const [value, setValue] = useState("Admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleValueChange = (event: any) => {
    if (error) {
      setError(false);
    }
    setValue(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    if (error) {
      setError(false);
    }
    setPassword(event.target.value);
  };

  const login = async () => {
    const _token = await adminLogin(value, password);
    if (_token) {
      console.log("login success");
      localStorage.setItem("token", JSON.stringify(_token));
    } else {
      console.log("login failed");
      setError(true);
    }

    getAdmin(value, password).then((data: any) => {
      localStorage.setItem("admin", JSON.stringify(data));
      navigate(`/admin/home`);
    })
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <TextField
        error={error}
        helperText={error && "Incorrect Username or Password"}
        required
        id="outlined-required"
        label="Type Your Name"
        value={value}
        onChange={handleValueChange}
      />
      <TextField
        style={{marginTop: 10}}
        error={error}
        helperText={error && "Incorrect Username or Password"}
        required
        id="outlined-required"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
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

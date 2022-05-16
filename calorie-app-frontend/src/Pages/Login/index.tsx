import { TextField } from "@mui/material";
import { useState } from "react";
import { userLogin } from "../../Services/api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState("Hulk");
  const [error, setError] = useState(false);

  const handleChange = (event: any) => {
    if (error) {
      setError(false);
    }
    setValue(event.target.value);
  };

  const login = () => {
    userLogin(value).then((data: any) => {
      if (data) {
        console.log("login success");
        localStorage.setItem("user", JSON.stringify(data));
        navigate(`/`);
      } else {
        console.log("login failed");
        setError(true);
      }
    });
  };

  return (
    <div className="login">
      <h1>User Login</h1>
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
        Login
      </Button>
    </div>
  );
}

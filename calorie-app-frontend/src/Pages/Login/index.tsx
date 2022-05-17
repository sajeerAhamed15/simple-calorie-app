import { TextField } from "@mui/material";
import { useState } from "react";
import { getUser, userLogin } from "../../Services/api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState("Hulk");
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
    const _token = await userLogin(value, password);
    if (_token) {
      console.log("login success");
      localStorage.setItem("token", JSON.stringify(_token));
    } else {
      console.log("login failed");
      setError(true);
    }

    getUser(value, password).then((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/`);
    })
  };

  return (
    <div className="login">
      <h1>User Login</h1>
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
        Login
      </Button>
    </div>
  );
}

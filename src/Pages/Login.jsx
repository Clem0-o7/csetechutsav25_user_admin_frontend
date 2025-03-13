import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { api } from "../api/api";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBack, setMessageBack] = useState("green");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    if (!username || !password) {
      setMessage("Please enter both username and password");
      setMessageBack("red");
      setOpen(true);
      return;
    }

    setOpen(true);
    setMessage("Logging in...");
    setMessageBack("green");
    
    api
      .post("/", { username, password })
      .then((result) => {
        if (result.data.msg === "success") {
          sessionStorage.setItem("user", result.data.user);
          sessionStorage.setItem("department", result.data.department);
          setOpen(false);
          navigate("/list");
        } else {
          setMessage("Login failed");
          setMessageBack("red");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Invalid credentials");
        setMessageBack("red");
      });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={`w-full h-screen flex items-center justify-center`}>
      <Paper
        className={`flex flex-col items-center w-[450px] p-[25px] h-[450px] justify-evenly`}
      >
        <h1 className={`font-bold text-3xl`}>TECHUTSAV ADMIN</h1>
        <p className={`w-full text-center mb-4`}>
          Please enter your credentials to access the system
        </p>
        
        <div className={`w-full mb-4`}>
          <FormControl fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              autoFocus={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
        </div>
        
        <div className={`w-full mb-6`}>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              type={seePassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <IconButton
                  onClick={() => setSeePassword(!seePassword)}
                  edge="end"
                >
                  {seePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleClick();
                }
              }}
            />
          </FormControl>
        </div>
        
        <Button 
          variant="contained" 
          onClick={handleClick}
          fullWidth
          size="large"
        >
          Login
        </Button>
      </Paper>
      
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={5000}
      >
        <SnackbarContent
          message={message}
          sx={{ backgroundColor: messageBack }}
          action={action}
        />
      </Snackbar>
    </div>
  );
};

export default Login;
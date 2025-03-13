import React, { useState, useEffect } from "react";
import Data from "../components/Data";
import Button from "@mui/material/Button";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const [userType, setUserType] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from session storage
    const storedUserType = sessionStorage.getItem("user");
    const storedDepartment = sessionStorage.getItem("department");
    
    if (!storedUserType || !storedDepartment) {
      navigate("/");
    } else {
      setUserType(storedUserType);
      setDepartment(storedDepartment);
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <div className={`w-full h-[50px] flex items-center p-10 justify-between`}>
        <div>
          <h1 className={`text-2xl font-bold`}>TECHUTSAV ADMIN PANEL</h1>
          {department && department !== "all" && (
            <p className="mt-1 text-blue-600">Department: {department}</p>
          )}
          {department === "all" && (
            <p className="mt-1 text-green-600">Super Admin Access</p>
          )}
        </div>
        <div className="w-[350px] flex items-center justify-between">
          <Button variant="contained" onClick={() => setUpdateForm(true)}>
            Refresh Data
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = import.meta.env.VITE_API_KEY+"/downloadData";
            }}
          >
            Download Data
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("department");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Data updateForm={updateForm} setUpdateForm={setUpdateForm} />
    </div>
  );
};

export default AdminPage;
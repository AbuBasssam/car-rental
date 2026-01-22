import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../routes/paths";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add login logic here
    console.log("Login details", credentials);

    // Placeholder للنجاح - سيتم استبداله بـ API call
    toast.success("Login Successful! Welcome back", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      onClose: () => {
        const redirectPath = location.state?.from || ROUTES.HOME;
        navigate(redirectPath, { replace: true });
      },
    });
  };

  return {
    credentials,
    showPassword,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};

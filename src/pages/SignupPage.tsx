import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/userTypes";
import "../styles/SignupPage.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response.status);

      if (response.ok) {
        console.log("Sign up successful");
      } else {
        if (response.status === 409) {
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

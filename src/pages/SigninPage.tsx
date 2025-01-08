import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../types/userTypes";
// @ts-ignore
import "../styles/signupPage.css";

export default function SigninPage() {
  const [formData, setFormData] = useState<UserLogin>({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response.status);

      if (response.ok) {
        navigate("/account");
      } else {
        console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign In</button>
    </form>
  );
}

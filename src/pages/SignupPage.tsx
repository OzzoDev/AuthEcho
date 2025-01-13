import { getSecurityQuestions, signUp } from "../utils/ServerClient";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import FormInput from "../components/form/FormInput";
import FormPasswordInput from "../components/form/FormPasswordInput";
import FormVerify from "../components/form/FormVerify";
import { FetchStatus } from "../types/apiTypes";
import { FormState, SecurityQuestion, UserFormData } from "../types/types";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";

export default function SignUpPage() {
  const [formData, setFormData] = useState<UserFormData>({ name: "", email: "", password: "", confirmPassword: "", securityQuestionId: undefined, securityQuestionAnswer: "" });
  const [formState, setFormState] = useState<FormState>("question");
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (formState === "question") {
      const fetchSecurityQuestions = async () => {
        const questionsResponse = await getSecurityQuestions(setStatus, setError);
        if (questionsResponse) {
          setSecurityQuestions(questionsResponse.data.questions);
          console.log(questionsResponse.data.questions);
        }
      };
      fetchSecurityQuestions();
    }
  }, [formState]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelect = (question: { id: number; question: string }) => {
    console.log("Selected Question:", question);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "default") {
      const signUpResponse = await signUp({ name: formData.name || "", email: formData.email || "", password: formData.password || "", confirmPassword: formData.confirmPassword || "" }, setStatus, setError);
      if (signUpResponse) {
        setFormState("question");
      }
    }
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <ReactLoading type="spin" color="#00f" height={50} width={50} />;
      </>
    );
  }

  switch (formState) {
    case "default":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Create your account!</h2>
            <FormInput labelText="Username" name="name" value={formData.name || ""} onChange={handleFormChange} required />
            <FormInput labelText="Email" name="email" value={formData.email || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleFormChange} required />
            <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleFormChange} required />
            <button type="submit" className="submit-btn btn btn-primary">
              Sign Up
            </button>
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "question":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Select Security Question!</h2>
            <p className="form-info">Implementing a security question significantly enhances your account's protection. Please choose a question that you can easily remember for future reference.</p>
            <Dropdown questions={securityQuestions} onSelect={handleSelect} />

            <button type="submit" className="submit-btn btn btn-primary">
              Continue
            </button>
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
    case "verify":
      return (
        <>
          <Navbar />
          <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
          <form onSubmit={handleSubmit}>
            <h2 className="form-headline">Verify Email!</h2>
            <p className="form-info">An email has been sent to {formData.email}. Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
            <FormVerify formData={formData} verify="signup" setStatus={setStatus} setError={setError} setFormData={setFormData} />
          </form>
          <h2 className="errorMessage">{error}</h2>
        </>
      );
  }

  // return (
  //   <>
  //     <Navbar />
  //     <h1 className="page-headline">Join Now for Effortless Account Management and Ultimate Security!</h1>
  //     <form onSubmit={handleSubmit}>
  //       {/* {formState === "default" ? ( */}
  //         <>
  //           {/* <h2 className="form-headline">Create your account!</h2>
  //           <FormInput labelText="Username" name="name" value={formData.name || ""} onChange={handleFormChange} required />
  //           <FormInput labelText="Email" name="email" value={formData.email || ""} onChange={handleFormChange} required />
  //           <FormPasswordInput labelText="Password" name="password" value={formData.password || ""} onChange={handleFormChange} required />
  //           <FormPasswordInput labelText="Confirm password" name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleFormChange} required />
  //           <button type="submit" className="submit-btn btn btn-primary">
  //             Sign Up
  //           </button> */}
  //         </>
  //       ) : (
  //         <>
  //           <h2 className="form-headline">Verify Email!</h2>
  //           <p className="form-info">An email has been sent to {formData.email}. Please check your inbox for an 8-character verification code and enter it in the field provided below</p>
  //           <FormVerify formData={formData} verify="signup" setStatus={setStatus} setError={setError} setFormData={setFormData} />
  //         </>
  //       )}
  //     </form>
  //     <h2 className="errorMessage">{error}</h2>
  //   </>
  // );
}

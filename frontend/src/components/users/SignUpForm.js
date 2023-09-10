import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../support/Alert";
//import "./SignUp.css";

function SignUpForm({ signUp }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const Navigate = useNavigate();
  console.log(
    "SignupForm",
    "signup=",
    typeof signUp,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signUp(formData);
    if (result.success) {
      Navigate("/homePage");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="signupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card signup-card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group left signup-label-font">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>

              <div className="form-group left signup-label-font">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <div className="form-group left signup-label-font">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" message={formErrors} />
              ) : null}

              <button
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpForm;

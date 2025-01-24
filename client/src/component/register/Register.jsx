// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./register.css";
// import authImg from "../../assest/auth-img/auth_side.png"
// import authImg2 from "../../assest/auth-img/auth-logo.png"


// const Register = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message);
//       setMessage(data.message);
//       setError("");
//       setFormData({ email: "", password: "" });
//       navigate('/login')
//     } catch (err) {
//       setError(err.message);
//       setMessage("");
//     }
//   };

//   return (
//     <>
//       <div className="text-center">
//         <div className="row gap-0">
//           <div className="col leftauth">
//             <div className="auth-img">
//               <img src={authImg} alt="Auth" />
//             </div>
//           </div>
//           <div className="col rightauth">
//             <div className="container">
//               <div className="header">
//                 <div className="header-img">
//                   <img src={authImg2} alt="Logo" />
//                 </div>
//                 <div className="header-heading">
//                   <h1>Lending Guru</h1>
//                   <p>For simplifying your EMI management</p>
//                 </div>
//                 <div className="header-login">
//                   <h2>Register</h2>
//                   <p>Please Register your account</p>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="login-input">
//                   <label>E-Mail Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter Your Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {/* {emailError && <p className="error">{emailError}</p>} */}
//                 </div>

//                 <div className="login-input">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter Your Password Here"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="loginBtn">
//                   {/* <button
//                             type="submit"
//                             disabled={!isFormValid}
//                             style={{
//                               backgroundColor: isFormValid ? "#4E14BF" : "#E9E9E9",
//                             }}
//                           >
//                             Login
//                           </button> */}
//                   <button type="submit">Register</button>
//                 </div>
//               </form>
//               <div className="redirect-link">
//                 <p>
//                   Already have an account? <Link to="/login">Login</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import authImg from "../../assest/auth-img/auth_side.png";
import authImg2 from "../../assest/auth-img/auth-logo.png";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Registration successful!");
      setError("");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="text-center">
      <div className="row gap-0">
        <div className="col leftauth">
          <div className="auth-img">
            <img src={authImg} alt="Auth" />
          </div>
        </div>
        <div className="col rightauth">
          <div className="container">
            <div className="header">
              <div className="header-img">
                <img src={authImg2} alt="Logo" />
              </div>
              <div className="header-heading">
                <h1>Lending Guru</h1>
                <p>For simplifying your EMI management</p>
              </div>
              <div className="header-login">
                <h2>Register</h2>
                <p>Please register your account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="login-input">
                <label>E-Mail Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="login-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password Here"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <div className="loginBtn">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    backgroundColor: isFormValid ? "#4e14bf" : "grey",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                  }}
                >
                  Register
                </button>
              </div>
            </form>

            <div className="switch-auth">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

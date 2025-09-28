import InputBox from "../components/input.component";
import googleLogo from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimmationWrapper from "../common/page-animation";
import { useRef } from "react";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value.trim();
    }

    // form validation
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let { fullname, email, password } = formData;

    if (type === "signup" && (!fullname || fullname.length < 3)) {
      return console.error("Full Name must be at least 3 characters long.");
    }

    if (!email) {
      return console.error("Enter an Email.");
    } else if (!emailRegex.test(email)) {
      return console.error("Invalid Email format.");
    }

    if (!passwordRegex.test(password)) {
      return console.error(
        "Password must be 6–20 characters, include a number, lowercase and uppercase letter."
      );
    }

    //  Passed validation
    console.log("Form data ready to send:", formData);

    // Example: send to backend
    fetch(`http://localhost:3000/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Server response:", data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <AnimmationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          ref={authForm}
          className="w-[80%] max-w-[400px]"
          // onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "signin" ? "Welcome Back" : "Join Us today"}
          </h1>
          {type == "signup" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
              required
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            required
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            required
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-15 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button className="btn-dark flex items-center gap-4 justify-center center">
            <img
              src={googleLogo}
              className="w-5"
              alt="Google logo"
              loading="lazy"
            />
            Continue with google
          </button>
          {type === "signin" ? (
            <p className="my-5 text-center capitalize text-xl">
              i don't have an account{" "}
              <Link to="/signUp" className="text-blue-500 hover:underline">
                sign Up
              </Link>
            </p>
          ) : (
            <p className="my-5 text-center capitalize text-xl">
              I already have an account{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimmationWrapper>
  );
};

export default UserAuthForm;

import InputBox from "../components/input.component";
import googleLogo from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimmationWrapper from "../common/page-animation";

const UserAuthForm = ({ type }) => {
  return (
    <AnimmationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome Back" : "Join Us today"}
          </h1>
          {type == "sign-up" ? (
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

          <button className="btn-dark center mt-14" type="submit">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
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
          {type === "sign-in" ? (
            <p className="my-5 text-center capitalize text-xl">
              i don't have an account{" "}
              <Link to="/signUp" className="text-blue-500 hover:underline">
                sign Up
              </Link>
            </p>
          ) : (
            <p className="my-5 text-center capitalize text-xl">
              I already have an account{" "}
              <Link to="/signIn" className="text-blue-500 hover:underline">
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

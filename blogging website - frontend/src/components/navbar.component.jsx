import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.jpg";
import { useState } from "react";

const Navbar = () => {
  const [searchBoxVisiblity, setSearchBoxVisiblity] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="w-14 h-auto">
          <img src={logo} alt="logo" loading="lazy" className="w-full" />
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisiblity ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search blog"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden text-2xl bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() =>
              setSearchBoxVisiblity((currentValue) => !currentValue)
            }
          >
            <i className="fi fi-br-search text-xl"></i>
          </button>
          <Link
            to="/editor"
            className="hidden md:flex gap-2 link bg-grey rounded-2xl hover:bg-black hover:text-white"
          >
            <p>Write</p>
            <i className="fi fi-sr-pen-clip"></i>
          </Link>

          <Link to="/signin" className="btn-dark py-2">
            sign In
          </Link>
          <Link to="/signUp" className="btn-light py-2 hidden md:block">
            sign Up
          </Link>
          <button
            onClick={() => setDark((darkVal) => !darkVal)}
            className={
              "relative w-16 h-8 rounded-full flex items-center px-1 transition-colors duration-300 border border-black " +
              (dark ? "bg-black" : "bg-white")
            }
          >
            <span
              className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                dark ? "translate-x-8" : "translate-x-0"
              }`}
            >
              <span className="flex items-center justify-center w-full h-full text-sm">
                {dark ? "🌛" : "🌞"}
              </span>
            </span>
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

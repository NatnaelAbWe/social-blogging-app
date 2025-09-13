import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import dns from "dns";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

// schemas
import User from "./Schema/User.js";

const server = express();
let PORT = 3000;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

server.use(express.json());
dns.setDefaultResultOrder("ipv4first");

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameExists = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUsernameExists ? (username += nanoid(5)) : "";

  return username;
};

const formDatatoSend = (User) => {
  const accessToken = jwt.sign({ id: User._id }, process.env.SECRET_ACCESS_KEY);

  return {
    accessToken,
    profile_img: User.personal_info.profile_img,
    username: User.personal_info.username,
    fullname: User.personal_info.fullname,
  };
};

server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;
  if (fullname.length < 3) {
    return res.status(403).json({ error: "Full Name a least 3 letters long." });
  }
  if (!email || !email.length) {
    return res.status(403).json({ error: "Enter an Email" });
  } else if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid Email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({ error: "invalid password" });
  }
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let userName = await generateUsername(email);
    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashed_password,
        username: userName,
      },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formDatatoSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ error: "Email Already Exists!" });
        }
        return res.status(500).json({ error: err.message });
      });
    // console.log(hashed_passwprd);
  });
  // return res.status(200).json({ status: "okay" });
});

server.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "email not found" });
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Error occurr while loging please try again" });
        }

        if (!result) {
          return res.status(403).json({ error: "Incorrect Password" });
        } else {
          return res.status(200).json(formDatatoSend(user));
        }
      });
      // return res.json({ statues: "got user document" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

server.listen(PORT, () => {
  console.log("Listening on port -> " + PORT);
});

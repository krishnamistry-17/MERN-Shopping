/** @format */

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from the server router.js`);
});

//Using promise

// router.post("/register", (req, res) => {
//   const { name, email, phone, password, cpassword } = req.body;

//   if (!name || !email || !phone || !password || !cpassword) {
//     return res.status(422).json({ error: "please filled the field properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email Already Exist" });
//       }

//       const user = new User({ name, email, phone, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User Registered Successfully" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to Registered" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "please filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      await user.save();

      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login Route
{
  //this for password matching code
  /*
router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "awosome" });
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }

    const userLogin = await User.findOne({ email: email });
    
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials pass" });
      } else {
        res.json({ message: "User Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials login" });
    }
  } catch (error) {
    onsole.log(err);
  }
});
*/
}

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    token = await userLogin.genrateAuthToken();
    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!userLogin) {
      res.status(400).json({ error: "User Error" });
    } else {
      res.json({ message: "User Signin Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about us page
router.get("/about", authenticate, (req, res) => {
  res.status(200).json(req.rootUser);
});

//Logout page
router.get("/logout", (req, res) => {
  console.log(`Hello my logout page`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;

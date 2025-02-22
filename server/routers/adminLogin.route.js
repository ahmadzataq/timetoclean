import express from "express";
import Users from "../models/user.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ADMIN LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            const payload = {
              id: user._id,
              email: user.email,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "7d",
            });

            return res.status(200).send({
              success: true,
              message: "Admin Berhasil Login!",
              token: "Bearer " + token,
              id: user._id,
            });
          } else {
            res.json({ message: "Password tidak cocok." });
          }
        });
      } else {
        res.json({ message: "Email tidak terdaftar." });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
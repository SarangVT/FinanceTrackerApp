import { pool } from "../libs/database.js";
import { comparePassword, hashPassword } from "../libs/index.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const userExist = await pool.query({
      text: `SELECT * FROM tbluser WHERE id = $1`,
      values: [userId],
    });
    const user = userExist.rows[0];
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found." });
    }
    user.password = undefined;

    return res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const userExist = await pool.query({
      text: `SELECT * FROM tbluser WHERE id = $1`,
      values: [userId],
    });

    const user = userExist.rows[0];

    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        status: "failed",
        message: "New Password and Confirm Password does not match.",
      });
    }

    const isMatch = await comparePassword(currentPassword, user?.password);

    if (!isMatch) {
      return res.status(401).json({ status: "failed", message: "Invalid current password." });
    }

    const hashedPassword = await hashPassword(newPassword);

    await pool.query({
      text: `UPDATE tbluser SET password = $1 WHERE id = $2`,
      values: [hashedPassword, userId],
    });

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed", message: "Some internal error occured" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { firstname, lastname, country, currency, contact } = req.body;

    const userExist = await pool.query({
      text: `SELECT * FROM tbluser WHERE id = $1`,
      values: [userId],
    });

    const user = userExist.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found." });
    }

    const updatedUser = await pool.query({
      text: `UPDATE tbluser SET name = $1, country = $2, currency = $3, contact = $4, updatedat = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`,
      values: [name, country, currency, contact, userId],
    });

    updatedUser.rows[0].password = undefined;

    return res.status(200).json({
      status: "success",
      message: "User information updated successfully",
      user: updatedUser.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

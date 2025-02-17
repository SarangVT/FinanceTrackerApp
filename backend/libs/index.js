import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashPassword = async (userValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userValue, salt);
  return hashedPassword;
};

export const comparePassword = async (userPassword, correctPassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, correctPassword);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};

export const createJWT = (id, username) => {
  return JWT.sign(
    { userId: id, username: username},
    process.env.SECRET_KEY,
    {expiresIn: "7d",}
  );
};

export function getMonthName(index) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[index];
}
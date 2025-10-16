import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const decodedData = jwt.verify(token, "sEcReT");
    req.userId = decodedData?.id;
    req.role = decodedData?.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, uname, role }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// 🎯 Role-based CRUD access control
exports.roleCheck = (resource) => {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!role) {
      return res.status(403).json({ message: "No role found." });
    }

    const permissions = {
      student: ["staff", "management"],
      staff: ["faculty", "management"],
      faculty: ["management"],
      management: ["management"],
    };

    const allowedRoles = permissions[resource.toLowerCase()];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(403).json({ message: "Access denied." });
    }

    next();
  };
};

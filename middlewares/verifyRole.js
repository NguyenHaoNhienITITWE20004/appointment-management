module.exports = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming role is attached to the req.user object
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      next();
    };
  };
  
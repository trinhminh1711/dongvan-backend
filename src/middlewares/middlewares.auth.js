const jwt = require('jsonwebtoken');

function auth(requiredRoles = null) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Hỗ trợ truyền 1 role hoặc nhiều role
      if (requiredRoles) {
        if (typeof requiredRoles === 'string') {
          requiredRoles = [requiredRoles];
        }
        if (!requiredRoles.includes(payload.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
      }

      req.user = payload; // { user_id, role, email }
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}


module.exports = auth;

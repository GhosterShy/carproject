import jwt from 'jsonwebtoken';

const JWT_SECRET = 'shyngys05';

const authenticateJWT = (req, res, next) => {
  const token = (req.headers.authorization?.startsWith('Bearer ') 
    ? req.headers.authorization.split(' ')[1] 
    : null);

  if (!token) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Недействительный или просроченный токен' });
  }
};

export default authenticateJWT;
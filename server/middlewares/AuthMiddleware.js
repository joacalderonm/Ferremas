import jwt from 'jsonwebtoken';

const JWT_SECRET = 'this-is-an-awesome-secret-key-tiene-que-ser-mas-largo';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

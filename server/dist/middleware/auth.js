import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-social-automation-saas-2026';
export function authenticateToken(req, res, next) {
    let token = req.cookies?.token;
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token missing' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

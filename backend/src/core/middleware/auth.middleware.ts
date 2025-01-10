import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../../utils/tokens';
import AppError from '../errors/app-error';
import { HTTP_STATUS } from '../../config';
import db from '../../database/connection';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let token;

    // 1) Vérification présence token
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in!', HTTP_STATUS.UNAUTHORIZED));
    }

    try {
        const decoded = await jwtVerify(token, process.env.JWT_SECRET!);

        // Vérifier expiration imminente
        if (decoded.exp) {
            const timeUntilExpiry = decoded.exp * 1000 - Date.now();
            const fiveMinutes = 5 * 60 * 1000;

            if (timeUntilExpiry <= 0) {
                return next(new AppError('Your session has expired', HTTP_STATUS.SESSION_EXPIRED));
            }

            if (timeUntilExpiry <= fiveMinutes) {
                res.setHeader('X-Auth-Warning', 'Token will expire soon');
                res.status(HTTP_STATUS.LOGIN_TIMEOUT);
            }
        }

        // Vérification existence utilisateur
        const currentUser = await db('users').where({ id: decoded.id }).first();
        if (!currentUser) {
            return next(new AppError('User no longer exists', HTTP_STATUS.UNAUTHORIZED));
        }

        // Vérification statut utilisateur
        if (!currentUser.active) {
            return next(new AppError('This account has been deactivated', HTTP_STATUS.FORBIDDEN));
        }

        currentUser.authenticated = true;
        req.user = currentUser;
        next();
    } catch (err) {
        return next(new AppError('Invalid token', HTTP_STATUS.UNAUTHORIZED));
    }
}
import { Request, Response, NextFunction } from "express";

export function verifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = req.auth

        if(role !== roleToVerify) {
            res.status(401).send({ message: "Unauthorized" })
            return
        }

        return next()
    }
}
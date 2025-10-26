import csrf from "csurf";
import type {
    Request,
    Response,
} from "express";

export const csrfProtection = csrf({ 
    cookie: true,
});

export const sendCsrfToken = (req: Request, res: Response) => {
    const token = req.csrfToken();
    res.status(200).json({ csrfToken: token });
};

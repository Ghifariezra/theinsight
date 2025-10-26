import type {
    Request,
    Response,
    NextFunction
} from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toLocaleDateString('id-ID', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta"
    });
    
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

    // Jika ingin log body untuk POST/PUT
    if (req.method !== "GET") {
        console.log("Body:", req.body);
    }

    next();
};

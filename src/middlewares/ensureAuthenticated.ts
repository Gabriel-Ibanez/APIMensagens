import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");
 
    try {
        const { sub } = verify(token, "47d7a1d06803aa56467a711a51a97ad3") as IPayLoad
                        
        // Recuperar informações do usuário
        request.user_id = sub;
        return next();
    }
        catch(err) {
            return response.status(401).json({"err":"Invalid token!!"});

        }
    


}
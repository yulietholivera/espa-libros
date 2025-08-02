// /webapps/espa-libros/backend/src/middlewares/logMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// La función ahora no se exporta directamente aquí.
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('-----------------------------');
  console.log(`[API REQUEST] Ruta: ${req.method} ${req.originalUrl}`);
  
  console.log('Headers:', JSON.stringify(req.headers, null, 2));

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  console.log('-----------------------------');
  next();
};

// Se exporta la función como el valor por defecto del módulo.
export default logMiddleware;

// /webapps/espa-libros/frontend/app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),           // ruta “/”
  route("/login", "routes/LoginPage.tsx"),       // ruta “/index”
  route("/checkout", "routes/CheckoutPage.tsx"), // ruta “/checkout”
  route("/detalle-libro", "routes/BookDetailPage.tsx"),
  route("/panel-crud", "routes/PanelCRUDPage.tsx"),
  route("/registrar", "routes/RegisterPage.tsx"),
  route("/carrito", "routes/CartPage.tsx"),
  // …más rutas según necesites
] satisfies RouteConfig;
// /webapps/espa-libros/frontend/app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),
  route("/login", "routes/LoginPage.tsx"),
  route("/checkout", "routes/CheckoutPage.tsx"),
  // 👇 CORRECCIÓN: Se añade `:id` para crear una ruta dinámica.
  route("/libros/:id", "routes/BookDetailPage.tsx"), 
  route("/panel-crud", "routes/PanelCRUDPage.tsx"),
  route("/registrar", "routes/RegisterPage.tsx"),
  route("/carrito", "routes/CartPage.tsx"),
] satisfies RouteConfig;

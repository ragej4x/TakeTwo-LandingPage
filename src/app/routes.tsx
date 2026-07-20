import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Auth } from "./pages/Auth";
import { Dropoff } from "./pages/Dropoff";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/store",
    Component: Store,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/orders",
    Component: Orders,
  },
  {
    path: "/login",
    Component: Auth,
  },
  {
    path: "/dropoff",
    Component: Dropoff,
  },
]);
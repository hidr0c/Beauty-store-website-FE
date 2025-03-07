import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/admin/pages/Dashboard/Dashboard";
import Products from "../modules/admin/pages/Products/Products";
import Inventories from "../modules/admin/pages/Inventories/Inventories";
import Categories from "../modules/admin/pages/Categories/Categories";
import Users from "../modules/admin/pages/Users/Users";
import Roles from "../modules/admin/pages/Roles/Roles";
import Permissions from "../modules/admin/pages/Permissions/Permissions";


export const adminRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />
    },
    {
        path: "users",
        element: <Users />
    },
    {
        path: "products",
        element: <Products />
    },
    {
        path: "inventories",
        element: <Inventories />
    },
    {
        path: "categories",
        element: <Categories />
    },
    {
        path: "roles",
        element: <Roles />
    },
    {
        path: 'permissions',
        element: <Permissions />
    }
]
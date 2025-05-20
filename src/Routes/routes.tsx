import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Admin from "../pages/Admin";
import Movie from "../layouts/Catalog/Movies";
import MovieForm from "../layouts/Forms/Movies";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hall from "../layouts/Catalog/Halls";
import HallForm from "../layouts/Forms/Hall";
import Seat from "../layouts/Catalog/Seats";
import SeatForm from "../layouts/Forms/Seats";
import Role from "../layouts/Catalog/Role";
import RoleForm from "../layouts/Forms/Role";
import MovieDetail from "../layouts/MovieDetail";

export const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {path: "/movie/detail/:id", element: <MovieDetail/>},
    {path: "/register", element: <Register/>},
    { path: "/home", element: <App /> },
    { path: "/admin", element: <Admin /> },
    { path: "/admin/movie", element: <Movie /> },
    { path: '/admin/movie/add', element: <MovieForm /> },
    { path: '/admin/movie/update/:id', element: <MovieForm /> },
    { path: '/admin/hall', element: <Hall/>},
    { path: '/admin/hall/add', element: <HallForm/>},
    { path: '/admin/hall/update/:id', element: <HallForm/>},
    { path: '/admin/seat', element: <Seat/> },
    {path: '/admin/seat/add', element: <SeatForm/>},
    { path: '/admin/seat/update/:id', element: <SeatForm/>},
    {path: '/admin/role', element: <Role/>},
    {path: '/admin/role/add', element: <RoleForm/>},
    {path: '/admin/role/update/:id', element: <RoleForm/>}




])
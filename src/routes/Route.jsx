//Layouts
import MainLayout from "../layouts/MainLayout";

//Pages
import Main from '../pages/Main';
import { Login, Register } from "../pages/LogRegis";


const publicRoute = [
    {path: '/', page: Main, layout: MainLayout},
    {path: '/login', page: Login, layout: MainLayout},
    {path: '/register', page: Register, layout: MainLayout}
]

export {publicRoute};
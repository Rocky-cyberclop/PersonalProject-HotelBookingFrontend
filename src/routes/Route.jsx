//Layouts
import MainLayout from "../layouts/MainLayout";

//Pages
import Main from '../pages/Main';
import { Login, Register } from "../pages/LogRegis";
import ChooseRoom from "../pages/ChooseRoom";


const publicRoute = [
    {path: '/', page: Main, layout: MainLayout},
    {path: '/login', page: Login, layout: MainLayout},
    {path: '/register', page: Register, layout: MainLayout},
    {path: '/chooseRoom', page: ChooseRoom, layout: MainLayout}
]

export {publicRoute};
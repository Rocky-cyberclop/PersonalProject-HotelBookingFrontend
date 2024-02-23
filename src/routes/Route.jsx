//Layouts
import MainLayout from "../layouts/MainLayout";

//Pages
import Main from '../pages/Main';
import { Login, Register } from "../pages/LogRegis";
import ChooseRoom from "../pages/ChooseRoom";
import FillInfo from "../pages/FillInfo";


const publicRoute = [
    {path: '/', page: Main, layout: MainLayout},
    {path: '/login', page: Login, layout: MainLayout},
    {path: '/register', page: Register, layout: MainLayout},
    {path: '/fillInfo', page: FillInfo, layout: MainLayout},
    {path: '/chooseRoom', page: ChooseRoom, layout: MainLayout}
]

export {publicRoute};
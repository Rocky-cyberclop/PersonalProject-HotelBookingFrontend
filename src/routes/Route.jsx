//Layouts
import MainLayout from "../layouts/MainLayout";

//Pages
import Main from '../pages/Main';
import { Login, Register } from "../pages/LogRegis";
import ChooseRoom from "../pages/ChooseRoom";
import FillInfo from "../pages/FillInfo";
import FindReservation from "../pages/FindReservation";
import Profile from "../pages/Profile";
import Forget from "../pages/Forget";


const publicRoute = [
    { path: '/', page: Main, layout: MainLayout },
    { path: '/forget', page: Forget, layout: MainLayout },
    { path: '/login', page: Login, layout: MainLayout },
    { path: '/register', page: Register, layout: MainLayout },
    { path: '/fillInfo', page: FillInfo, layout: MainLayout },
    { path: '/chooseRoom', page: ChooseRoom, layout: MainLayout },
    { path: '/findReservation', page: FindReservation, layout: MainLayout }
]

const privateRoute = [
    { path: '/profile', page: Profile, layout: MainLayout },
]

export { publicRoute, privateRoute };
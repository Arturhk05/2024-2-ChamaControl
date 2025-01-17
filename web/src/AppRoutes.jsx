import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider";
import Loading from "./layout/Loading";

const Home = lazy(() => import("./pages/Home/Home"));
const Maps = lazy(() => import("./pages/Maps/Maps"));
const Alert = lazy(() => import("./pages/Alert/Alert"));
const About = lazy(() => import("./pages/About/About"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

function AppRoutes() {
    return (
        <AuthProvider>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/alert" element={<Alert />} /> 
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default AppRoutes;

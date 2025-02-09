import ProtectedRoute from "../components/AllRoute/ProtectedRoute";
import Chat from "../pages/Chat/main";
import Home from "../pages/Home/main";
import Login from "../pages/Login/main";
import Signup from "../pages/Signup/main";

export const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        path: "chat",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Chat/>
            }
        ]
    }
]

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
   {
    path: "/Login",
    element: <Login />
  },
   {
    path: "/signUp",
    element: <SignUp />
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>  
    </div>
  );
}

export default App;
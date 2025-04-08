import router from "Frontend/routes.js";
import { RouterProvider } from "react-router";
import { AuthContext, useAuth } from "./utils/useAuth.js";

export default function App() {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

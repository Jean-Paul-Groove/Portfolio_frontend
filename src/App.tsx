import "./App.css";
import Main from "./components/main/main";
import Connexion from "./components/connexion/connexion";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const routes = createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="admin" element={<Connexion />}></Route>
    </Route>
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;

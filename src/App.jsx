import { Outlet } from "react-router-dom";
import { Header } from "components/Header/Header";

export function App() {
  return (
    <div>
      <Header></Header>
      <Outlet />
    </div>
  );
}

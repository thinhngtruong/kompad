import { Outlet } from "react-router-dom";
import Autoupdate from "../Autoupdate";
import Sidebar from "../../containers/Sidebar";
import Shortcut from "../Shortcut/Shortcut";
import ConfirmRelaunch from "../ConfirmRelaunch";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Shortcut />
      <Autoupdate />
      <ConfirmRelaunch />
    </>
  );
}

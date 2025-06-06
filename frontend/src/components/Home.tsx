import { Outlet } from "react-router";
import NavBar from "./NavBar";
import SideBar from "../features/SideBar";
import type { JSX } from "react";

const Home = (): JSX.Element => {
  return (
    <>
      <NavBar expand="lg" />
      <SideBar />
      <Outlet />
    </>
  );
};

export default Home;

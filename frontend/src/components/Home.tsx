import type { JSX } from "react";
import NavBar from "./NavBar";
import SideBar from "../features/SideBar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

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

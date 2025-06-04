import type { JSX } from "react";
import NavBar from "./NavBar";
import SideBar from "../features/SideBar";

const Home = (): JSX.Element => {
  return (
    <>
      <NavBar expand="lg" />
      <SideBar />
    </>
  );
};

export default Home;

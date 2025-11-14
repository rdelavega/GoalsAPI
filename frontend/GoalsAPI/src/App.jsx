import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GoalsTable from "./components/GoalsTable";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <GoalsTable />
    </>
  );
}

export default App;

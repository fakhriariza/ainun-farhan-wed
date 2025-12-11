import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home";
import QuranVerseCard from "./QuranVerseCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <QuranVerseCard />
    </>
  );
}

export default App;

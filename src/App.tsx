// import logo from "./logo.png";
import { Timer } from "./components/Timer";

function App() {
  return (
    <>
      <header>
        <nav>
          <a href="/" className="logo">
            {/* <img src={logo} alt="Site logo" /> */}
            Pomoloco
          </a>
        </nav>
      </header>

      <main>
        <Timer />
      </main>
    </>
  );
}

export default App;

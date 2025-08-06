import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
// import useSecurityGuard from "./hooks/useSecurityGuard";
// import useFbGuard from "./hooks/useFbGuard";
import "./App.scss";

function App() {
  // useSecurityGuard();
  // useFbGuard();

  return (
    <div className="app-wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

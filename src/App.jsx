import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
// import useSecurityGuard from "./hooks/useSecurityGuard";
import "./App.scss";

function App() {
  // useSecurityGuard();

  return (
    <div className="app-wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

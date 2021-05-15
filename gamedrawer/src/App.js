import { Routes, Route, Link} from "react-router-dom";
import Library from "./pages/Library";

function NavBar(){
  return(
    <header>
        <nav className="nav navbar navbar-expand-md bg-nav " >
            <div className="container">

                <div className="w-100 d-flex flex-row justify-content-between">


                    <div className="nav-brand">
                        <img className="brand-logo" src="img/Logo.png" alt=""/>
                    </div>

                    <ul className="navbar-nav d-flex flex-row align-items-center">
                        <Link className="nav-link" to="/">
                            <li className="nav-item p-2 fw-bold text-dark">
                                Home
                            </li>
                        </Link>
                        <Link className="nav-link" to="/library">
                            <li className="nav-item p-2 fw-bold text-dark">
                                Library
                            </li>
                        </Link>
                    </ul>

                </div>

            </div>
        </nav>
    </header>
  );
}

function Banner(){
  return(
    <div className="banner w-100">
            <div>

            </div>

        </div>
  );
}

function Home(){
  return(
    <div className="container-fluid p-0">
      <Banner></Banner>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;

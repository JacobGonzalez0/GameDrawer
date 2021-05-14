import './App.css';

function NavBar(){
  return(
    <header>
        <nav class="nav navbar navbar-expand-md bg-nav w-100 position-fixed" >
            <div class="container">

                <div class="w-100 d-flex flex-row justify-content-between">


                    <div class="nav-brand">
                        <img class="brand-logo" src="img/Logo.png" alt=""/>
                    </div>

                    <ul class="navbar-nav d-flex flex-row align-items-center">
                        <a class="nav-link" href="#">
                            <li class="nav-item p-2 fw-bold text-dark">
                                Home
                            </li>
                        </a>
                    </ul>

                </div>

            </div>
        </nav>
    </header>
  );
}

function Banner(){
  return(
    <div class="banner w-100">
            <div>

            </div>

        </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div class="container-fluid p-0">
        <div class="spacer">
        </div>
        <Banner></Banner>
      </div>
    </div>
  );
}

export default App;

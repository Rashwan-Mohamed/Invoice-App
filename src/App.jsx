import { Outlet } from "react-router";
import AppContext from "./context";

function App() {
  return (
    <>
      <AppContext>
        <div className="wrapper">
          <aside>
            <div className="asidesa">
              <div className="logoWrapper">
                <img
                  className="logos"
                  src={"/images/logo.svg"}
                  alt="logo image"
                />
              </div>
              <button>
                <img src={"/images/icon-sun.svg"} alt="" />
              </button>
            </div>
            <button className="mine">
              <img src={"/images/Rash.png"} alt="" />
            </button>
          </aside>
          <Outlet></Outlet>
        </div>
      </AppContext>
    </>
  );
}

export default App;

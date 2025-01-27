import { Outlet } from "react-router";
import AppContext from "./context";
import Aside from "./components/Aside";

function App() {
  return (
    <>
      <AppContext>
        <div className="wrapper">
          <Aside></Aside>
          <Outlet></Outlet>
        </div>
      </AppContext>
    </>
  );
}

export default App;

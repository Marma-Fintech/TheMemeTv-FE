import logo from "./logo.svg";
import "./App.css";
import Thememe from "./Pages/Thememe";
import { UserInfoProvider } from "../src/Providers/theData";

function App() {
  return (
    <UserInfoProvider>
      <Thememe />
    </UserInfoProvider>
  );
}

export default App;



import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./components/actions/user";
import Popup from "./components/disk/popup/Popup";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./router/AppRouter";
import './styles/global.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <div className="app">
      <Navbar />
      <AppRouter />
      <Popup />
    </div>
  );
}

export default App;

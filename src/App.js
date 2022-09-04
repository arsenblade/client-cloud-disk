import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./components/actions/user";
import Popup from "./components/disk/popup/Popup";
import Navbar from "./components/navbar/Navbar";
import Uploader from "./components/uploader/Uploader";
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
      <Uploader />
    </div>
  );
}

export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./components/actions/user";
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
    </div>
  );
}

export default App;

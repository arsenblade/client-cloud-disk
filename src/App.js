import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./components/actions/user";
import Popup from "./components/disk/popup/Popup";
import Navbar from "./components/navbar/Navbar";
import Uploader from "./components/uploader/Uploader";
import AppRouter from "./router/AppRouter";
import './styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import './styles/react-select.scss'
import MyToastContainer from "./ui/MyToast/MyToastContainer";

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)


  useEffect(() => {
    dispatch(auth())
  }, [])

  if(isLoading) {
    return (
      <div className="app">
      </div>
    )
  }
  

  return (
    <div className="app">
      <Navbar />
      <AppRouter />
      <Popup />
      <Uploader />
      <MyToastContainer />
    </div>
  );
}

export default App;

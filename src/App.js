import Navbar from "./components/navbar/Navbar";
import AppRouter from "./router/AppRouter";
import './styles/global.scss'

function App() {
  return (
    <div className="app">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;

import "./styles/App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  function handleNavigate (){
    navigate('/login')
  }
  function navigateToRegisterPage () {
    navigate('/register')
  }
  return (
    <div className="w-screen h-screen flex items-center flex-col justify-center text-black gap-3">
      <button
        type="submit"
        className="w-36 h-12 border-white border-2 text-md font-medium rounded-xl Btn"
        onClick={handleNavigate}
      >
       sign In
      </button>
      <button
        type="submit"
        className="w-36 h-12 border-white border-2 text-md font-medium rounded-xl Btn"
        onClick={navigateToRegisterPage}
      >
        Sign Up
      </button>
    </div>
  );
}

export default App;

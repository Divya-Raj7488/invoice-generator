import "./styles/App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  function handleNavigate (){
    navigate('/login')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center text-black">
      <button
        type="submit"
        className="w-36 h-12 border-white border-2 text-md font-medium rounded-xl Btn"
        onClick={handleNavigate}
      >
        Go to login page
      </button>
    </div>
  );
}

export default App;

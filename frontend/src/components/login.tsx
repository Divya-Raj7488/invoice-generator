import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("");
  const [Password, setpassword] = useState("");

  const handleClick = () => {
    navigate("/add-product")
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-80 h-96 flex flex-col justify-center items-center rounded-3xl gap-3 loginForm">
        <input
          type="email"
          placeholder="Enter your email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-9/12 h-10 px-2 border"
        />
        <input
          type="email"
          placeholder="Enter your password"
          value={Password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          className="w-9/12 h-10 px-2 focus:border-2 focus:border-white"
        />

        <button
          className="w-9/12 h-10 px-2 focus:border-2 focus:border-none rounded-lg Btn text-black font-semibold"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default LoginForm;

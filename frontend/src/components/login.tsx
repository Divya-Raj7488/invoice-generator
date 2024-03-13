import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const Data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios({
        method: "POST",
        data: Data,
        url: "http://localhost:3000/user/login",
        withCredentials: true,
      });
      if (response) {
        navigate("/add-product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-80 h-96 flex flex-col justify-center items-center rounded-3xl gap-3 loginForm">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-9/12 h-10 px-2 border"
        />
        <input
          type="email"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
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

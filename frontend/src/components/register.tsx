import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = async () => {
    if (password !== confirmPassword) {
      return console.log("check your password");
    }
    const Data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios({
        method: "POST",
        data: Data,
        url: "http://localhost:3000/user/register",
        withCredentials: true,
      });
      if(response){
        navigate('/login')
      }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-80 h-96 flex flex-col justify-center items-center rounded-3xl gap-3 loginForm">
        <input
          type="email"
          placeholder="Enter your email"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-9/12 h-10 px-2 border"
        />
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
        <input
          type="email"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="w-9/12 h-10 px-2 focus:border-2 focus:border-white"
        />

        <button
          className="w-9/12 h-10 px-2 focus:border-2 focus:border-none rounded-lg Btn text-black font-semibold"
          onClick={handleClick}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};
export default RegisterForm;

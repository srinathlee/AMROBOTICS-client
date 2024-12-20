import React from "react";
import "./Login.css";
import Logo from "../assets/imgg.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { forgotpass } from "../../helper";

function LoginPage() {
  const navigate = useNavigate();
  // const dispatch=useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const login = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:5080/api/v1/login", {
        email,
        password,
      });
    console.log(response.data.error)

      const jwtToken = response.data.jwtToken;
      //  dispatch(storeUser(jwtToken))
      localStorage.setItem("jwtToken", jwtToken);
      toast.success("login successful");
      navigate("/");


    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  const forgotPass = async () => {
    if (email == "") {
      alert("enter email to reset your password");
      return;
    }
    setloading(true);
    const response = await forgotpass(email);
    console.log(response);

    if (response.status == 201) {
      console.log("navigate then---")
      setloading(false);
      navigate("/forgotpassword");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="h-dvh  flex flex-col justify-center items-center gap-3">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#ff8c00"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>please wait sending reset mail to your mail account....</p>
        </div>
      ) : (
        <div className="overflow-hidden overscroll-x-none">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div
            className="flex flex-row-reverse h-[100dvh] overflow-hidden "
            id="main"
          >
            <div
              className="w-[40%] h-full z-10 text-white flex-col flex  px-[8rem] py-[10rem] bg-[#434142] "
              id="pad"
            >
              <div className="fixed bottom-[92vh] right-0 w-[30rem] h-[30rem] border-8 border-orange-500 rounded-full overflow-hidden"></div>
              <div className="fixed top-[92vh] right-[20%] w-[50rem] h-[50rem] border-t-8 border-r-white border-t-orange-500 rounded-full overflow-hidden z-2"></div>
              <h1 className="text-6xl  flex  font-bold" id="titleee">
                Welcome to <br />
                AM ROBOTICS
              </h1>
              <br />
              <br />
              <p className="text-3xl w-[80%]" id="wid">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt accusantium ad temporibus odio debitis impedit
                consectetur quam eius fuga tempora.
              </p>

              <div className="mt-[20rem]" id="space">
                <span className="text-3xl" id="stars">
                  ⭐⭐⭐⭐⭐
                </span>
                <h2 className="w-[80%] text-3xl" id="wid">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus culpa, hic id praesentium, repellat optio laboriosam
                  dolore facere dolor recusandae perspiciatis, amet aperiam!
                  Corporis, sint.
                </h2>
              </div>
              <div className="mt-12 rounded-md flex flex-col">
                <div className="flex flex-row items-center">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    className="w-14 h-14 rounded-full"
                    id="imgg"
                  />
                  <div className="flex flex-col">
                    <h1 className=" px-4 text-white text-3xl" id="imgg-title">
                      Devon Lane
                    </h1>
                    <h1 className=" px-4 text-white text-xl" id="imgg-cont">
                      Co-Founder,Crodinger
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[50%] py-[10rem] px-[12rem] overflow-hidden z-10 bg-white"
              id="form-space"
            >
              <img
                src={Logo}
                alt="Logo"
                className="h-[180px] w-auto"
                id="form-img"
              />

              <form
                onSubmit={login}
                action=""
                className="flex gap-5 flex-col justify-start mt-4"
                id="gappp"
              >
                <p className="text-4xl w-[65%] text-black " id="form-head">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  minima enim facilis ipsa quibusdam alias.
                </p>

                <label className="text-3xl text-black " id="labell">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(e.target.value);
                  }}
                  id="email"
                  className="w-[50%] rounded bg-white border-2 border-black text-3xl leading-[3rem]"
                />

                <div className="flex flex-row w-[50%] justify-between items-center">
                  <label className="text-3xl text-black " id="labell">
                    Password:
                  </label>
                  <a
                    onClick={forgotPass}
                    className="text-sm underline hover:text-blue-500 hover:cursor-pointer text-black "
                  >
                    Forgot Password
                  </a>
                </div>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  name="password"
                  className="w-[50%] rounded bg-white border-2 border-zinc-800 text-3xl leading-[3rem]"
                />

            <br />
            
            <button
              style={{ width: "200px",backgroundColor:'#F2751F'}}
              onClick={login}
              className="text-white text-3xl rounded-xl leading-[4rem] py-1.5"
              id="button"
            >
              Sign In
            </button>
          </form>
          <br />
          <br />
          <p className="text-3xl text-black " id="labell">
            didn't have an account?{" "}
            <a href="/signup" className="link leading-10 mb-2">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className="container ">
        <div className="card">
          <a className="singup">Sign Up</a>
          <img src={Logo} alt="" className="h-[130px] w-[200px]" />
          <p className="px-[4rem] text-center text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            minima enim facilis ipsa quibusdam alias.
          </p>
          <div className="inputBox1">
            <input type="text" required="required"  onChange={(e)=>{
                setEmail(e.target.value);
              }} />
            <span className="user">Email</span>
          </div>

              <div className="inputBox">
                <input
                  type="password"
                  required="required"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <span>Password</span>
              </div>

              <button className="enter" onClick={login}>
                Enter
              </button>
              <p className="text-black">
                Didn't have an account?{" "}
                <a href="#" className="link leading-10 mb-2">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;

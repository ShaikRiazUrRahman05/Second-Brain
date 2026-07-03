// import { useRef } from "react";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export function Signin() {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   const signin = async () => {
//     // use Refs
//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     // send this(username and pass) to backend
//     const response = await axios.post(`${BACKEND_URL}/signin`, {
//       username,
//       password,
//     });

//     const jwt = response.data.token;
//     localStorage.setItem("token", jwt);
//     navigate("/dashboard");
//     //redirect user to dashboard

//     // alert("You Have Signed Up!");
//   };
//   return (
//     <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
//       <div className="bg-white rounded-xl border min-w-48 p-8 ">
//         <Input ref={usernameRef} placeholder="Username" />
//         <Input ref={passwordRef} placeholder="Password" />
//         <div className="flex justify-center pt-4">
//           <Button
//             onClick={signin}
//             loading={false}
//             variant="primary"
//             text="SignIn"
//             fullWidth={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaYoutube, FaXTwitter, FaLink, FaPen } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/signin`, {
      username,
      password,
    });

    const jwt = response.data.token;

    localStorage.setItem("token", jwt);

    navigate("/dashboard");
  };

  return (
    <div
      className="
      min-h-screen
      w-screen
      bg-gradient-to-br
      from-purple-700
      via-indigo-600
      to-blue-500
      flex
      items-center
      justify-center
      gap-20
      p-10
      "
    >
      {/* LEFT SIDE */}

      <div
        className="
      hidden
      md:block
      w-[450px]
      "
      >
        <h1
          className="
        text-5xl
        font-bold
        text-white
        "
        >
          🧠 Second Brain
        </h1>

        <p
          className="
        text-white
        text-xl
        mt-5
        "
        >
          Your personal knowledge vault. Save everything you discover.
        </p>

        <div className="mt-8 space-y-4">
          <div
            className="
          bg-white/20
          backdrop-blur
          rounded-xl
          p-4
          text-white
          "
          >
            <FaYoutube className="text-red-500 text-3xl inline mr-3" />

            <b>YouTube Videos</b>
            <p className="text-sm mt-1">
              Save tutorials, courses and playlists
            </p>
          </div>

          <div
            className="
          bg-white/20
          backdrop-blur
          rounded-xl
          p-4
          text-white
          "
          >
            <FaXTwitter className="text-black text-3xl inline mr-3" />

            <b>Twitter / X Threads</b>
            <p className="text-sm mt-1">Store valuable ideas and discussions</p>
          </div>

          <div
            className="
          bg-white/20
          backdrop-blur
          rounded-xl
          p-4
          text-white
          "
          >
            <FaLink className="text-blue-500 text-3xl inline mr-3" />

            <b>Useful Links</b>
            <p className="text-sm mt-1">Keep articles and resources</p>
          </div>

          <div
            className="
          bg-white/20
          backdrop-blur
          rounded-xl
          p-4
          text-white
          "
          >
            <FaPen className="text-purple-500 text-3xl inline mr-3" />

            <b>Quick Notes</b>
            <p className="text-sm mt-1">Capture thoughts instantly</p>
          </div>
        </div>
      </div>

      {/* SIGN IN CARD */}

      <div
        className="
      bg-white
      rounded-3xl
      shadow-2xl
      p-10
      w-[400px]
      "
      >
        <h2
          className="
        text-3xl
        font-bold
        text-gray-800
        mb-2
        "
        >
          Welcome Back 👋
        </h2>

        <p
          className="
        text-gray-500
        mb-6
        "
        >
          Login to access your brain
        </p>

        <div className="space-y-4">
          <Input ref={usernameRef} placeholder="Username" />

          <div className="relative">
            <Input
              ref={passwordRef}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="Sign In"
            fullWidth={true}
          />
        </div>

        <p
          className="
        text-center
        text-gray-500
        mt-6
        "
        >
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="
          text-purple-600
          cursor-pointer
          ml-2
          font-semibold
          "
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

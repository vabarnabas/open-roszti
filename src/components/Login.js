import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { HiIdentification, HiX, HiLogin, HiUserAdd } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = ({ setResponseData, auth, user }) => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showUserAdd, setShowUserAdd] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [userName, setUserName] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${code}?range=2021-2022%20tavasz%20events`
    )
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          setResponseData(result);
        } else {
          throw new Error("Hibás kód, próbáld újra!");
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString());
        setLoading(false);
        setCode("");
      });
  };

  const onAdminLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then(() => {
        setShowLogin(false);
        setMail("");
        setPassword("");
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error.code);
        (() => {
          switch (error.code) {
            case "auth/invalid-email":
              return setErrorMessage("Hibás vagy ismeretlen e-mail cím!");
            case "auth/internal-error":
              return setErrorMessage("Hibás vagy hiányzó adatok!");
            case "auth/wrong-password":
              return setErrorMessage("Hibás jelszó!");
            case "auth/too-many-requests":
              return setErrorMessage("Túl sok próbálkozás");
            case "auth/user-not-found":
              return setErrorMessage("Ismeretlen felhasználó!");
            default:
              setErrorMessage("");
          }
        })();
      });
  };

  const onUserAdd = async (e) => {
    e.preventDefault();
    await fetch(
      `https://us-central1-open-roszti.cloudfunctions.net/app/users/add?name=${userName}&mail=${userMail}`,
      {
        method: "POST",
      }
    ).then(() => {
      setUserMail("");
      setUserName("");
    });
  };

  return (
    <div className="h-full w-full flex items-center justify-center select-none">
      {loading ? (
        <div className="">
          <AiOutlineLoading3Quarters className="text-slate-600 animate-spin text-5xl" />
        </div>
      ) : (
        <div className="">
          <div className="fixed right-6 md:right-4 top-4 items-center justify-center space-x-2 hidden md:flex">
            <div className="relative">
              {user ? (
                <HiUserAdd
                  onClick={(e) => {
                    setShowUserAdd(!showUserAdd);
                  }}
                  className="text-slate-600 hover:text-slate-700 text-xl cursor-pointer"
                />
              ) : (
                ""
              )}
              {showUserAdd ? (
                <form
                  onSubmit={onUserAdd}
                  className="absolute top-[115%] right-0 px-6 py-8 w-max rounded-lg text-slate-600 bg-slate-100 ring-1 ring-slate-300"
                >
                  <p className="mb-0.5 text-xs pl-1 font-bold">Név</p>
                  <input
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Név"
                    type="text"
                    className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm`}
                  />
                  <p className="mt-3 text-xs pl-1 font-bold">E-mail</p>
                  <input
                    required
                    value={userMail}
                    onChange={(e) => setUserMail(e.target.value)}
                    placeholder="E-mail"
                    type="email"
                    className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm`}
                  />
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1 rounded-lg mt-3">
                    Tovább
                  </button>
                </form>
              ) : (
                ""
              )}
            </div>
            {user ? (
              <HiLogin
                onClick={() => signOut(auth)}
                className="text-slate-600 hover:text-slate-700 text-xl cursor-pointer"
              />
            ) : (
              <HiIdentification
                onClick={() => setShowLogin(true)}
                className=" text-slate-600 hover:text-slate-700 text-xl cursor-pointer"
              />
            )}
          </div>
          {showLogin ? (
            <div className="fixed top-0 left-0 bg-slate-500 bg-opacity-60 w-full h-full z-10 flex items-center justify-center">
              <form
                onSubmit={onAdminLogin}
                action=""
                className="relative text-slate-600 bg-slate-100 px-6 py-8 rounded-lg"
              >
                <HiX
                  onClick={() => setShowLogin(false)}
                  className="absolute right-2 top-2 cursor-pointer text-slate-600 hover:text-slate-700 "
                />
                <p className="flex items-end justify-center text-3xl font-bold mb-6">
                  Bejelentkezés
                </p>
                <p className="mb-0.5 text-xs pl-1 font-bold">Admin E-mail</p>
                <input
                  required
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Admin E-mail"
                  type="email"
                  className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm ${
                    errorMessage !== "" && code === ""
                      ? "ring-1 ring-pink-500 text-pink-500"
                      : ""
                  }`}
                />
                {errorMessage !== "" && code === "" ? (
                  <p className="text-pink-500 mt-0.5 text-xs pl-3">
                    {errorMessage}
                  </p>
                ) : (
                  ""
                )}
                <p className="mt-3 mb-0.5 text-xs pl-1 font-bold">Jelszó</p>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Jelszó"
                  type="password"
                  className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm`}
                />
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1 rounded-lg mt-3">
                  Tovább
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={onLogin} action="" className="text-slate-600">
            <p className="flex items-end justify-center text-4xl font-bold mb-6">
              openRÖszTI<span className="text-base text-emerald-500">v6</span>
            </p>
            <div className="">
              <p className="mb-0.5 text-xs pl-1 font-bold">RÖszTI Kód</p>
              <input
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="RÖszTI Kód"
                type="text"
                className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm ${
                  errorMessage !== "" && code === ""
                    ? "ring-1 ring-pink-500 text-pink-500"
                    : ""
                }`}
              />
              {errorMessage !== "" && code === "" ? (
                <p className="text-pink-500 mt-0.5 text-xs pl-3">
                  {errorMessage}
                </p>
              ) : (
                ""
              )}
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1 rounded-lg mt-2">
              Tovább
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

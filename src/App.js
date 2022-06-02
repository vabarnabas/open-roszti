import { useState } from "react";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Login from "./components/Login";
import Main from "./components/Main";

const firebaseConfig = {
  apiKey: "AIzaSyA1tnwNEQ9ik4zHnNkywX-zaE5D8alZCpI",
  authDomain: "open-roszti.firebaseapp.com",
  projectId: "open-roszti",
  storageBucket: "open-roszti.appspot.com",
  messagingSenderId: "539286569431",
  appId: "1:539286569431:web:ba9d1f4cb6594db52ecb92",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);

  const [responseData, setResponseData] = useState([]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100 select-none">
      {responseData.length > 0 ? (
        ""
      ) : (
        <Login
          user={user}
          auth={auth}
          setResponseData={(e) => setResponseData(e)}
        />
      )}
      {responseData.length > 0 ? <Main responseData={responseData} /> : ""}
      <p className="absolute bottom-2 text-xs">
        Bármilyen kérdés esetén írj a{" "}
        <span className="text-emerald-500 font-bold">
          jazmin.varga@estiem.org
        </span>{" "}
        címre!
      </p>
    </div>
  );
}

export default App;

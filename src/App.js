import { useState } from 'react';
import Login from "./components/Login";
import Main from './components/Main';


function App() {
  const [responseData, setResponseData] = useState([]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      {responseData.length > 0 ? '' : <Login setResponseData={(e) => setResponseData(e)} />}
      {responseData.length > 0 ? <Main responseData={responseData} /> : ''}
    </div>
  );
}

export default App;

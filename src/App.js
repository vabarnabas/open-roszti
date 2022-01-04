import { useState } from 'react';
import Login from "./components/Login";
import Main from './components/Main';


function App() {
  const [responseData, setResponseData] = useState([]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100 select-none">
      {responseData.length > 0 ? '' : <Login setResponseData={(e) => setResponseData(e)} />}
      {responseData.length > 0 ? <Main responseData={responseData} /> : ''}
      <p className="absolute bottom-2 text-xs">Bármilyen kérdés esetén írj a <span className='text-emerald-500 font-bold'>jazmin.varga@estiem.org</span> címre!</p>
    </div>
  );
}

export default App;

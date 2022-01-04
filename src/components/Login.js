import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Login = ({ setResponseData }) => {

  const [code,setCode] = useState('');
  const [loading,setLoading] = useState(false);

  const onLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      await fetch(`https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${code}?range=2021-2022%20%C5%91sz%20events`)
      .then(res => res.json())
      .then(data => {
        setResponseData(data);
      });
  }

  return (
    <div className="h-full w-full flex items-center justify-center select-none">
      {loading ? 
      <div className="">
        <AiOutlineLoading3Quarters className='text-slate-600 animate-spin text-5xl' />
      </div> :
      <form onSubmit={onLogin} action="" className="text-slate-600">
        <p className="flex items-end justify-center text-4xl font-bold mb-6">openRÖszTI<span className="text-base text-emerald-500">v6</span></p>
        <div className="mb-3">
          <p className="mb-0.5 text-xs pl-3 font-bold">RÖszTI Kód</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} required placeholder="RÖszTI Kód" type="text" className="w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm" />
        </div>
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1 rounded-lg mb-1">Tovább</button>
      </form>}
    </div>
  )
}

export default Login

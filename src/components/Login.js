import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Login = ({ setResponseData }) => {

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      await fetch(`https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${code}?range=2021-2022%20%C5%91sz%20events`)
      .then(async res => {
        if (res.ok) {
          const result = await res.json();
          setResponseData(result)
        } else {
          throw new Error('Hibás kód, próbáld újra!');
        }
      })
      .catch(error => {
        setErrorMessage(error);
        setLoading(false);
        setCode('');
      })
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
          <input value={code} onChange={(e) => setCode(e.target.value)} required placeholder="RÖszTI Kód" type="text" className={`w-full bg-slate-200 rounded-lg outline-none px-3 py-1 placeholder:text-sm ${errorMessage !== '' && code === '' ? 'ring-1 ring-pink-500 text-pink-500' : ''}`} />
          {errorMessage !== '' && code === '' ?
            <p className="text-pink-500 mt-0.5 text-xs pl-3">{errorMessage.toString()}</p> : ''
          }
        </div>
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1 rounded-lg mb-1">Tovább</button>
      </form>}
    </div>
  )
}

export default Login

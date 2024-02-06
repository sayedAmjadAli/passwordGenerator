import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {


  const [length,setLength]=useState(15)
  const [charAllowed,setCharAllowed]=useState(false)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [password,setPassword]=useState('')
  const passwordRef=useRef()
   const passwordGenerator=useCallback(()=>{
             let pass=''
             let str='ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz'

             if(numberAllowed) str+='0123456789'
             if(charAllowed) str+='~!@#$%^&*[]{}'

             for(let i=1; i<=length; i++){
              let char=Math.floor((Math.random()) *  str.length+1)
             
              pass += str.charAt(char)
             }
             setPassword(pass)
   },[length,numberAllowed,charAllowed])

   useEffect(()=>{
    passwordGenerator()
   },[length,charAllowed,numberAllowed])

const copyPasswordClip=useCallback(()=>{
   passwordRef.current?.select()
   password.current?.setSelectionRange(0,100)
   window.navigator.clipboard.writeText(password)
},[password])
  return (
  <div className='w-full max-w-xl mx-auto my-8 bg-gray-600 p-5 h-40  rounded-sm text-white'>
    <h1 className='text-center text-2xl mb-2'>Password Generator</h1>
    <div className='w-full flex'>
      <input type="text" value={password} ref={passwordRef} className='p-2 rounded-sm w-full text-black'  readOnly/>
      <button className='p-2 bg-blue-600 rounded-sm' onClick={copyPasswordClip}>Copy</button>
    </div>
   <div className='flex gap-3 mt-2'>
   <div className='flex gap-2'>
      <input type="range" min={15} max={100} onChange={(e)=>setLength(e.target.value)} id="" />
      <label htmlFor="length" id='length'>length :{length} </label>
    </div>


     <div className='flex gap-2'>
      <input type="checkbox"  defaultChecked={numberAllowed} onClick={()=>{setNumberAllowed((prevState)=>!prevState)}}/>
      <label htmlFor="length" id='length'>Number  </label>
    </div>   
 
    <div className='flex gap-2'>
      <input type="checkbox"  defaultChecked={charAllowed} onClick={()=>{setCharAllowed((prevState)=>!prevState)}}/>
      <label htmlFor="length" id='length'>Charector  </label>
    </div>   

   </div>

  </div>
  )
}

export default App

import { useState,useCallback, useRef } from "react"


function App(){
  const [passwordArray, setPassword]=useState("");
  const[length, setLength] = useState(8);
  const[characIncl , setCharacIncl] = useState(false);
  const[numIncl , setNumIncl]=useState(false);


  //call back ko syntax: useCallback(function, [dependencies]) ______ what ever the function depends on are the dependencies
  //eta when length, num or charac is included the password is set to change so these 4 are our dependencies here
  const passwordChanger = useCallback(()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //random string pick garnalai
    
    if(numIncl)                         //number include garnu cha bhane
    {
      str += "0123456789";             //concat string with numbers
    }
    if(characIncl)                     //characters include garnucha bhane
    {
      str +="!@#$%^&*()-_=+[{]};:'<.>/?|`~";          //concat charac with str
    }

    for(let i =1;i<= length;i++)                
    {
      let position = Math.floor((Math.random() * str.length)+1); //this returns a random digit * str ko length + 1
      pass = pass + str.charAt(position);                             //pass bhanne variable chai will be filled with random strings picked from str
    }
    setPassword(pass);                                        //password ma pass ko value pass gara bhaneko
  } ,[length,characIncl,numIncl,setPassword]);


  //copy garna lai function
const passwordCopy = useCallback(()=>{
  window.navigator.clipboard.writeText(passwordArray);
},[passwordArray])

const popupRef = useRef(null);
const backgrndRef = useRef(null);
const popupshow = ()=>{
  if(popupRef.current && backgrndRef.current){
  setTimeout(()=>{
    popupRef.current.classList.add("active");
    backgrndRef.current.classList.add("active");
  },100);

  setTimeout(()=>{
    popupRef.current.classList.remove("active");
    backgrndRef.current.classList.remove("active");

  },1000);
}
}
  return(
    <div className="bg-pink-200 w-full h-screen">
    <h1 style={{color:'#b8b8ff'}}  className="rubik-distressed-regular text-6xl relative  place-self-center">Password Generator</h1>
    <div className="mt-20 place-self-center w-5xl h-50 bg-blue-300 rounded-4xl">
      <div className="flex flex-row gap-0">
      <input
      className="z-1 mt-10 place-self-center ml-30  w-3xl h-20 bg-amber-50 rounded-3xl rounded-r-none text-center text-gray-900 text-2xl"
      type="text"
      placeholder ="Password"
      value={passwordArray}
      ></input>
        <button className="mt-10  w-17 h-20 bg-blue-400 rounded-3xl rounded-l-none text-center text-gray-900"
        onClick={()=>{
          passwordCopy();
          popupshow();
          }}>copy</button>
          <div ref={backgrndRef} className="popBackground absolute z-10 mt-10 place-self-center ml-30  w-3xl h-20 rounded-3xl rounded-r-none text-center">
              <div ref={popupRef} className="popUp">
                Copied!
              </div>
          </div>  
      </div>


      <div className="flex flex-row mt-4">
      <label className="absolute ml-30 text-xl">Length({length})</label>
        <input 
        className="place-self-center transform scale-150 ml-64 "
        type="range"
        min={8}
        max={20}
        onChange={(evt)=>{
          setLength(parseInt( evt.target.value)+1);
          console.log(length);
          passwordChanger();
        }}>
        </input>


        <label className=" text-xl ml-20">Numbers</label>
        <input
        className="transform scale-200 ml-3"
        type="checkbox"
        defaultChecked={numIncl}
        onChange={()=>{
          setNumIncl((prev) => !prev);
        }}
        >
        </input>


        <label className="text-xl ml-10">Characters</label>
        <input
        className="transform scale-200 ml-3"
        type="checkbox"
        defaultChecked={characIncl}
        onChange={()=>{
          setCharacIncl((prev) => !prev)
        }}
        >
        </input>
      </div>

    </div>
    <div className="place-self-center">
      <button
      style={{ color:'#72ddf7'}} className="bg-transparent rubik-distressed-regular mt-30 rounded-3xl  w-70 h-20 whitespace-nowrap text-3xl"
      onClick={()=>{
        passwordChanger();
      }}
      >Generate Password
      </button>

    </div>
    </div>
  )
}

export default App
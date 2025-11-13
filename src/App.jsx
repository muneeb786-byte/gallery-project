import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [userData, setUserData] = useState([])
  const [num, setNum] = useState(1)
  

  const getImages = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${num}&limit=15`)
    setUserData(response.data)
  }


  useEffect(() => {
    getImages()
  }, [num])

  let printUserData = <h3 className='min-h-[70vh] flex items-center font-semibold text-xl'> Loading...</h3>
  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return <div key={idx} className='md:gap-2 gap-1 '>
        <a href={elem.url} >
        <div className='md:w-55 md:h-55 w-40 h-40 rounded overflow-hidden'>
          <img className='w-full h-full object-cover' src={elem.download_url} alt="" />
        </div>
        <h2 className=' font-semibold text-md md:text-lg text-slate-950'>{elem.author}</h2>
        </a>
      </div>

    })
  }


  return (
    <div>


      <div className='flex justify-center flex-wrap md:gap-5 gap-3 w-full my-10 '>
        {printUserData}
      </div>

     <div className='flex justify-center gap-5 mb-5'>
      <button
      onClick={()=>{
        if(num> 1){
          setNum(num-1)
          setUserData([])
        }
      }}
    className='bg-amber-400 active:scale-95 text-gray-950 tex-md font-semibold px-4 py-2 rounded cursor-pointer'>prev</button>
     <span className='py-2 font-semibold text-slate-950'>Page {num}</span>
      <button
      onClick={()=>{
        setNum(num+1)
         setUserData([])
      }}
    className='bg-amber-400 active:scale-95 text-gray-950 tex-md font-semibold px-4 py-2 rounded cursor-pointer'>next</button>
     </div>

    </div>
  )
}

export default App
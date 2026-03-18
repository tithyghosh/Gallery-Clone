import  { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [userData, setUserData] = useState([]);  
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(function(){
    const getData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
        setUserData(response.data)
      } finally {
        setLoading(false)
      }
    }

    getData()
  },[index])
  let printUserData = <h1 className='text-3xl absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-gray-400'>Loading.....</h1>
  if(userData.length > 0){
    printUserData = userData.map(function(elem, idx){
      return <div key={idx}>
        <a href={elem.url} target='_blank'>
        <div className='h-50 w-60  bg-white mx-auto overflow-hidden rounded-xl'>
        <img  className='h-full object-cover w-full' src={elem.download_url} alt="" />
      </div>
      <h2 className='text-2xl my-3 font-bold'>{elem.author}</h2>
      </a>
      </div>
    })
  }
  return (
    <div className='overflow-auto h-screen p-4'>
      
        <div className='flex flex-wrap gap-2'>
          {printUserData}
        </div>
        {!loading && <div className='flex justify-center gap-6 items-center p-4'>
          <button onClick={() => {
            setIndex((currentIndex) => currentIndex > 1 ? currentIndex - 1 : currentIndex)
            }
          } className='bg-amber-400 text-sm cursor-pointer text-black rounded px-4 py-2 font-semibold active:scale-95'>Prev</button>
          <button onClick={() => {
            setIndex((currentIndex) => currentIndex + 1)
            }
          } 
          className='bg-amber-400 text-sm cursor-pointer text-black rounded px-4 py-2 font-semibold active:scale-95'>Next</button>
        </div>}
    </div>
  )
}

export default App

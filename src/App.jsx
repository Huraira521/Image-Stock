import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import { ToastContainer, toast } from 'react-toastify';
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const App = () => {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('nature')

  const fetchPhotos = async () => {

    const options = {
      headers: {
        Authorization: API_KEY,
      }
    }

    try {
      setLoading(true);
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, options);
      console.log(res.data.photos);
      setPhotos([
        ...photos,
        ...res.data.photos
      ]);

    } catch (err) {
      toast.error("Failed to fetch images")
    }
    finally {
      setLoading(false)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setPhotos([]);
    setQuery(e.target[0].value);
  }


  useEffect(() => {
    fetchPhotos();
  }, [page, query])



  return (

    <div className='min-h-screen bg-gray-200 flex flex-col items-center py-8 gap-12 animate__animated animate__fadeIn'>

      <h1 className='text-4xl font-bold text-indigo-600'>📸 Image Stock </h1>

      <form onSubmit={handleSubmit}>
        <input className='p-2 w-[400px] rounded-l-lg bg-white text-lg focus:outline-indigo-500'
          type="text"
          placeholder='Search Image here'
          required
        />
        <button className='px-8 py-3 bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 rounded-r-lg text-white font-bold hover:scale-105 transition-transform duration-300 cursor-pointer'>Search</button>
      </form>

      {
        photos.length === 0 &&
        <h1 className="text-4xl font-bold text-center">Image not Found</h1>
      }

      <div className='w-9/12 grid lg:grid-cols-4 lg:gap-12 gap-8 '>
        {photos.map((item, index) => (
          <div key={index} className='bg-white rounded-xl'>

            <img
              src={item.src.medium}
              alt={item.alt}
              className='w-full h-[250px] rounded-t-lg object-cover hover:scale-110 transition-transform duration-300'
            />

            <div className='p-3'>
              <h2
                className='text-center text-xl font-medium mt-2 text-gray-500 capitalize'>
                {item.photographer}
              </h2>
              <a target='_blank' href={item.src.original}
                className='bg-green-500 text-xl text-white font-medium block text-center py-2 mt-3 rounded-lg hover:scale-105 transition-transform duration-300'>
                <i className="ri-download-line mr-1"></i> Download
              </a>
            </div>

          </div>
        ))}
      </div>

      {
        loading &&
        <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
      }

      {
        photos.length > 0 &&
        <button onClick={() => setPage(page + 1)} className='bg-rose-500 px-10 py-2 rounded-lg cursor-pointer text-lg font-medium text-white hover:scale-105 transition-transform duration-300'>Load More</button>
      }



      <ToastContainer />
    </div>
  )
}

export default App
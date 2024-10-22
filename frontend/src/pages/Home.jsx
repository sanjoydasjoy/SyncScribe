import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel'

const Home = () => {

  const [isModel, setIsModel] = useState(false)

  const closeModel = () => {
    setIsModel(false)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description })

      if (response.data.success) {
        //navigate('/')
        closeModel()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />

      <button
        onClick={() => setIsModel(true)}
        className='fixed right-6 bottom-6 text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold p-4 rounded-full flex items-center justify-center'>
        <span className="text-4xl">+</span>
      </button>

      {isModel && <NoteModel
        closeModel={closeModel}
        addNote={addNote}
      />}



    </div>
  )
}

export default Home

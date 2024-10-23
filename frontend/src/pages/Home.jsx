import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import { toast } from 'react-toastify'

const Home = () => {

  const [isModel, setIsModel] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)

  const [filteredNotes, setFilteredNotes] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {

    fetchNotes()
  }, [])

  useEffect(() => {
    setFilteredNotes(
      notes.filter((notes) =>
        notes.title.toLowerCase().includes(query.toLowerCase()) ||
        notes.description.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, notes])
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/note', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => {
    setIsModel(false)
  }

  const editNote = (note) => {
    setCurrentNote(note)
    setIsModel(true)
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )

      if (response.data.success) {
        fetchNotes()
        //navigate('/')
        closeModel()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deleteNote = async (id) => {

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      if (response.data.success) {
        toast.success("Note Deleted")
        fetchNotes()
        
      }
    } catch (error) {
      console.log(error)
    }

  }

  const updateNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )

      if (response.data.success) {
        fetchNotes()
        //navigate('/')
        closeModel()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar
        setQuery={setQuery}
      />

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard
            note={note}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )) : <p>No Notes</p>
        }
      </div>

      <button
        onClick={() => {
          setCurrentNote(null)
          setIsModel(true)
        }}
        className='fixed right-6 bottom-6 text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-bold p-4 rounded-full flex items-center justify-center'>
        <span className="text-4xl">+</span>
      </button>

      {isModel && <NoteModel
        closeModel={closeModel}
        addNote={addNote}
        currentNote={currentNote}
        updateNote={updateNote}

      />}



    </div>
  )
}

export default Home

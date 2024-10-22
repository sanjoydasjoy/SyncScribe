import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const NoteCard = ({ note }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-x1 font-bold">{note.title}</h2>
            <p>{note.description}</p>
            <div className="flex justify-end mt-2">
                <button className="text-blue-500 mr-2">
                    <FaEdit />
                </button>
                <button className="text-red-500">
                    <FaTrash />
                </button>
            </div>
        </div >
    )
}

export default NoteCard

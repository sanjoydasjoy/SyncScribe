import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard = ({ note, editNote, deleteNote }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            
            <div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm min-h-[150px] cursor-pointer"
                onClick={toggleModal}
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{note.description}</p>
            </div>

            
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{note.title}</h2>
                        <div className="max-h-60 overflow-y-auto mb-6">
                            <p className="text-gray-700">{note.description}</p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => {
                                    editNote(note);
                                    toggleModal(); 
                                }}
                                title="Edit Note"
                            >
                                <FaEdit size={20} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                onClick={() => {
                                    deleteNote(note._id);
                                    toggleModal(); 
                                }}
                                title="Delete Note"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                        <button 
                            className="mt-6 text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200"
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteCard;

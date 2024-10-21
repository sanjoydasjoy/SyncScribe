import React, { createContext, useContext, useState } from 'react'

const authContext = createContext()

const ContextProvider = () => {
    const [user, setUser] = useState(null)
    return (
        <authContext.Provider value={{ user }}>
            ContextProvider
        </authContext.Provider>

    )
}

export default ContextProvider

import React, { createContext } from 'react'

export const PageContext = createContext({})

export const PageContextProvider = props => {
    return <PageContext.Provider value={props.value}>{props.children}</PageContext.Provider>
}

export const PageContextConsumer = PageContext.Consumer

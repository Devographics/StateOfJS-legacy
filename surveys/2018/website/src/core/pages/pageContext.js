import { createContext } from 'react'

const pageContext = createContext()

export const PageContextProvider = pageContext.Provider
export const PageContextConsumer = pageContext.Consumer

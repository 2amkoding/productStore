import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ChakraProvider value={defaultSystem}>
          <App />
      </ChakraProvider>
  </StrictMode>
)

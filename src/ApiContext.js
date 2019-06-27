import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  err: null,
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
import { createContext } from 'react'

export default createContext({
  authed: false,
  user: null,
  data: {},
  getData: () => {},
  updatePageName: () => {},
  logIn: () => {},
  logOut: () => {}
})


import axios from 'axios';


export const API = {
  authedStatus: () => {
    return axios.post('/api/authedStatus')
  },




  logIn: (email, password) => {
    return axios.post('/api/login', { email: email, password: password })
  },
  
  
  logOut: () => {
    return axios.post('/api/logout')
  },


  register: (email, password) => {
    return axios.post('/api/register', { email: email, password: password })
  },



  getData: () => {
    return axios.post('/api/getData')
  },


  updatePageName: (pageID, updatedPageName) => {
    return axios.post('/api/updatePageName', { pageID: pageID, newName: updatedPageName })
  },


  updatePageText: (pageID, updatedPageText) => {
    return axios.post('/api/updatePageText', { pageID: pageID, pageText: updatedPageText })
  },


  createSubPage: (pageID) => {
    return axios.post('/api/createSubPage', { parentPage: pageID })
  },



  removePage: (pageID) => {
    return axios.post('/api/removePage', { pageID: pageID })
  },



  newPage: () => {
    return axios.post('/api/newPage')
  }

}





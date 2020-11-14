import axios from 'axios';

export const apiLogIn = async (email, password) => {

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        let result = await axios.post('/api/login', {
          email: email,
          password: password
        })

        switch (result.status) {
          case 200:
            resolve({ user: email })
            break;
          default:
            resolve({ error: result.status })
            break;
        }
      } catch (error) {
        reject({ error: error })
      }
    }, 500)
  })
}




export const apiGetData = async () => {
  // /*
  //   Gets all the data from the API of a specific user.
  //   Which user knows the API from the Cookie the browser gets if a user logged in successfully.
  // */

  return new Promise(async (resolve, reject) => {
    try {
      /*
        response holds in response.data the user data.
        Look API for further information
      */
      let response = await axios.post('/api/data')
      if (response.status === 200) {
        /*
          Setting these states let the StateManager
          rerender all subcomponents with the new values
        */
        resolve({ data: response.data.data, user: response.data.user })
      } else {
        throw new Error("UNCATEGORYIZED")
      }


    } catch (error) {
      /*
        NOTE#001
        Could be an error.
        For now, just console log the error.
        Need more error handling features in API and REACT.
      */

      console.log('error :>> ', error)
      reject({ error: error })

    }

  })


}
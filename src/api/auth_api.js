import axios from 'axios'


export const login = data => {
    return axios
      .post('api/auth/login', data)
      .then(response => {
          if(response.data.token){
            localStorage.setItem('usertoken', response.data.token)
          }
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}

export const register = data => {
    return axios
     .post('api/auth/register', data)
     .then(response => {
        if(response.data.token){
            localStorage.setItem('usertoken', response.data.token)
          }
       return response.data
     })
     .catch(err => {
       console.log(err)
     })
 }
 
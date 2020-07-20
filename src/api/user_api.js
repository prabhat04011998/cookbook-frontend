import axios from 'axios'

export const AddComment = (data,token) => {
  return axios
    .post('api/user/comment/add', data,{headers: {
      Authorization: `${token}`
    }})
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const AddNote = (data,token) => {
  return axios
    .post('api/user/notes/add', data,{headers: {
      Authorization: `${token}`
    }})
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const GetNotes = (data,token) => {
  return axios
    .post('api/user/notes/find', data,{headers: {
      Authorization: `${token}`
    }})
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const AddFav = (data,token) => {
  return axios
    .post('api/user/favourite/add', data,{headers: {
      Authorization: `${token}`
    }})
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const AllFav = (data,token) => {
  return axios
    .post('api/user/favourite/all',data,{headers: {
      Authorization: `${token}`
    }})
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
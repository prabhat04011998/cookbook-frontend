import axios from 'axios'


export const GetRecipes = data => {
    return axios
      .get('api/all/recipe/all')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}


export const AddRecipe = (data,token) => {
  return axios
    .post('api/all/recipe/add', data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const GetCuisines= data => {
    return axios
      .get('api/all/cuisine/all')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}

export const GetRecipefromCuisine= data => {
  return axios
    .post('api/all/recipe/cuisine',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const findCuisine= data => {
  return axios
    .post('api/all/cuisine/findByrecipe',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const SearchRecipe= data => {
  return axios
    .post('api/all/recipe/search',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const GetSpecificRecipe = data => {
  return axios
    .post('api/all/recipe/findOne',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const GetComment = data => {
  return axios
    .post('api/all/comment/find',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const GetUserById = data => {
  return axios
    .post('api/all/user/findOne',data)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
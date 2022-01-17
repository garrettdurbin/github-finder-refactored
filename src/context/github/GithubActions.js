import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {Authorization: ''}
})

// Get search results
export const searchUsers = async (text) => {

  const params = new URLSearchParams({
    q: text
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items

}

// "Get user and repos" is replacing the two functions that were here before: "Get single user" and "Get user repos"
// Info about Get user and repos here: Below, "Promise.all" allows me to make multuple HTTP requests in one function. "Promise.all" is a function that takes in an array of requests as its param. This also makes this function way shorter than it was before when "getUser" and "getUserRepos" were separate functions.
// Get user and repos
export const getUserAndRepos = async(login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])

  return {user: user.data, repos: repos.data}
}

// // Get single user
// export const getUser = async (login) => {
//   console.log('getUser fired')

//   const response = await fetch(`https://api.github.com/users/${login}`, {
//     // headers: {
//     //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
//     // }
//   })

//   if(response.status === 404) {
//     window.location = '/notfound'
//   } else {
//     const data = await response.json()
//     return data
//   }
// }

// // Get user repos
// export const getUserRepos = async (login) => {
//   console.log('getUserRepos fired')

//   const params = new URLSearchParams({
//     sort: 'created',
//     per_page: 10
//   })

//   const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
//     // headers: {
//     //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
//     // }
//   })

//   const data = await response.json()
//   return data
// }
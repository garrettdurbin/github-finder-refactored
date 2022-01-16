// Get search results
export const searchUsers = async (text) => {
  console.log('searchUsers fired from GithubActions')

  const params = new URLSearchParams({
    q: text
  })

  const response = await fetch(`https://api.github.com/search/users?${params}`, {
    // headers: {
    //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    // }
  })

  const {items} = await response.json()

  return items
}

// Get single user
export const getUser = async (login) => {
  console.log('getUser fired')

  const response = await fetch(`https://api.github.com/users/${login}`, {
    // headers: {
    //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    // }
  })

  if(response.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await response.json()
    return data
  }
}

// Get user repos
export const getUserRepos = async (login) => {
  console.log('getUserRepos fired')

  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })

  const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
    // headers: {
    //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    // }
  })

  const data = await response.json()
  return data
}
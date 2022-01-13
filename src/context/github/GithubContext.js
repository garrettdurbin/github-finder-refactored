import { createContext, useState } from 'react'

const GithubContext = createContext()

// I don't think I've ever had these variables working. So I'll have to use the actual github url and access token below.
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Traversy said we'll have to export a provider. I think this is just a standard thing you have to do when using Context in React.
// GithubProvider is going to take in props, and we want the children from that...he then said, that's basically what we surround with the provider...but that last part doesn't make sense yet.
export const GithubProvider = ({ children }) => {
  // The "name" of the useStates is how you access them in the return part of the component.
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    console.log('fetchUsers fired from fetchUsers')
    const response = await fetch('https://api.github.com/users', {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  return (
    <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

// I don't think I've ever had these variables working. So I'll have to use the actual github url and access token below.
// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Traversy said we'll have to export a provider. I think this is just a standard thing you have to do when using Context in React.
// GithubProvider is going to take in props, and we want the children from that...he then said, that's basically what we surround with the provider...but that last part doesn't make sense yet.
export const GithubProvider = ({ children }) => {
  // The "name" of the useStates is how you access them in the return part of the component.
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  // useReducer version of state
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (just using this for testing)
  const fetchUsers = async () => {
    console.log('fetchUsers fired from fetchUsers')
    // setLoading calls my dispatch
    setLoading()
    const response = await fetch('https://api.github.com/users', {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})


  return (
    // Anything I want to get out somewhere else using context I have to include here within the "Provider"
    <GithubContext.Provider value={{
        // not sure why this has to be "state.users" rather than "users"...Answer: I used to be defining state line this with useState: const [users, setUsers] = useState([]). HOWEVER, now I'm getting the values from "const [state, dispatch] = useReducer(githubReducer, initialState)"
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

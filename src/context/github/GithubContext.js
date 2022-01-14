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
  // I read here https://www.robinwieruch.de/react-usereducer-hook/ that useState and useReducer are THE two hooks that are used for modern(2019) state mangement in React. useReducer vs Reducer was confusing to me at first, but useReducer is how you attach "dispatch", and the acual reducer usually involves a switch case or if statement (like in my GithubReducer and AlertReducer.)
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  // useReducer version of state
  const initialState = {
    users: [],
    loading: false
  }


  // I don't think this makes sense anymore. I need to go back and rewatch the part where he wrote this line.
  // The "reducer" that takes in 2 arguments: 1:The Current State AND 2:An Action is what I have for my GithubReducer.js file.
  // The useReducer hook is used for complex state and state transitions. It takes a reducer function and an initial state as input and returns the current state and a dispatch function as output with array destructuring
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    console.log('fetchUsers fired from fetchUsers')
    // setLoading calls my dispatch
    setLoading()

    const params = new URLSearchParams({
      q: text
    })

    const response = await fetch(`https://api.github.com/search/users?${params}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const {items} = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Clear search results
  const clearResults = () => dispatch({type: 'CLEAR_RESULTS'})

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})



  return (
    // Anything I want to get out somewhere else using context I have to include here within the "Provider"
    <GithubContext.Provider value={{
        // not sure why this has to be "state.users" rather than "users"...Answer: I used to be defining state line this with useState: const [users, setUsers] = useState([]). HOWEVER, now I'm getting the values from "const [state, dispatch] = useReducer(githubReducer, initialState)"
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearResults,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

import { createContext, useReducer } from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

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
    user: {},
    repos: [],
    loading: false,
  }


  // The "reducer" that takes in 2 arguments: 1:The Current State AND 2:An Action is what I have for my GithubReducer.js file.
  // The useReducer hook is used for complex state and state transitions. It takes a reducer function and an initial state as input and returns the current state and a dispatch function as output with array destructuring
  // I now have access to "dispatch" outsite this context because I passed it through the "provider" below.
  const [state, dispatch] = useReducer(githubReducer, initialState)

  

  // Get single user
  const getUser = async (login) => {
    console.log('getUser fired')
    // setLoading calls my dispatch
    setLoading()

    const response = await fetch(`https://api.github.com/users/${login}`, {
      // headers: {
      //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      // }
    })

    if(response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // Get user repos
  const getUserRepos = async (login) => {
    console.log('getUserRepos fired')
    // setLoading calls my dispatch
    setLoading()

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

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }

  // Clear search results
  const clearResults = () => dispatch({type: 'CLEAR_RESULTS'})

  // Set loading
  // This dispatch calls the action to change loading state to "loading"
  const setLoading = () => dispatch({type: 'SET_LOADING'})



  return (
    // Anything I want to get out somewhere else using context I have to include here within the "Provider"
    <GithubContext.Provider value={{
        // not sure why this has to be "state.users" rather than "users"...Answer: I used to be defining state line this with useState: const [users, setUsers] = useState([]). HOWEVER, now I'm getting the values from "const [state, dispatch] = useReducer(githubReducer, initialState)"
        ...state,
        dispatch,
        clearResults,
        getUser,
        getUserRepos
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

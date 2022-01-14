// All reducers related to Github state will go here.

const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_RESULTS':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export default githubReducer
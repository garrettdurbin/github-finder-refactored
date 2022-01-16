import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {


  // Here I set a component level state with the useState hook. Name of state is text. State can be changed with function called "setText". State is set to empty string by default. Cool.
  const [text, setText] = useState('')

  const { users, searchUsers, clearResults } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  // I should look up e and event handling. I get that this function is taking in events as a param and we're returning setText(whatever Events happen). I just feel like I should understand it a little better.
  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      // searchUsers is defined in context, but what text are we passing in? Oh! Text is the local state we defined above.
      searchUsers(text)


      setText('')
    }
  }


  return (
    <div className="grid grid-cols-1 lx:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            onClick={clearResults}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}

    </div>
  )
}

export default UserSearch

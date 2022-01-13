// Q: Why do some imports have to have brackets and some don't? Looks like imports from 'react' all need brackets, while importing components I make myself don't need brackets.
import { useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from '../users/UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {
  // Allows me to use my GithubContext (Also have to import it above.)
  const { users, loading } = useContext(GithubContext)



  if (!loading) {
    // Question: Why do we use brackets inside a return as below? What's that called?
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {/* Note: Here it looks like we're basically making a list. Similar to what I did in my Vue expense tracker with a V-for, except here we're using .map */}
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
          // <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }

}

export default UserResults

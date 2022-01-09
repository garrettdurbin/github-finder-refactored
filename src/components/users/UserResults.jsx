// Q: Why do some imports have to have brackets and some don't? Looks like imports from 'react' all need brackets, while importing components I make myself don't need brackets.
import { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from '../users/UserItem'

function UserResults() {
  // The "name" of the useStates is how you access them in the return part of the component.
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
    console.log('fetchUsers Fired from useEffect')
  }, [])

  const fetchUsers = async () => {
    console.log('fetchUsers fired from fetchUsers')
    const response = await fetch('https://api.github.com/users', {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  if(!loading) {
    // Question: Why do we use brackets inside a return as below? What's that called?
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
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

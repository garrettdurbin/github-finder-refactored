import { useEffect, useState } from 'react'

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
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
  
}

export default UserResults

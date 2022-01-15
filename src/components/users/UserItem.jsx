import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Q: How does "destructuring work"? I know that's what's happening in the line below. We're taking in "user" as a prop. User contains "login" and "avatar_url"
function UserItem({ user: { login, avatar_url } }) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt="Profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          {/* Note: I don't feel like I understand the {`/users/${login}`} below. 
          A: I guess this is going to go to a route that doesn't exist yet. Brad said reason for first curly brases is that it needs to be dynamic. I guess that kind of makes sense, because the route "users" is going to be a variable we'll probably have to import. Reason for second set of curly brases is because we need to say the users name (which is the word "login") 
          
          What's the "$" for? 
          A: The dollar sign is how I use expressions within template literals. Normally I would only need "{}" to use an "expression", but since this expression is inside a template literal, which uses ``, I have to use the dollar sign.   
          
          What's an expression? 
          A: I think {expressions} are needed when you want to put real JavaScript code inside JSX(syntactic sugar) For exmaple, if I want to use a variable within my JSX, then I would need to wrap that variable in {VARIABLE}, and this is called an expression.

          What's a template literal? ``
          A: I think template literals use backticks: ``. Template literals mean: everything inside these backticks is a string. Exception: ${}. 

          So now I don't get why he didn't skip template literal and say: /users{login}?
          A: Saying to=/users{login} breatks the jsx. I guess that makes sense, because I see where the jsx would expect "" right after to=.
          
          But what about saying: to="/users/{login}"?
          A: This doesn't work becaue now jsx thinks {login} is a string, not a variable.

          Still don't fully understand the expression inside a template literal below, but I have learned alot trying. Frustrating, but still got alot out of it.
          
          Why not?
          to=`/users${login}`
          */}
          <Link className='text-base-content text-opacity-40' to={`/user/${login}`}>
            Visit Profile
          </Link>
        </div>
      </div>


    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem

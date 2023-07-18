
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate()

    const auth = localStorage.getItem('user');

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <div className='nav-ui'>
                <div className='nav-div-1'>
                    <Link to='/userTodo' >
                    TaskDetails
                    </Link>
                </div>
                <div className='nav-div-1'>
                    <Link to='/' >
                        Users Details
                    </Link>
                </div>
                <div className='nav-div-2'>
                    <div>
                        {
                            auth ? <Link
                                to='/login'
                                onClick={logOut}
                            >
                                LogOut({JSON.parse(auth).fullName})
                            </Link> : <Link to='/login'
                            >
                                Login
                            </Link>
                        }
                    </div>
                    <div>
                        {!auth &&
                            <Link
                                to='/signUp'
                            >
                                SignUp
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav
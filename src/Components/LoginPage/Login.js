import React, { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='container'>
            <div className='form-container'>
                <h2 className="form-title">Star Messenger</h2>
                <div className="tab-control">
                    <h3 className="active tab-control-btn login">Sign in</h3>
                </div>
                <div className="login-form form active">
                    <form >
                        <input
                            type="text"
                            id="username"
                            className="txt-input border"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <input
                            type="password"
                            id="password"
                            className="txt-input border"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <button type="submit" className="btn btn-login border">Sign in</button>
                        <p className='go-register'>Create an account <Link to="/register">Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

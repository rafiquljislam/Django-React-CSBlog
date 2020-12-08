import Axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { apiUrl } from '../env';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loginNow = async () => {
        Axios.post(`${apiUrl}login/`, {
            "username": username,
            "password": password
        }).then((res) => {
            window.localStorage.setItem('token', res.data.token);
            window.location.href = "/profile"
            console.log(res.data.token);
        }).catch((res) => {
            console.log(res);
            alert("Somthing is Wrong!Try Agane")
        })
    }
    return (
        <div className="container">
            <div class="content-section">
                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Log In</legend>
                    <div>
                        <div class="form-group">
                            <label >Username</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label >Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
                        </div>
                    </div>
                </fieldset>
                <div class="form-group">
                    <p class="btn btn-outline-info" onClick={loginNow}>Login</p>
                </div>
                <div class="border-top pt-3">
                    <small class="text-muted">
                        Need An Account?
                            <Link class="ml-2" to="/register/">SignIn Up Now</Link>
                    </small>
                </div>
            </div>
        </div >
    )
}

export default Login

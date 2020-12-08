import Axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { apiUrl } from '../env';

const Register = () => {
    let history = useHistory();
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const registernow = async () => {
        if (password1 === password2) {
            Axios.post(`${apiUrl}register/`, {
                "username": username,
                "password": password1
            }).then((res) => {
                console.log(res.data);
                console.log(res.data.error);
                if (res.data.error === true) {
                    alert(res.data.message)
                } else {
                    alert("User created")
                    history.push('/')
                }
            })
        } else {
            alert("Password not match!!")
        }
    }
    return (
        <div className="container">
            <div class="content-section">
                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Register Now</legend>
                    <div>
                        <div class="form-group">
                            <label>Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label >Password</label>
                            <input type="password" onChange={(e) => setPassword1(e.target.value)} class="form-control" placeholder="Password" />
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(e) => setPassword2(e.target.value)} class="form-control" placeholder="Password" />
                        </div>
                    </div>
                </fieldset>
                <div class="form-group">
                    <p class="btn btn-outline-info" onClick={registernow}>Register</p>
                </div>
                <div class="border-top pt-3">
                    <small class="text-muted">
                        Have An Account?
                            <Link class="ml-2" to="/">SignIn In Now</Link>
                    </small>
                </div>
            </div>
        </div >
    )
}

export default Register

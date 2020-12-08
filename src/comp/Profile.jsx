import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiUrl, domain, headersData, options } from '../env';
import { useStateValue } from '../State/StateProvider'
import SingleArticle from './SingleArticle';

const Profile = () => {
    const [{ profile }, dispatch] = useStateValue()
    const [update, setupdate] = useState(null)
    const [image, setImage] = useState({ file: null })
    const [firstname, setFirstname] = useState("")
    const [lasename, setLasename] = useState("")
    const [email, setemail] = useState("")
    useEffect(() => {
        const getdata = async () => {
            const apidata = await Axios.get(`${apiUrl}profile/`, options)
            dispatch({
                type: "ADD_PROFILE",
                profile: apidata.data[0]
            })
        }
        getdata();
        setFirstname(profile?.user.first_name)
        setLasename(profile?.user.last_name)
        setemail(profile?.user.email)
        console.log("updated");
    }, [update])

    const imageonchange = (e) => {
        const file = e.target.files[0]
        setImage({ file: file })
    }
    const uploadimage = async () => {
        let filessssss = image.file
        let formData = new FormData()
        formData.append('image', filessssss)
        await Axios({
            method: "put",
            url: `${apiUrl}updateprofile/1/`,
            headers: headersData,
            data: formData
        }).then((res) => {
            console.log(res.data);
            setupdate(res.data)

        })
    }
    const updatedata = async () => {
        const formData = {
            "first_name": firstname,
            "last_name": lasename,
            "email": email
        }
        await Axios({
            method: "post",
            url: `${apiUrl}updateprofile/`,
            headers: headersData,
            data: formData
        }).then((res) => {
            console.log(res);
            setupdate(res)
        })
    }

    return (
        <div className="container">
            <div>
                <div class="content-section">
                    <div class="media">
                        <img class="rounded-circle account-img" src={`${domain}${profile?.image}`} />
                        <div class="media-body">
                            <h2 class="account-heading">{profile?.user.username}</h2>
                            <small class="form-text text-muted">Username name is Fiexd</small>
                            <p class="text-secondary">{profile?.user.email}</p>
                            <p>{profile?.user.first_name} {profile?.user.last_name}</p>
                        </div>
                    </div>
                    <form method="POST" enctype="multipart/form-data">

                        <fieldset class="form-group">
                            <legend class="border-bottom mb-4">Profile Info</legend>
                            <div class="form-group">
                                <label>Uplode Profile Picture</label>
                                <div class="row">
                                    <div class="col">
                                        <input onChange={(e) => imageonchange(e)} type="file" class="form-control" />
                                    </div>
                                    <div class="col">
                                        <p onClick={uploadimage} className="btn btn-info">Upload</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" onChange={(e) => setLasename(e.target.value)} value={lasename} />
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" onChange={(e) => setemail(e.target.value)} value={email} />
                            </div>
                        </fieldset>
                        <div class="form-group">
                            <p class="btn btn-outline-info" onClick={updatedata}>Update</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="">
                <h2>Time Line</h2>
                <div className="">
                    {
                        profile?.posts?.map((post, i) => (
                            <SingleArticle key={i} post={post} profile={profile} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile

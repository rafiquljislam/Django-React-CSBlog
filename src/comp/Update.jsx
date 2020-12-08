import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { apiUrl, options, headersData } from '../env';


const Update = () => {
    let history = useHistory()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [image2, setImage2] = useState({ file: null });
    const { id } = useParams()
    useEffect(() => {
        const getdata = async () => {
            const apidata = await Axios.get(`${apiUrl}post/${id}/`, options)
            // console.log(apidata.data);
            setTitle(apidata.data?.title)
            setContent(apidata.data?.description)
            setImage(apidata.data?.image)
        }
        getdata();
    }, [])
    const fileSelectedHandler = (e) => {
        const file = e.target.files[0]
        setImage2({ file: file })
    }

    const update_now = async () => {
        let filessssss = image2.file
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', content)
        if (image2.file != null) {
            formData.append('image', filessssss)
        }
        await Axios({
            method: "put",
            url: `${apiUrl}post/${id}/`,
            headers: headersData,
            data: formData
        }).then((res) => {
            console.log(res.data);
            history.goBack()
        }).catch((_) => {
            alert("Data not Update !!")
        })
    }

    return (
        <div className="container">
            <h1>Update</h1>
            <div className="p-3">
                <div class="form-group">
                    <label>Title</label>
                    <input onChange={(e) => { setTitle(e.target.value) }} type="text" class="form-control" value={title} />
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea onChange={(e) => setContent(e.target.value)} class="form-control" rows="3" value={content} ></textarea>
                </div>
                <div class="form-group">
                    <img className="update__image" src={image} alt="" srcset="" />
                    <label>Ulpode Image</label>
                    <input
                        onChange={(e) => fileSelectedHandler(e)}
                        className="form-control"
                        type="file" />
                </div>
            </div>
            <div>
                <p onClick={update_now} className="btn btn-info" >Update</p>
            </div>
        </div>
    )
}

export default Update

import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { apiUrl, headersData } from '../env'

const Newpost = () => {

    const history = useHistory()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState({ file: null })
    const imageinputhandeler = async (e) => {
        const file = e.target.files[0]
        setImage({ file: file })
    }
    const createnewpost = async () => {
        let filessssss = image.file
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', content)
        if (image.file != null) {
            formData.append('image', filessssss)
        }
        await Axios({
            method: "post",
            url: `${apiUrl}post/`,
            headers: headersData,
            data: formData
        }).then((e) => {
            history.push(`/${e.data.id}/`)
        }).catch((_) => {
            alert("Somthing is Wrong !!!!")
        })
    }
    return (
        <div className="container">
            <div class="form-group">
                <label >Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" placeholder="Post title" />
            </div>
            <div class="form-group">
                <label >Description</label>
                <textarea onChange={(e) => setContent(e.target.value)} placeholder="Description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label >Image</label>
                <input onChange={(e) => imageinputhandeler(e)} type="file" class="form-control" />
            </div>
            <p onClick={createnewpost} className="btn btn-info">New Post</p>
        </div>
    )
}

export default Newpost

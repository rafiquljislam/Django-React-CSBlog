import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { apiUrl, domain, options } from '../env'
import { useStateValue } from '../State/StateProvider'

const PostDetails = () => {
    const { id } = useParams()
    const history = useHistory()

    const [{ profile }, { }] = useStateValue()
    console.log(profile);

    const [post, setPost] = useState({});
    console.log(post, "Post Datails Page");

    useEffect(() => {
        const getdata = async () => {
            const apidata = await Axios.get(`${apiUrl}post/${id}/`, options)
            // console.log(apidata.data);
            setPost(apidata.data)
        }
        getdata();
    }, [])
    const delateData = async (postid) => {
        await Axios.delete(`${apiUrl}post/${postid}/`, options)
            .then((_) => {
                alert('Post is Delate Sussessfully')
                history.push("/");
            }).catch((_) => {
                alert('Post Not Delate! Something is Wrong !!!!')
            })
    }

    return (
        <div className="container">
            <article class="media content-section">
                <img class="rounded-circle article-img" src={`${domain}${post?.user?.image}`} />
                <div class="media-body">
                    <div class="article-metadata">
                        <a class="mr-2" href="">{post?.user?.user?.username}</a>
                        <small class="text-muted">{post?.date}</small>
                        {
                            profile?.id === post?.user?.id && (
                                <div>
                                    <Link class="btn btn-secondary btn-sm mt-1 mb-1" to={`/${post?.id}/update/`}>Update</Link>
                                    <Link class="btn btn-danger btn-sm mt-1 mb-1" onClick={() => delateData(post?.id)}>Delete</Link>
                                </div>
                            )
                        }

                    </div>
                    <h2 class="article-title">{post?.title}</h2>
                    <img className="article_content_image" src={post.image} alt="" />
                    <p class="article-content">{post?.description}</p>
                </div>
            </article>

        </div>
    )
}

export default PostDetails

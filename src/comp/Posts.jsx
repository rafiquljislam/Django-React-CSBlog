import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiUrl, domain, options } from '../env';
import { useStateValue } from '../State/StateProvider';
import SingleArticle from './SingleArticle';

const Posts = () => {

    const [{ profile }, { }] = useStateValue()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getdata = async () => {
            const apidata = await Axios.get(`${apiUrl}post/`, options)
            setPosts(apidata.data)
            // console.log(apidata.data);
        }
        getdata();
    }, [])

    const nextclick = async () => {
        const apidata = await Axios.get(`${posts.next}`, options)
        setPosts(apidata.data)
    }

    const postprevious = async () => {
        const apidata = await Axios.get(`${posts.previous}`, options)
        setPosts(apidata.data)
    }

    return (
        <div>
            {
                posts.results?.map((post, i) => (
                    <SingleArticle key={i} post={post} profile={profile} />
                ))
            }
            <div className="paginationBtn">

                {
                    posts.previous && (
                        <div>
                            <Link className="btn btn-danger" onClick={postprevious} >Previous</Link>
                        </div>
                    )
                }
                {
                    posts.next && (
                        <div>

                            <Link className="btn btn-info" onClick={nextclick} >Next</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Posts

import React from 'react'
import { Link } from 'react-router-dom'
import { domain } from '../env'

const SingleArticle = ({ post, profile }) => {
    return (
        <div class="media content-section">
            <img class="rounded-circle article-img" src={`${domain}${post.user.image}`} />
            <div class="media-body">
                <div class="article-metadata">
                    {
                        profile?.id === post?.user?.user?.id ? (
                            <Link class="mr-2" to="/profile">{post.user.user.username}</Link>
                        ) :
                            (
                                <Link class="mr-2" to={`/user/${post.user.user.username}/`}>{post.user.user.username}</Link>
                            )
                    }
                    <small class="text-muted">{post.date}</small>
                </div>
                <h2><Link class="article-title" to={`/${post.id}/`} >{post.title}</Link></h2>
                {
                    (post?.description).length > 200 ? (
                        <p class="article-content">{(post?.description).substring(0, 200)}...<Link to={`/${post.id}/`} >more</Link></p>
                    ) :
                        (
                            <p class="article-content">{post?.description}</p>
                        )
                }
            </div>
        </div>
    )
}

export default SingleArticle

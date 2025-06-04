import { useEffect, useState } from 'react'
import { Loader, RenderCards } from '../components'
import { usePost } from '../context/post.context'
import { useParams } from 'react-router'

export const Gallery = () => {
  const { posts, setPosts } = usePost()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [username, setUsername] = useState(null)

  const fetchGallery = async () => {
    try {
      setLoading(true)
      let response
      if (id) {
        response = await fetch(`http://localhost:8000/api/v1/post/get-postsBy-user/${id}`, { credentials: "include" });
      } else {
        response = await fetch("http://localhost:8000/api/v1/post/get-my-posts", { credentials: "include" })
        setUsername(null)
      }
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error);
      }
      setPosts(data.posts.reverse())
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const removePost = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/post/remove-post/${_id}`, { credentials: "include" });
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/get-user-by-id/${id}`, { credentials: "include" });
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error);
      }
      setUsername(data.user.username)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (id) {
      fetchUser()
    }
    fetchGallery()
  }, [id])

  return (
    <>
      <section className="max-w-7xl">
        <h1 className="font-extrabold text-[#222328] text-[32px] mb-5">
          {username ? `${username}'s` : "My"} Gallery
        </h1>
        {loading ?
          <div className="flex justify-center items-center">
            <Loader />
          </div> :
          <RenderCards data={posts} title="No Posts" removePost={removePost} fetchGallery={fetchGallery} />}
      </section>
    </>
  )
}

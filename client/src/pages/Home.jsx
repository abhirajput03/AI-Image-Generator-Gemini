import { useEffect, useState } from 'react'
import { FormField, Loader, Pagination, RenderCards } from '../components'
import { usePost } from '../context/post.context'
import { useUser } from '../context/user.context'

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { posts, setPosts } = usePost()
  const { user } = useUser()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    const result = posts.filter((post) => {
      return post.prompt.includes(e.target.value)
    })
    setFilteredPosts(result)
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8000/api/v1/post/get-all-posts?page=${page}&limit=${limit}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error);
      }
      setTotalPages(data.totalPages)
      setPosts(data.posts.reverse())
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  return (<>
    <section className="max-w-7xl">
      <div>
        {user.isLoggedIn && <div className='text-2xl text-[#666e75] font-medium'>Hello <span className='text-green-500'>{user.username}</span></div>}
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The community showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by Gemini AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {
          loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Resuls for : <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}

              {
                searchText ? (<RenderCards data={filteredPosts} title="No search results found" />)
                  : (<RenderCards data={posts} title="No post found" />)
              }
            </>
          )
        }
      </div>
      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} page={page} />
    </section >
  </>
  )
}

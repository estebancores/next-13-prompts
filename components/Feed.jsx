"use client"
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) =>
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />)
      }
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [auxPosts, setAuxPosts] = useState([]);

  const handleSearchChange = (e) => {
    setPosts(auxPosts)

    if (!e.target.value) {
      setPosts(auxPosts)
      return
    }
    
    const sText = e.target.value.toString().toLowerCase().trim()
    const filtered = posts.filter(
      (p) => p.prompt.includes(sText)
        || p.tag.includes(sText)
    )

    setPosts(filtered)
    

    console.log(posts)
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
      setAuxPosts(data)
    }

    fetchPosts()
  }, []);

  return (
    <section className='feed'>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed
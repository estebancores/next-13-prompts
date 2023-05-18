"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import UserProfile from '@components/UserProfile'

const Profile = () => {
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        if (session?.user.id) fetchPosts()
    }, []);

    const handleDelete = async (post) => {
        const handleConfirm = confirm('Are you sure you want to delete this prompt?')
        if (!handleConfirm) return;
        try {

            const response = await fetch(
                `/api/prompt/${post._id.toString()}`,
                { method: 'DELETE' }
            )

            if (response.ok) {
                const filteredPost = posts.filter((p) => p._id !== post._id)
                setPosts(filteredPost)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    return (
        <UserProfile
            name="My"
            desc="Welcom to your profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profile
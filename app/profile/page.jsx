"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import UserProfile from '@components/UserProfile'

const Profile = () => {

    const handleDelete = async () => {}
    const handleEdit = async () => {}

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
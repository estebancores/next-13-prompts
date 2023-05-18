"use client"
import { useState, useEffect } from 'react'
import Form from '@components/Form'
import { useRouter, useSearchParams  } from 'next/navigation'
import { useSession } from 'next-auth/react'


const UpdatePrompt = () => {
    
    const router = useRouter()
    const params = useSearchParams()
    const postId = params.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok){
                router.push('/')
            }
        } catch(err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/prompt/${postId}`)
            const data = await response.json()
            setPost({ prompt: data.prompt, tag: data.tag })
        }
    }, []);

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt
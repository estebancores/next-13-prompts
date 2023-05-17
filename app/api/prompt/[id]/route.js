import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {

    try {
        await connectToDb()
        const post = await Prompt.findById(params.id).populate('creator')

        if (!post) {
            return new Response('Prompt not found', { status: 404})    
        }

        return new Response(JSON.stringify(post), { status: 200})
    } catch (err) {
        return new Response("failed to fetch prompt", {
            status: 500
        })
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()

    try {
        await connectToDb()
        const post = await Prompt.findById(params.id)
        if (!post) {
            return new Response('Prompt not found', { status: 404})    
        }

        post.prompt = prompt
        post.tag = tag
        await post.save()
        return new Response(JSON.stringify(post), { status: 200})    
    } catch(err) {

    }
}

export const DELETE = async () => {

}
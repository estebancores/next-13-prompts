import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req) => {

    try {
        await connectToDb()
        const posts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(posts), { status: 200})
    } catch (err) {
        return new Response("failed to fetch prompts", {
            status: 500
        })
    }
}
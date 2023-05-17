import Feed from '@components/Feed'

export const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & share prompts
                <br className="max-md:hidden" />
                <span className="orange_gradient">Ai powerd prompts</span>
            </h1>
            <p className="desc text-center">
                Just share stuff
            </p>
            {/* Feed */}
            <Feed />
        </section>
    )
}

export default Home
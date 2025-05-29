export default function About() {
    return (
        <main>
            <section className="container max-w-4xl px-4 py-8 mx-auto">
                <h1 className="mb-6 text-4xl font-bold text-center">
                    About Me - The Traveler
                </h1>

                <div className="grid items-center gap-8 mb-12 md:grid-cols-2">
                    <div className="relative h-[300px] w-full">
                        <img
                            src="/traveler.jpg"
                            alt="Traveler - man looking at the lake"
                            width="350"
                        />
                    </div>
                    <div>
                        <p className="mb-4 text-sm text-gray-600 uppercase" aria-hidden="true">
                            My Journey
                        </p>
                        <h2 className="mb-4 text-2xl font-semibold">
                            Exploring the world, one step at a time
                        </h2>
                        <p className="mb-4 text-gray-700">
                            Hi, I am Honza — a traveler, adventurer, and lover of the unknown. I left my comfortable but routine life behind to explore cultures, connect with people, and live a life full of stories worth telling.
                        </p>
                        <p className="text-gray-700">
                            Whether it is hiking volcanoes in Indonesia, drinking coffee in Lisbon, or learning bachata in Colombia, I believe every place teaches you something new — not just about the world, but about yourself.
                        </p>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" aria-hidden="true" />

            <section className="py-12" aria-labelledby="key-features">
                <div className="px-6 mx-auto max-w-7xl">
                    <h2 id="key-features" className="sr-only">Core Beliefs</h2>
                    <div className="grid gap-6 md:gap-0 md:grid-cols-3">
                        <article className="p-6 bg-white">
                            <h3 className="mb-3 text-xl font-semibold">
                                Authentic Connections
                            </h3>
                            <p className="text-gray-600">
                                I travel not to escape life, but to connect — with people, places, and cultures that challenge my perspective.
                            </p>
                        </article>
                        <article className="p-6 bg-white border-gray-400 md:border-x">
                            <h3 className="mb-3 text-xl font-semibold">
                                Slow Living
                            </h3>
                            <p className="text-gray-600">
                                I believe in taking time — whether it’s enjoying street food in Vietnam or watching the sunset in the Canaries.
                            </p>
                        </article>
                        <article className="p-6 bg-white">
                            <h3 className="mb-3 text-xl font-semibold">
                                Always Learning
                            </h3>
                            <p className="text-gray-600">
                                Each journey is a lesson. I’ve learned languages, instruments, and life philosophies — all on the road.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" aria-hidden="true" />

            <section className="container max-w-3xl px-4 py-8 mx-auto">
                <div className="prose max-w-none">
                    <h2 className="mb-4 text-2xl font-semibold">Why I Travel</h2>
                    <p className="mb-4 text-gray-700">
                        Traveling is my way of reconnecting with what really matters — simplicity, freedom, and curiosity. I don’t have all the answers, and that’s kind of the point. Every day is a chance to explore, reflect, and grow.
                    </p>
                    <p className="text-gray-700">
                        I hope to inspire others to break free from their comfort zones and follow their own path — whether it’s around the world or simply within themselves.
                    </p>
                </div>
            </section>
        </main>
    );
}

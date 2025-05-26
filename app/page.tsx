import ImageVanInNationalPark from "@/public/van-in-national-park.jpg"

export default function Home() {
  return (
    <main>
      <section className="flex flex-col-reverse items-center w-[95%] justify-between gap-8 py-12 mx-auto md:flex-row max-w-5xl">

        <div className="flex-1 space-y-6">

          <h1 className="text-4xl font-bold md:text-5xl">Travel Blog</h1>
          <p className="text-lg text-gray-600">Stories from the road, tips for curious travelers, and reflections from faraway places.
            Whether it's a hidden café in Lisbon or a mountain trail in Vietnam – it's all part of the journey.</p>
          <div className="flex gap-4">

            <button
              className="px-6 py-3 text-black transition duration-100 bg-white border-2 border-black hover:bg-black hover:text-white"
            >
              Explore
            </button>
          </div>
        </div>
        <img src={ImageVanInNationalPark.src} className="w-[350px] h-auto rounded-lg" />
      </section>
    </main>
  );
}

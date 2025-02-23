export default function HeroSection() {
  return (
    <main className="my-4 flex w-full h-screen items-center justify-center container mx-auto">
      <section className="flex-grow">
        <div>
          <h1 className="text-center text-8xl font-bold text-darkFontColor">THE BLOG</h1>
        </div>
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-darkFontColor">Recent blog posts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>1</div>
            <div>
              <div>2</div>
              <div>3</div>
            </div>
            <div className="col-span-2">4</div>
          </div>
        </div>
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-darkFontColor">All Blog Posts</h2>
          <div>post cards</div>
        </div>
      </section>
    </main>
  )
}
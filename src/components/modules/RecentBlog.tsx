import Image from "next/image";

const RecentBlog = () => {
  return (
    <main className="container mx-auto">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">Recent blog posts</h2>
      <div className='grid grid-cols-1 md:grid-cols-10 gap-8'>

        {/*The first Grid Box*/}
        <div className={`col-span-5 grid grid-row-2 gap-8`}>
          <Image src="/landscape-01.jpg" alt="blog post" width={1024} height={1024}
                 className="h-[13rem] object-cover"/>
          <div>
            <span className={`text-purple-700 text-sm`}>Rameshwor Shrestha - 1 Jan 2023</span>
            <h3 className={`text-2xl`}>UX review presentation</h3>
            <p className={`mb-4`}>How do you create compelling presentations that wow your colleagues and impress
              your managers?</p>
            <span className={`text-sm px-2 bg-purple-200 rounded-lg text-purple-700`}>Design</span>
          </div>
        </div>
        <div className={`col-span-5 grid gap-8`}>

          {/*The second Grid Box */}
          <div className={`grid grid-cols-2 gap-8`}>
            <Image src="/landscape-02.jpg" alt="blog post" width={1024} height={1024}
                   className='h-[11rem] object-cover'/>
            <div>
              <span className={`text-purple-700 text-sm`}>Rameshwor Shrestha - 1 Jan 2023</span>
              <h3 className={`text-2xl`}>UX review presentation</h3>
              <p className={`line-clamp-3 mb-4`}>
                A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and
                horizontal lines that create a matrix of intersecting points, which can be used to align and organize
                page elements. Grid systems are used to create a consistent look and feel across a website, and can help
                to make the layout more visually appealing and easier to navigate.
              </p>
              <span className={`text-sm px-2 bg-purple-200 rounded-lg text-purple-700`}>Design</span>
            </div>
          </div>

          {/* The Third Grid Box*/}
          <div className={`grid grid-cols-2 gap-8`}>
            <Image src="/landscape-03.jpg" alt="blog post" width={1024} height={1024}
                   className='h-[11rem] object-cover'/>
            <div>
              <span className={`text-purple-700 text-sm`}>Rameshwor Shrestha - 1 Jan 2023</span>
              <h3 className={`text-2xl`}>UX review presentation</h3>
              <p className={`line-clamp-3 mb-4`}>
                A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and
                horizontal lines that create a matrix of intersecting points, which can be used to align and organize
                page elements. Grid systems are used to create a consistent look and feel across a website, and can help
                to make the layout more visually appealing and easier to navigate.
              </p>
              <span className={`text-sm px-2 bg-purple-200 rounded-lg text-purple-700`}>Design</span>
            </div>
          </div>
        </div>

        {/* The fourth grid box*/}
        <div className="col-span-10 grid grid-cols-2 gap-4">
          <Image src="/landscape-03.jpg" alt="blog post" width={1024} height={1024}
                 className="h-[14rem] object-cover"/>
          <div>
            <span className={`text-purple-700 text-sm`}>Rameshwor Shrestha - 1 Jan 2023</span>
            <h3 className={`text-2xl`}>UX review presentation</h3>
            <p className={`mb-4 line-clamp-5`}>
              A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and
              horizontal lines that create a matrix of intersecting points, which can be used to align and organize page
              elements. Grid systems are used to create a consistent look and feel across a website, and can help to
              make the layout more visually appealing and easier to navigate.
            </p>
            <span className={`text-sm px-2 bg-purple-200 rounded-lg text-purple-700`}>Design</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RecentBlog;
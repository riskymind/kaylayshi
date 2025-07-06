import Image from "next/image";


const AsteriskPage = () => {
  return (
        <section>
          <a href="">
            <Image src="/logo.png" alt="Profile picture" width={180} height={180} priority
            className="rounded-full bg-gray-100/50 block lg:mt-5 mt-10 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0 object-contain w-auto rotate-0 hover:rotate-320 transition-all ease-in-out duration-700"/>
          </a>
          <h1 className="mb-8 text-2xl font-medium text-gray-800 dark:text-yellow-300">Child Of God</h1>
          <div className="">
            <p>
              👋 Hi, {"I'm"} Kelechi Opara - a passionate {"God's"} child with fear and carefulness not to offend. 
            </p>
            <br />
            <p className="underline underline-offset-8">
                You can meet the most important person in this world.
            </p>
            <br />
            <p>
            💡 My journey so far with God is nothing to regret about. I am Blessed.
            </p>
        
          </div>
        </section>
    );
}

export default AsteriskPage

import Image from "next/image";

export default function Home() {
  return (
      <section>
        <a href="">
          <Image src="/profile_img.jpg" alt="Profile picture" width={180} height={180} priority
          className="rounded-full bg-gray-100 block lg:mt-5 mt-10 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0 object-contain w-50 h-50"/>
        </a>
        <h1 className="mb-8 text-2xl font-medium dark:text-yellow-300 text-gray-800">Software Engineer</h1>
        <div className="">
          <p>
            👋 Hi, {"I'm"} Kelechi Opara - a passionate Software Engineer with expertise in building scalable and high-performance applications. 
          </p>
          <br />
          <p>
          With a strong foundation in <span className="text-gray-800 dark:text-yellow-100">React, Next.js, MERN Stack, Python, Django, Flask, Kotlin, and Android Development</span>,
          I specialize in creating full-stack applications and AI-driven solutions that solve real-world problems.
          </p>
          <br />
          <p>
          💡 My journey in software engineering is fueled by a deep understanding of computer science fundamentals, algorithms, and modern frameworks. 
          My ability to architect, develop, and deploy applications seamlessly across web and mobile platforms sets me apart in the tech landscape.
          </p>
          <div className="mt-4">
            <h4>🎓 I have earned certifications from {"Harvard's"} CS50 courses, including:</h4>
            <br />
            <ul className="list-disc">
              <li><span className="text-gray-800 dark:text-yellow-100 font-bold">CS50x</span>: Mastery of computer science fundamentals</li>
              <li><span className="text-gray-800 dark:text-yellow-100 font-bold">CS50AI</span>: Specialization in Artificial Intelligence</li>
              <li><span className="text-gray-800 dark:text-yellow-100 font-bold">CS50P</span>: Proficiency in Python programming</li>
              <li><span className="text-gray-800 dark:text-yellow-100 font-bold">CS50SQL</span>: Advanced database management and query optimization</li>
            </ul>
            <br />
            <p>🔬 My passion extends into AI and Machine Learning, where I explore ways to integrate intelligent systems into applications, improving efficiency and automation.</p>
          </div>

          <div>
            <p className="mt-8">
            🚀 Whether {"it's"} building intuitive user experiences, optimizing backend performance, or deploying AI models, I thrive in dynamic and challenging environments that push the boundaries of innovation.
            </p>
            <br />
            <p>📩 {"Let's"} connect and build something amazing together!</p>
          </div>
        </div>
      </section>
  );
}



import db from "@/kaylayshiDB"

export const dummyEducations = [
    {
      slug: "cs50-X",
      course: "Introduction to Computer Science",
      school: "Havard University(EDX) Cambridge, MA, USA",
      description: `
        1. Acquired foundational knowledge in computer science concepts, including algorithms, data structures, and memory management.
        2. Gained proficiency in problem-solving with C, Python, and JavaScript. 
        3. Designed and implemented projects such as a dynamic website and a game, showcasing a strong grasp of web development and computational thinking.
        4. Developed skills in debugging, version control (Git), and the application of computational efficiency.
      `,
      image: "/",
      date: "March 2024"
    },

    {
      slug: "computer-science",
      course: "Computer Science",
      school: "Imo State University, Owerri, Imo, NG",
      description: `
          1. Excellent written and verbal communication skills.
          2. Ability to work independently.
          3. Strong problem-solving skills and attention to detail
      `,
      image: "/",
      date: "October 2012"
    },
]


export const dummyExperiences = [
    {
        company: "Zuri Health - Kenya",
        position: "Android Engineer",
        start_date: "November 2022",
        end_date: "Till Date",
        description:`
          1. Zuri Health Patient App: Led the development of an Android application enabling patients to connect with certified doctors, book appointments, and access affordable healthcare services. Used Kotlin, Firebase, and RESTful APIs to implement secure authentication, real- time communication, and scalable database solutions.
          2. Zuri Doctor App: Built a companion Android application for doctors to seamlessly connect with patients, manage consultations, and provide medical advice—designed features such as video calling (using Agora SDK), notifications, and calendar integration.
          3. Ensured cross-platform compatibility, maintained compliance with healthcare regulations, and optimized the apps for high performance across diverse devices.
          4. This resulted in a 40% increase in user engagement and contributed to the app being a critical tool in bridging healthcare gaps across sub- Saharan Africa.
        `
    },

    {
      company: "Play Tech - Kenya",
      position: "Android Engineer",
      start_date: "April 2020",
      end_date: "August 2022",
      description:`
        1. Ensured cross-platform compatibility, maintained compliance with healthcare regulations, and optimized the apps for high performance across diverse devices.
        2. Add 40% increase in user engagement and contributed to the app being a critical tool in bridging healthcare gaps across sub- Saharan Africa.
      `
  },

  {
    company: "Decagon - Nigeria",
    position: "Software Engineer",
    start_date: "September 2019",
    end_date: "October 2023",
    description:`
      1. Develop and maintain high-quality mobile applications.
      2. Ensure the performance, quality, and responsiveness of applications. Implement new technologies to maximize development efficiency. Conduct code reviews and provide constructive feedback.
      3. Stay up-to-date with the latest industry trends and technologies. Collaborate closely with UX/UI teams to align design and development goals.
      4. Troubleshoot and debug to optimize performance.
      5. Train and mentored more than 18 developers in Android development
    `
},
]


// export const dummyProjects = [
//     {
//         title: "Ashlar Slate",
//         slug: "ashlar-slate",
//         image: "/images/image_1.jpeg",
//         description:"Mimics the look of finely cut stone tiles arranged in a square or rectangular pattern.",
//       },
// ]

async function initData() {

  const insertEducation = db.prepare(`
      INSERT INTO stamps (slug, course, school, image, description, date) 
      VALUES (@slug, @course, @school, @image, @description, @date)
  `);

  const insertExperience = db.prepare(`
      INSERT INTO experiences (company, position, start_date, end_date, description) 
      VALUES (@company, @position, @start_date, @end_date, @description)
  `);

  // const insertProject = db.prepare(`
  //     INSERT INTO projects (slug, title, description, image, url, created_at) 
  //     VALUES (@slug, @title, @description, @image, @url, @created_at)
  // `);

  // Use a transaction to make it efficient and safe
  const insertTransaction = db.transaction(() => {

      for (const education of dummyEducations) {
          insertEducation.run(education);
      }

      for (const experience of dummyExperiences) {
          insertExperience.run(experience);
      }

      // for (const project of dummyProjects) {
      //     insertProject.run(project);
      // }
  });

  insertTransaction(); // Execute transaction
  console.log("✅ Initial data populated successfully!");
}


// Execute on startup
(async () => {
  try {
      await initData();
  } catch (error) {
      console.error("❌ Error initializing data:", error);
  }
})();
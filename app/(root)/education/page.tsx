import EducationCard from "@/app/components/EducationCard"
import { getAllEducation } from "@/lib/actions/education.actions"
import { FrontEndEducation } from "@/types";

const EducationPage = async () => {
  const backendData = await getAllEducation()

 const transformedEdu: FrontEndEducation[] = backendData.map((edu)=> ({
    degree: edu.degree,
    school: edu.school,
    image: edu.image,
    year: edu.year,
    knowledge: edu.knowledge
  }))
  return (
    <div className="grid md:grid-cols-2 gap-4">
        {transformedEdu.map((edu, index)=> (
          <div key={index} className="rounded-lg shadow-xl">
            <EducationCard data={edu}/>
          </div>
          
        ))}
        
    </div>
  )
}

export default EducationPage

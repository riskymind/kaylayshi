import ExperienceCard from "@/app/components/ExperienceCard"
import { getAllExperience } from "@/lib/actions/experience.actions"
import { FrontEndExperience } from "@/types"

const ExperiencePage = async () => {
  const backendData = await getAllExperience()

   const transformedExp: FrontEndExperience[] = backendData.map((exp)=> ({
    ...exp,
    startDate: exp.startDate.toString(), // or format it how you like
    endDate: exp.endDate ? exp.endDate?.toString() : '',
  }))
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {transformedExp.map((exp, index)=> (
        <div key={index}>
          <ExperienceCard data={exp}/>
        </div>
      ))}
    </div>
  )
}

export default ExperiencePage

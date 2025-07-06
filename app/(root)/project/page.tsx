import { getAllProjects } from "@/lib/actions/projects.actions"
import {FrontEndProject } from "@/types"
import ProjectCard from "@/app/components/ProjectCard"

const ProjectPage = async () => {
  const backendData = await getAllProjects();
  
  const transformedProjects: FrontEndProject[] = backendData.map((project) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    images: project.images,
    demoLink: project.demoLink,
    githubLink: project.githubLink,
    image: project.images[0] || '/logo.png',
  }));
  return (
    <div className="grid md:grid-cols-2 gap-4">
    {transformedProjects.map((exp, index)=> (
      <div key={index}>
        <ProjectCard data={exp}/>
      </div>
    ))}
  </div>
  )
}

export default ProjectPage

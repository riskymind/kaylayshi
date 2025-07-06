import { Button } from "@/components/ui/button";
import { getAllProjects, deleteProject } from "@/lib/actions/projects.actions"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {shortenId, shortenString} from "@/lib/utils"
import DeleteDialog from "@/app/components/delete-dialog";
// import Image from "next/image";

const AdminProjectPage = async () => {
    const projects = await getAllProjects()
    
    
  return (
    <div className="space-y-2">
       <div className="flex items-center justify-between container">
            <div>
                <h1>Projects</h1>
            </div>
            <Button asChild>
                <Link href="/admin/project/create">Add project</Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>TTILE</TableHead>
                    <TableHead>DESCRIPTION</TableHead>
                    <TableHead>TECHNOLOGIES</TableHead>
                    <TableHead className='w-[100px]'>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((project)=> (
                    <TableRow key={project.id}>
                        <TableCell>{shortenId(project.id)}</TableCell>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>{shortenString(project.description)}</TableCell>
                        <TableCell>{project.technologies[0]}</TableCell>
                        <TableCell className="flex gap-1">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/project/${project.id}`}>Edit</Link>
                            </Button>
                            <DeleteDialog id={project.id} action={deleteProject}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminProjectPage

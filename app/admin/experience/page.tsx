import { Button } from "@/components/ui/button";
import { getAllExperience, deleteExperience } from "@/lib/actions/experience.actions"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {shortenId} from "@/lib/utils"
import DeleteDialog from "@/app/components/delete-dialog";
import Image from "next/image";

const AdminExperiencePage = async () => {
    const experiences = await getAllExperience()
    
    
  return (
    <div className="space-y-2">
       <div className="flex items-center justify-between container">
            <div>
                <h1>Experience</h1>
            </div>
            <Button asChild>
                <Link href="/admin/experience/create">Add Experience</Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>IMAGE</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead>COMPANY</TableHead>
                    <TableHead>LOCATION</TableHead>
                    <TableHead className='w-[100px]'>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {experiences.map((experience)=> (
                    <TableRow key={experience.id}>
                        <TableCell>
                            <Image src={experience.image} alt="logo" width={25} height={25} />
                        </TableCell>
                        <TableCell>{shortenId(experience.id)}</TableCell>
                        <TableCell>{experience.role}</TableCell>
                        <TableCell>{experience.company}</TableCell>
                        <TableCell>{experience.location}</TableCell>
                        <TableCell className="flex gap-1">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/experience/${experience.id}`}>Edit</Link>
                            </Button>
                            <DeleteDialog id={experience.id} action={deleteExperience}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminExperiencePage

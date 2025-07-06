import { Button } from "@/components/ui/button";
import { deleteEducation, getAllEducation } from "@/lib/actions/education.actions"
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

const AdminEducationPage = async () => {
    const educations = await getAllEducation()
    console.log(educations);
    
    
  return (
    <div className="space-y-2">
       <div className="flex items-center justify-between container">
            <div>
                <h1>Education</h1>
            </div>
            <Button asChild>
                <Link href="/admin/education/create">Add Education</Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>IMAGE</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>DEGREE</TableHead>
                    <TableHead>SCHOOL</TableHead>
                    <TableHead>YEAR</TableHead>
                    <TableHead className='w-[100px]'>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {educations.map((education)=> (
                    <TableRow key={education.id}>
                        <TableCell>
                            <Image src={education.image} alt="logo" width={25} height={25} />
                        </TableCell>
                        <TableCell>{shortenId(education.id)}</TableCell>
                        <TableCell>{education.degree}</TableCell>
                        <TableCell>{education.school}</TableCell>
                        <TableCell>{education.year}</TableCell>
                        <TableCell className="flex gap-1">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/education/${education.id}`}>Edit</Link>
                            </Button>
                            <DeleteDialog id={education.id} action={deleteEducation}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminEducationPage

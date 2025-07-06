import { Button } from "@/components/ui/button";
import { getAllSkills, deleteSkill } from "@/lib/actions/skills.actions"
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

const AdminSkillPage = async () => {
    const skills = await getAllSkills()
    
  return (
    <div className="space-y-2">
       <div className="flex items-center justify-between container">
            <div>
                <h1>Skills</h1>
            </div>
            <Button asChild>
                <Link href="/admin/skill/create">Add Skill</Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>IMAGE</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>TITLE</TableHead>
                    <TableHead>LEVEL</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead className='w-[100px]'>ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {skills.map((skill)=> (
                    <TableRow key={skill.id}>
                        <TableCell>
                            <Image src={skill.image} alt="logo" width={25} height={25} />
                        </TableCell>
                        <TableCell>{shortenId(skill.id)}</TableCell>
                        <TableCell>{skill.title}</TableCell>
                        <TableCell>{skill.level}</TableCell>
                        <TableCell>{skill.category}</TableCell>
                        <TableCell className="flex gap-1">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/skill/${skill.id}`}>Edit</Link>
                            </Button>
                            <DeleteDialog id={skill.id} action={deleteSkill}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminSkillPage

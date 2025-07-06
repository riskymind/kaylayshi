"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

const DeleteDialog = ({id, action}: {id: string; action: (id:string) => Promise<{success: boolean; message: string}>}) => {        

    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleDeleteClick = () => {
        startTransition(async () => {
            const res = await action(id)
            if(!res.success) {
                // toast error
            }else {
                setOpen(false)
                // toast success
            }
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        this action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button 
                    variant="destructive"
                    size="sm"
                    disabled={isPending}
                    onClick={handleDeleteClick}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog
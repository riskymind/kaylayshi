import {createUploadthing, type FileRouter } from "uploadthing/next"
// import {UploadThingError} from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
    imageUploader: f({
        image: {maxFileSize: "4MB"}
    })
    .onUploadComplete(async ({file})=> {
        console.log("Upload complete:", file.ufsUrl);
        return {}
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

import db from "@/kaylayshiDB";

export async function getEducations() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare("SELECT * FROM educations").all()
}
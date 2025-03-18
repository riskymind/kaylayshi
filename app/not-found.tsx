import { Metadata } from "next";

export const meteData: Metadata = {
    title: "404",
    description: "Error 404"
}

export default function NotFound() {
    return (
        <section>
            <h1>
                404 - Page not found.
            </h1>
            <p>
                Oops! The page {"you're"} looking for {"doesn't"} seem to exist.    
            </p>
        </section>
    )
}
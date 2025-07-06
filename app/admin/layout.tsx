import { AdminNavbar } from "../components/admin-nav";
import Footer from "../components/footer";

export default function AdminLayout({ 
    children
}: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <AdminNavbar />
                <main className="min-w-0 flex-auto mt-2 md:mt-6 px-6 sm:px-4 md:px-0 max-w-[824px] w-full">
                {children}
                </main>
            <Footer />
        </>
    )
}
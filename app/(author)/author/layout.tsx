import AuthorSidebar from "@/components/author-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"


function AuthorLayout({ children }: {
    children: React.ReactNode
}) {
  return (
    <div className='p-2 space-y-2'>
        <SidebarProvider>
            <AuthorSidebar />
            <div className="container">
                {children}
            </div>

        </SidebarProvider>

    </div>
  )
}

export default AuthorLayout

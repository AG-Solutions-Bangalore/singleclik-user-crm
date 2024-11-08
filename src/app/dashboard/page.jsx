import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateEnquiry from "../createEnquiry/CreateEnquiry"
import { useState } from "react"
import axios from "axios"
import BASE_URL from "@/config/BaseUrl"



// eslint-disable-next-line react/prop-types
export default function Page({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  
  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex flex-row justify-between  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/open-received">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Brand</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          

         
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger className="bg-black text-white mr-2 p-2 rounded-lg text-xs font-bold"> Create Enquiry</DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Create Your Enquiry</DialogTitle>
              <DialogDescription>
                <CreateEnquiry  setIsDialogOpen={setIsDialogOpen} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
     
          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl  p-2 md:min-h-min" >
          {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}

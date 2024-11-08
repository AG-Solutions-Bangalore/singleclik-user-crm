import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,  
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.


const nameL = localStorage.getItem("name")
const emailL = localStorage.getItem("email")
  

const data = {
  user: {
    name: `${nameL}`,
    email: `${emailL}`,
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "AG Solutions",
      logo: GalleryVerticalEnd,
      plan: "SingleClik",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
  
    {
      title: "Received Enquiry",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Open Enquiry",
          url: "/open-received",
        },
        {
          title: "Close Enquiry",
          url: "/close-received",
        },
      ],
    },
    {
      title: "Sent Enquiry",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Open Enquiry",
          url: "/open-sent",
        },
        {
          title: "Close Enquiry",
          url: "/close-sent",
        },
        
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Create Enquiry",
  //     url: "/create-enquiry",
  //     icon: Frame,
  //   },
  //   // {
  //   //   name: "Sales & Marketing",
  //   //   url: "#",
  //   //   icon: PieChart,
  //   // },
  //   // {
  //   //   name: "Travel",
  //   //   url: "#",
  //   //   icon: Map,
  //   // },
  // ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}

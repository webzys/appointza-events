
import React from 'react';
import { Briefcase, Users, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    {
      title: "My Applications",
      value: "applications",
      icon: Briefcase,
    },
    {
      title: "My Services",
      value: "services",
      icon: Users,
    },
    {
      title: "Profile",
      value: "profile",
      icon: User,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/a9606503-e70f-4f98-bfea-fa89d55f3ea3.png" 
            alt="Logo" 
            className="w-8 h-8"
          />
          <div>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              My Status
            </h2>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-medium text-gray-900 mb-2 px-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className="w-full justify-start hover:bg-orange-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-100 data-[active=true]:to-blue-100"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

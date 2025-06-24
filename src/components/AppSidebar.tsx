
import React from 'react';
import { Briefcase, Users, User, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-gray-900 mb-4">
            My Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className="w-full justify-start"
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

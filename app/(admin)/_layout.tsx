import { Tabs } from "expo-router";
import { Layers, PackageCheck, User } from "lucide-react-native";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#171717",
        tabBarInactiveTintColor: "#a3a3a3",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f5f5f4",
          elevation: 0,
          shadowOpacity: 0,
          height: 85,
          paddingBottom: 25,
        },
      }}
    >
      <Tabs.Screen
        name="orders"
        options={{
          title: "Manage Orders",
          tabBarIcon: ({ color }) => (
            <PackageCheck size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="shoes"
        options={{
          title: "Manage Shoes",
          tabBarIcon: ({ color }) => (
            <Layers size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Admin Profile",
          tabBarIcon: ({ color }) => (
            <User size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

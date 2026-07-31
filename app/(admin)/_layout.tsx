import { Tabs } from "expo-router";
import { Layers, PackageCheck, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AdminLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, // Enabled labels for clear navigation
        tabBarActiveTintColor: "#171717",
        tabBarInactiveTintColor: "#a3a3a3",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f5f5f4",
          elevation: 0,
          shadowOpacity: 0,
          // Dynamically scale height to clear the gesture bar
          height: 64 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="orders"
        options={{
          title: "Manage Orders",
          tabBarIcon: ({ color }) => (
            <PackageCheck size={22} color={color} strokeWidth={2} /> // Subtler stroke width
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => (
            <Layers size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Admin Profile",
          tabBarIcon: ({ color }) => (
            <User size={22} color={color} strokeWidth={2} />
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
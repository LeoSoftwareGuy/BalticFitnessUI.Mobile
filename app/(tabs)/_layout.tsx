import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { ImageSourcePropType, View, Image, Text } from "react-native";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color}) => {
  return (
    <View className="pt-2 items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="pt-1 px-2 w-5 h-6"
      />
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#006F52",
          tabBarInactiveTintColor: "#C4C4C4",
          tabBarStyle: {
            position: "absolute", // Make it overlay on top of the page background
            backgroundColor: "#293240", // Ensures transparency
            borderTopColor: "transparent", // Removes border color at the top
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
            borderRadius: 40,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.stats}
                color={color}
                focused={focused}
                name="Profile"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="diet"
          options={{
            title: "Diet",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.meal}
                color={color}
                focused={focused}
                name="Diet"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

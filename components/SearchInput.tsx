import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";

interface SeachInputProps {
  initialQuery?: string;
}

const SearchInput: React.FC<SeachInputProps> = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View
      className="px-4 flex-row items-center w-full h-16 bg-black-100 border-2
       border-black-200 rounded-2xl focus:border-secondary space-x-4"
    >
      <TextInput
        className=" mt-0.5 flex-1 text-white font-pregular text-base"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      {/* <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please type soemthing to search for"
            );
          }

          // It updates the current search parameters instead of navigating to a new page unnecessarily, which contributes to a smoother and more responsive user experience.
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchInput;

/* Make flex-row and then flex-1 for element which you want to take all available space */

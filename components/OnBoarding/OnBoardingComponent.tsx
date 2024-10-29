import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import Paginator from "./Paginator"; // Assuming Paginator is working as expected
import OnBoardingSlide from "./OnBoardingSlide";

export interface InformationProps {
  id: number;
  title: string;
}

const slides: InformationProps[] = [
  {
    id: 1,
    title:
      "This app is your personal fitness companion, designed to track and optimize your workouts.",
  },
  {
    id: 2,
    title:
      "Log exercises, sets and reps with ease, while monitoring your progress overtime.",
  },
  {
    id: 3,
    title:
      "Whether you're a begineer or an experienced athlete, this app helps you stay on track.",
  },
];

const OnBoardingComponent = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const visibleItem = viewableItems[0];
      if (visibleItem && visibleItem.index !== null) {
        setCurrentIndex(visibleItem.index);
      }
    }
  );

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnBoardingSlide item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged.current}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default OnBoardingComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

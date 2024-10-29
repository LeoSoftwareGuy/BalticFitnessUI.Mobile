import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  ViewToken,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import Paginator from "./Paginator";
import OnBoardingSlide from "./OnBoardingItem";

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
      "Log exercises,sets and reps with ease,while monitoring your progress overtime.",
  },
  {
    id: 3,
    title:
      "Whether you're a beginner or an experienced athlete this app helps you stay on track",
  },
];

const OnBoardingComponent = () => {
  const { width } = Dimensions.get("window");
  const [currentItemId, setCurrentItemId] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(
    (info: {
      viewableItems: ViewToken<InformationProps>[];
      changed: ViewToken<InformationProps>[];
    }) => {
      const firstVisibleItem = info.viewableItems[0];
      if (firstVisibleItem && firstVisibleItem.index !== null) {
        setCurrentItemId(firstVisibleItem.index);
      }
    }
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnBoardingSlide item={item} />}
          keyExtractor={(id,index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged.current} // Add this to capture viewable items
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // Adjust visibility threshold if necessary
          }}
          scrollEventThrottle={32}
          ref={slidesRef}
          style={{ width }} // Ensure FlatList takes full width
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default OnBoardingComponent;

const styles = StyleSheet.create({
  container: {
    marginTop:430,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

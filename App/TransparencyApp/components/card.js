import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import React, { useState, useMemo } from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

const Card = ({ text, onSwipe }) => {
  const translateX = useSharedValue(0);

  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateX.value = event.translationX;
      })
      .onEnd((event) => {
        if (
          Math.abs(event.velocityX) > 500 &&
          Math.abs(event.translationX) > 100
        ) {
          // Swipe was fast and far enough to be considered a complete swipe
          onSwipe(event.translationX > 0 ? "right" : "left");
          translateX.value = withSpring(0); // Optional: Reset card position after swipe
        } else {
          // Not a full swipe, spring back to the original position
          translateX.value = withSpring(0);
        }
      });
  }, [onSwipe]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text>{text}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const CardContainer = () => {
  const [cards, setCards] = useState(["Card 1", "Card 2", "Card 3"]);

  const onSwipe = (swipedIndex, direction) => {
    console.log(`Swiped ${direction} on ${cards[swipedIndex]}`);

    // Move the swiped card to the end of the cards array
    setCards((currentCards) => {
      const nextCards = [...currentCards];
      const removed = nextCards.splice(swipedIndex, 1); // Remove the swiped card
      nextCards.push(...removed); // Add the removed card to the end
      return nextCards;
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {cards.map((card, index) => (
        // Adjusted to pass index and ensure onSwipe can identify the swiped card
        <Card key={index} text={card} onSwipe={() => onSwipe(index)} />
      ))}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
});

export default CardContainer;

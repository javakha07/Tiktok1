import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";
import Post from "../components/Post";
import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch(
    "https://us-central1-js04-b4877.cloudfunctions.net/api/next21/feed"
  );

  return res.json();
};

export default function feedScreen({ user }) {
  const mediaRefs = useRef([]);
  const { data, status } = useQuery("Data", fetchData);

  const onVideoChange = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        //console.log("onViewableChange", element, element.isViewable);
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          {
            flex: 1,
            height:
              Dimensions.get("window").height /* + StatusBar.currentHeight*/,
          },
          index % 2
            ? { backgroundColor: "blue" }
            : { backgroundColor: "yellow" },
        ]}
      >
        <Post
          item={item}
          ref={(PostRef) => (mediaRefs.current[item.id] = PostRef)}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={"normal"}
        onViewableItemsChanged={onVideoChange.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

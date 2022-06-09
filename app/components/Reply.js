import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

export default function Reply({ item, image }) {
  const [replyColor, setReplyColor] = useState(colors.medium);
  const [isLiked, setIsLiked] = useState(false);
  const [replyLikes, setReplyLikes] = useState(parseInt(item.likes));

  const updateLike = () => {
    if (isLiked) {
      setReplyColor(colors.medium);
      setIsLiked(false);
      setReplyLikes(replyLikes - 1);
    } else {
      setReplyColor(colors.primary);
      setIsLiked(true);
      setReplyLikes(replyLikes + 1);
    }
  };

  return (
    <>
      <View style={styles.cont}>
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            author
          </Text>
          <View style={styles.comment}>
            <Text style={styles.subTitle}>{item.text}</Text>
            <View style={styles.likes}>
              <TouchableOpacity onPress={() => updateLike(item.id)}>
                <MaterialCommunityIcons
                  name="cards-heart"
                  color={replyColor}
                  size={30}
                />
                <Text>{replyLikes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 35,
    marginRight: 15,
  },
  subTitle: {
    color: colors.medium,
    width: "80%",
  },
  title: {
    fontWeight: "500",
  },
  comment: {
    flex: 1,
    flexDirection: "row",
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Reply from "./Reply";

export default function Comment({ item, image }) {
  const fetchReplys = async () => {
    const res = await fetch(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/comments/${item.video_id}/${item.id}`
    );

    return res.json();
  };
  const { data: replyData, status: replyStatus } = useQuery(
    ["Replys", item.id],
    () => fetchReplys()
  );

  const [isLiked, setIsLiked] = useState(false);
  const [color, setColor] = useState(colors.medium);
  const [likes, setLikes] = useState(parseInt(item.likes));

  const [replys, setReplys] = useState(replyData);

  const updateReplys = () => {
    const newComment = {
      id: item.video_id,
      parent_comment_id: null,
      text: input,
      video_id: item.id,
      likes: "0",
    };
    const com = {
      parent_comment_id: null,
      text: input,
      video_id: item.id,
    };
    setReplys([newComment, ...replys]);
  };

  const updateLike = (id) => {
    if (isLiked) {
      handleUnlike(id);
      setColor(colors.medium);
      setIsLiked(false);
      setLikes(likes - 1);
    } else {
      handleLike(id);
      setColor(colors.primary);
      setIsLiked(true);
      setLikes(likes + 1);
    }
  };
  const addLike = async (id) => {
    const response = await fetch(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/comment/${id}/like`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    return response.json();
  };
  const unLike = async (id) => {
    const response = await fetch(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/comment/${id}/unlike`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    return response.json();
  };

  const { mutate: handleLike } = useMutation((id) => addLike(id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      console.log("secc", res);
    },
  });

  const { mutate: handleUnlike } = useMutation((id) => unLike(id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      console.log("secc", res);
    },
  });

  return (
    <View>
      <View style={styles.container}>
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
                  color={color}
                  size={30}
                />
                <Text>{likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {replyData && (
        <FlatList
          style={{ marginLeft: 40 }}
          data={replys}
          keyExtractor={(reply) => reply.id}
          renderItem={({ item }) => {
            return <Reply item={item} image={image} />;
          }}
        />
      )}
    </View>
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

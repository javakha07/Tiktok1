import { StyleSheet, View, FlatList, Image } from "react-native";
import React, { useState, forwardRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import AppTextInput from "./TextInput";
import Comment from "./Comment";
import colors from "../config/colors";
import AppText from "./Text";
import AppButton from "./Button";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import axios from "axios";

const fetchComments = async (id) => {
  const res = await fetch(
    `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/comments/${id}`
  );

  return res.json();
};

const addComment = async (body) => {
  axios
    .post(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/comment/add`,
      body
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
const Modal = ({ item, indexProp, onClose, comments }) => {
  const { data, status } = useQuery(
    ["Comments", item.id],
    () => fetchComments(item.id),
    { enabled: comments, refetchOnWindowFocus: false }
  );

  //console.log(data);

  const [messages, setMessages] = useState(data);

  const [input, setInput] = useState(" ");

  const updateComments = () => {
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
    setMessages([newComment, ...messages]);
    addComment(com);
  };

  return (
    <BottomSheet
      snapPoints={["60%"]}
      index={indexProp}
      handleHeight={40}
      enablePanDownToClose
      onClose={onClose}
    >
      <ScrollView>
        {data && (
          <FlatList
            data={messages}
            keyExtractor={(message) => message.id}
            renderItem={({ item }) => {
              return (
                <>
                  <Comment
                    item={item}
                    image={require("../assets/profile.png")}
                  />
                </>
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderBottomColor: colors.light,
                    borderBottomWidth: 1,
                  }}
                />
              );
            }}
          />
        )}
      </ScrollView>
      <View style={styles.inputCont}>
        <View style={styles.input}>
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <AppText style={{ color: colors.black }}>Tom Hanks</AppText>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <AppTextInput
                onChange={setInput}
                width="80%"
                style={{ flex: 1 }}
              />
              <AppButton
                onPress={updateComments}
                image={require("../assets/upload.png")}
                title="1"
              />
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    position: "absolute",
    width: "100%",
    backgroundColor: colors.white,
    bottom: 0,
  },
  input: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 35,
    marginRight: 10,
  },
  container: { flex: 1 },
});

export default Modal;

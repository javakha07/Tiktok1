import { StyleSheet, Text, View, Image, Share } from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Video } from "expo-av";
import Screen from "./Screen";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "./Button";
import AppText from "./Text";
import Modal from "./Modal";
import { useMutation, useQuery } from "react-query";
import colors from "../config/colors";

export const Post = forwardRef((props, parentRef) => {
  const ref = useRef(null);

  const comRef = useRef(null);

  useImperativeHandle(parentRef, () => ({ play, unload, stop }));
  const [index, setIndex] = useState(-1);

  const [likes, setLikes] = useState(parseInt(props.item.likes));
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState(false);

  const addLike = async (id) => {
    const response = await fetch(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/like_video/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    return response.json();
  };

  const unLike = async (id) => {
    const response = await fetch(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/unlike_video/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    return response.json();
  };

  const openComments = () => {
    setIndex(0);
    setComments(true);
  };
  const onClose = () => {
    setIndex(-1);
  };

  useEffect(() => {
    return () => {
      unload;
    };
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const play = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();

    if (status?.isPlaying) {
      return;
    }
    try {
      if (ref.current) {
        await ref.current.playAsync();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const stop = async () => {
    if (ref.current == null) {
      return;
    }

    const status = await ref.current.getStatusAsync();

    if (!status?.isPlaying) {
      return;
    }
    try {
      if (ref.current) {
        await ref.current.stopAsync();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const unload = async () => {
    if (ref.current == null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log("ERROR");
    }
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
  const onLike = (id) => {
    if (isLiked) {
      handleUnlike(id);
      setLikes(likes - 1);
    } else {
      handleLike(id);
      setLikes(likes + 1);
    }
    setIsLiked((prevState) => !prevState);
  };

  return (
    <>
      <Screen style={styles.container}>
        <Video
          ref={ref}
          style={styles.container}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={true}
          source={{
            uri: props.item.video_url,
          }}
          posterStyle={{ resizeMode: "cover", height: "100%" }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.4)", "transparent"]}
          style={styles.grad}
        />
        <Image style={styles.notif} source={require("../assets/bell.png")} />

        <AppText
          style={{
            fontFamily: "InterSemiBold",
            position: "absolute",
            top: 30,
            left: 40,
            fontSize: 16,
            color: colors.white,
          }}
        >
          Recommended
        </AppText>
        <AppText
          style={{
            fontFamily: "InterSemiBold",
            position: "absolute",

            top: 30,
            left: 160,
            fontSize: 16,
            color: colors.medium,
          }}
        >
          | Following
        </AppText>

        <View style={styles.buttonContainers}>
          <AppButton title="Follow" image={{ uri: props.item.author.image }} />
          <AppButton
            title={likes}
            image={require("../assets/like.png")}
            onPress={() => onLike(props.item.id)}
          />
          <AppButton
            title={props.item.comments}
            image={require("../assets/comment.png")}
            onPress={openComments}
          />
          <AppButton
            title={props.item.shares}
            image={require("../assets/share.png")}
            onPress={onShare}
          />
        </View>
        <AppText
          style={{
            fontFamily: "InterBold",
            position: "absolute",
            bottom: 5,
            left: 15,
            fontSize: 16,
            width: "80%",
          }}
        >
          {props.item.author.username} {"\n"}
          {props.item.description}
          #SAP #AwesomeLogos
        </AppText>
        <Modal
          comments={comments}
          item={props.item}
          indexProp={index}
          onClose={onClose}
        />
      </Screen>
    </>
  );
});

const styles = StyleSheet.create({
  grad: {
    position: "absolute",
    top: 0,
    height: 200,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  text: {
    fontSize: 100,
    position: "absolute",
    top: 5,
    right: 5,
  },
  notif: {
    position: "absolute",
    top: 35,
    right: 5,
    width: 45,
    height: 45,
  },
  buttonContainers: {
    position: "absolute",
    right: 15,
    bottom: 10,
  },
});

export default Post;

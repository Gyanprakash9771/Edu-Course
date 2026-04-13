import { useRoute } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import API from "../services/api";

export default function CoursePlayerContent({ isMobile }) {
  const route = useRoute();
  const { id } = route.params;

  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [activeIndex, setActiveIndex] = useState(null); // ✅ NEW

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);

      const first = res.data.sections?.[0]?.lessons?.[0];
      if (first) {
        setVideo(first.video);
        setTitle(first.title);
        setActiveIndex("0-0"); // ✅ first active
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

  return (
    <Box flexDirection={isMobile ? "column" : "row"}>

      {/* LEFT SIDE */}
      <ScrollView style={{ width: isMobile ? "100%" : "30%" }}>
        <Box p={3}>
          <Text bold mb={3}>Course Content</Text>

          {course.sections?.map((sec, i) => (
            <Box key={i} mb={3}>
              <Text bold>{sec.title}</Text>

              {sec.lessons?.map((lec, j) => {
                const key = `${i}-${j}`;
                const isActive = activeIndex === key;

                return (
                  <Pressable
                    key={j}
                    onPress={() => {
                      console.log("CLICKED:", lec.title);

                      setVideo(""); // ✅ FORCE REFRESH
                      setTimeout(() => {
                        setVideo(lec.video);
                      }, 50);

                      setTitle(lec.title);
                      setActiveIndex(key);
                    }}
                  >
                    <Box
                      p={2}
                      mt={2}
                      borderWidth={1}
                      borderRadius={6}
                      bg={isActive ? "#43b39c" : "white"} // ✅ highlight
                    >
                      <Text color={isActive ? "white" : "black"}>
                        ▶ {lec.title}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          ))}
        </Box>
      </ScrollView>

      {/* RIGHT SIDE */}
      <Box flex={1} p={3}>
        <Box height={250}>

          {video ? (
            Platform.OS === "web" ? (
              <iframe
                key={video} // ✅ FORCE RELOAD
                width="100%"
                height="100%"
                src={video}
                title="video"
                allowFullScreen
                style={{ border: "none" }}
              />
            ) : (
              <WebView
                key={video} // ✅ FORCE RELOAD
                source={{ uri: video }}
                style={{ flex: 1 }}
              />
            )
          ) : (
            <Text textAlign="center">Loading video...</Text>
          )}

        </Box>

        <Text mt={3} bold>{title}</Text>
      </Box>

    </Box>
  );
}
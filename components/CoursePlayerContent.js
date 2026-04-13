import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
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
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);

      const first = res.data.sections?.[0]?.lessons?.[0];
      if (first) {
        setVideo(first.video);
        setTitle(first.title);
        setActiveIndex("0-0");
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

  return (
    <Box flexDirection={isMobile ? "column" : "row"}>

      {/* LEFT PANEL (30%) */}
      <ScrollView
        style={{
          width: isMobile ? "100%" : "30%", // ✅ FIXED
          backgroundColor: "#f8f9fa",
          borderRightWidth: isMobile ? 0 : 1, // ✅ CLEAN LOOK
          borderColor: "#e5e5e5",
        }}
      >
        <Box p={3}>
          <Text bold fontSize="lg" mb={3}>
            Course Content
          </Text>

          {course.sections?.map((sec, i) => (
            <Box key={i} mb={4}>
              <Box bg="white" p={3} borderRadius={8} shadow={1}>
                <Text bold fontSize="md">{sec.title}</Text>
              </Box>

              <VStack mt={2} space={2}>
                {sec.lessons?.map((lec, j) => {
                  const key = `${i}-${j}`;
                  const isActive = activeIndex === key;

                  return (
                    <Pressable
                      key={j}
                      onPress={() => {
                        setVideo("");
                        setTimeout(() => setVideo(lec.video), 50);
                        setTitle(lec.title);
                        setActiveIndex(key);
                      }}
                    >
                      <HStack
                        alignItems="center"
                        space={3}
                        p={3}
                        borderRadius={8}
                        bg={isActive ? "#43b39c" : "white"}
                        borderWidth={1}
                        borderColor={isActive ? "#43b39c" : "#e5e5e5"}
                      >
                        <Ionicons
                          name="play-circle"
                          size={22}
                          color={isActive ? "white" : "#43b39c"}
                        />

                        <Text
                          flex={1}
                          color={isActive ? "white" : "black"}
                          fontWeight={isActive ? "bold" : "normal"}
                        >
                          {lec.title}
                        </Text>
                      </HStack>
                    </Pressable>
                  );
                })}
              </VStack>
            </Box>
          ))}
        </Box>
      </ScrollView>

      {/* RIGHT SIDE (70%) */}
      <Box
        style={{ width: isMobile ? "100%" : "70%" }} // ✅ FIXED
        p={isMobile ? 3 : 5}
      >

        {/* VIDEO PLAYER */}
        <Box
          height={isMobile ? 250 : 500} // ✅ BIGGER VIDEO
          borderRadius={12}
          overflow="hidden"
          bg="black"
        >
          {video ? (
            Platform.OS === "web" ? (
              <iframe
                key={video}
                width="100%"
                height="100%"
                src={video}
                title="video"
                allowFullScreen
                style={{ border: "none" }}
              />
            ) : (
              <WebView
                key={video}
                source={{ uri: video }}
                style={{ flex: 1 }}
              />
            )
          ) : (
            <Text color="white" textAlign="center" mt={10}>
              Loading video...
            </Text>
          )}
        </Box>

        {/* TITLE */}
        <Box mt={4}>
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </Box>
      </Box>

    </Box>
  );
}
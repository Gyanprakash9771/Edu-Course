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
  const [completed, setCompleted] = useState([]); // ✅ NEW

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

  // ✅ TOTAL PROGRESS
  const totalLessons =
    course.sections?.reduce(
      (acc, sec) => acc + (sec.lessons?.length || 0),
      0
    ) || 0;

  const progressPercent = totalLessons
    ? Math.round((completed.length / totalLessons) * 100)
    : 0;

  // ✅ FLATTEN LESSONS (for next/prev)
  const flatLessons = course.sections.flatMap((sec, i) =>
    sec.lessons.map((lec, j) => ({
      ...lec,
      key: `${i}-${j}`,
    }))
  );

  const currentIndex = flatLessons.findIndex(
    (l) => l.key === activeIndex
  );

  const goToLesson = (lesson) => {
    setVideo("");
    setTimeout(() => setVideo(lesson.video), 50);
    setTitle(lesson.title);
    setActiveIndex(lesson.key);

    if (!completed.includes(lesson.key)) {
      setCompleted([...completed, lesson.key]);
    }
  };

  return (
    <Box flexDirection={isMobile ? "column" : "row"}>

      {/* LEFT PANEL */}
      <ScrollView
        style={{
          width: isMobile ? "100%" : "30%",
          backgroundColor: "#f8f9fa",
          borderRightWidth: isMobile ? 0 : 1,
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
                  const isDone = completed.includes(key);

                  return (
                    <Pressable
                      key={j}
                      onPress={() =>
                        goToLesson({ ...lec, key })
                      }
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
                          name={
                            isDone
                              ? "checkmark-circle"
                              : "play-circle"
                          }
                          size={22}
                          color={
                            isDone
                              ? "#22c55e"
                              : isActive
                              ? "white"
                              : "#43b39c"
                          }
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

      {/* RIGHT SIDE */}
      <Box
        style={{ width: isMobile ? "100%" : "70%" }}
        p={isMobile ? 3 : 5}
      >

        {/* ✅ PROGRESS BAR */}
        <Box mb={4}>
          <Text bold mb={1}>
            Progress: {progressPercent}%
          </Text>
          <Box bg="#e5e5e5" height={3} borderRadius={5}>
            <Box
              bg="#43b39c"
              height={3}
              borderRadius={5}
              width={`${progressPercent}%`}
            />
          </Box>
        </Box>

        {/* VIDEO */}
        <Box
          height={isMobile ? 250 : 500}
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
                src={`${video}?autoplay=1&rel=0`}
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

        {/* ✅ NEXT / PREV */}
        <HStack justifyContent="space-between" mt={4}>
          <Pressable
            onPress={() =>
              currentIndex > 0 &&
              goToLesson(flatLessons[currentIndex - 1])
            }
          >
            <Text color="#43b39c">⬅ Previous</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              currentIndex < flatLessons.length - 1 &&
              goToLesson(flatLessons[currentIndex + 1])
            }
          >
            <Text color="#43b39c">Next ➡</Text>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
}
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
  const [completed, setCompleted] = useState([]);
  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  const totalLessons =
    course.sections?.reduce(
      (acc, sec) => acc + (sec.lessons?.length || 0),
      0
    ) || 0;

  const progressPercent = totalLessons
    ? Math.round((completed.length / totalLessons) * 100)
    : 0;

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
  };

  return (
    <Box flexDirection={isMobile ? "column" : "row"}>

      {/* ✅ UPDATED SIDEBAR */}
      <ScrollView
        style={{
          width: isMobile ? "100%" : "30%",
          backgroundColor: "#f8f9fa",
          borderRightWidth: isMobile ? 0 : 1,
          borderColor: "#e5e5e5",
        }}
      >
        <Box p={2}>
          <Text fontSize="md" mb={2} color="#333">
            Course Content
          </Text>

          {course.sections?.map((sec, i) => {
            const total = sec.lessons?.length || 0;
            const done = sec.lessons.filter((_, j) =>
              completed.includes(`${i}-${j}`)
            ).length;

            return (
              <Box key={i} mb={1}>

                {/* SECTION HEADER */}
                <Pressable onPress={() => toggleSection(i)}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={2}
                    bg="#e9ecef"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {sec.title}
                    </Text>

                    <HStack alignItems="center" space={2}>
                      <Text fontSize="xs" color="#666">
                        {done}/{total}
                      </Text>

                      <Ionicons
                        name={
                          openSections[i]
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={14}
                        color="#666"
                      />
                    </HStack>
                  </HStack>
                </Pressable>

                {/* LESSONS */}
                {openSections[i] && (
                  <VStack>
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
                            justifyContent="space-between"
                            px={3}
                            py={2}
                            bg={isActive ? "#dee2e6" : "transparent"}
                          >

                            {/* LEFT */}
                            <HStack
                              alignItems="center"
                              space={2}
                              flex={1}
                            >
                              <Ionicons
                                name={
                                  isDone
                                    ? "checkmark-circle"
                                    : "play-outline"
                                }
                                size={16}
                                color={
                                  isDone
                                    ? "#22c55e"
                                    : "#6c757d"
                                }
                              />

                              <Text
                                fontSize="sm"
                                color="#333"
                                numberOfLines={1}
                              >
                                {lec.title}
                              </Text>
                            </HStack>

                            {/* RIGHT */}
                            <Text fontSize="xs" color="#6c757d">
                              {lec.duration || "03:54"}
                            </Text>
                          </HStack>
                        </Pressable>
                      );
                    })}
                  </VStack>
                )}
              </Box>
            );
          })}
        </Box>
      </ScrollView>

      {/* ✅ RIGHT SIDE (UNCHANGED) */}
      <Box
        style={{ width: isMobile ? "100%" : "70%" }}
        p={isMobile ? 3 : 5}
      >

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

        <Box mt={4}>
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </Box>

        <Box mt={3}>
          <Pressable
            onPress={() => {
              if (!completed.includes(activeIndex)) {
                setCompleted([...completed, activeIndex]);
              }
            }}
          >
            <Box
              bg="#22c55e"
              p={3}
              borderRadius={8}
              alignItems="center"
            >
              <Text color="white" bold>
                Mark as Completed
              </Text>
            </Box>
          </Pressable>
        </Box>

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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ ADDED
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export default function CourseMainContent({ isMobile, course }) {

  const [openSection, setOpenSection] = useState("section1");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Box
      flex={isMobile ? 1 : 0.7}
      mt={8}
      px={isMobile ? 3 : 10}
      bg="white"
      maxW={isMobile ? "100%" : "1200px"}
      w="100%"
      mx="auto"
    >

      {/* ================= ABOUT COURSE ================= */}
      <Box mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={3}>
          About Course
        </Text>

        <Text color="gray.600" lineHeight={26}>
          {course?.description || "No description available"}
        </Text>
      </Box>

      {/* ================= WHAT YOU WILL LEARN ================= */}
      <Box mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          What Will You Learn?
        </Text>

        {course?.whatYouWillLearn?.length ? (
          isMobile ? (
            <VStack space={4}>
              {course.whatYouWillLearn.map((item, i) => (
                <LearnItem key={i} text={item} />
              ))}
            </VStack>
          ) : (
            <HStack flexWrap="wrap" justifyContent="space-between">
              <VStack space={4} width="48%">
                {course.whatYouWillLearn
                  .slice(0, Math.ceil(course.whatYouWillLearn.length / 2))
                  .map((item, i) => (
                    <LearnItem key={i} text={item} />
                  ))}
              </VStack>

              <VStack space={4} width="48%">
                {course.whatYouWillLearn
                  .slice(Math.ceil(course.whatYouWillLearn.length / 2))
                  .map((item, i) => (
                    <LearnItem key={i} text={item} />
                  ))}
              </VStack>
            </HStack>
          )
        ) : (
          <Text color="gray.400">No learning content available</Text>
        )}
      </Box>

      {/* ================= COURSE CONTENT ================= */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          Course Content
        </Text>

        {course?.sections?.length ? (
          course.sections.map((section, index) => (
            <CourseSection
              key={index}
              title={section.title}
              isOpen={openSection === `section${index}`}
              onPress={() => toggleSection(`section${index}`)}
              lessons={section.lessons || []}
              courseId={course?._id}   // ✅ ADDED
            />
          ))
        ) : (
          <Text color="gray.400">No content available</Text>
        )}
      </Box>
    </Box>
  );
}

/* 🔹 SECTION */
const CourseSection = ({ title, isOpen, onPress, lessons, courseId }) => {

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? contentHeight : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight]);

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius="xl" mb={4} overflow="hidden" bg="white" shadow={1} w="100%">
      <Pressable onPress={onPress}>
        <HStack justifyContent="space-between" alignItems="center" px={4} py={4} bg={isOpen ? "gray.50" : "gray.100"}>
          <Text fontWeight="bold" fontSize="md">{title}</Text>
          <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="gray" />
        </HStack>
      </Pressable>

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <VStack onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
          {lessons.map((item, index) => (
            <Lesson key={index} {...item} courseId={courseId} />  // ✅ ADDED
          ))}
        </VStack>
      </Animated.View>
    </Box>
  );
};

/* 🔹 LEARN ITEM */
const LearnItem = ({ text }) => (
  <HStack alignItems="flex-start" space={2}>
    <Ionicons name="checkmark-circle" size={18} color="#43b39c" />
    <Text flex={1} color="gray.700" lineHeight={22}>{text}</Text>
  </HStack>
);

/* 🔥 FINAL LESSON */
const Lesson = ({ title, time, video, courseId }) => {

  const navigation = useNavigation(); // ✅ ADDED

  return (
    <Pressable
      onPress={() => {
        if (!video) {
          alert("Video not available ❌");
          return;
        }

        // ✅ NAVIGATION
        navigation.navigate("CoursePlayer", {
          id: courseId,
          video: video,
          title: title,
        });
      }}
    >
      <HStack justifyContent="space-between" alignItems="center" px={4} py={4} borderTopWidth={1} borderColor="gray.100">
        <HStack alignItems="center" space={3} flex={1}>
          <Ionicons name="play-circle-outline" size={20} color="#43b39c" />
          <Text flex={1}>{title}</Text>
        </HStack>

        <HStack alignItems="center" space={3}>
          {time && <Text fontSize="sm">{time}</Text>}
          <Ionicons name="play-circle" size={18} color="#43b39c" />
        </HStack>
      </HStack>
    </Pressable>
  );
};
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export default function CourseMainContent({ isMobile }) {

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
          There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form by injected
          humour, or randomised words which don’t look even slightly believable.
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </Text>
      </Box>

      {/* ================= WHAT YOU WILL LEARN ================= */}
      <Box mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          What Will You Learn?
        </Text>

        {isMobile ? (
          <VStack space={4}>
            <LearnItem text="Practice your new skills with coding challenges (solutions included)" />
            <LearnItem text="Get friendly and fast support in the course Q&A" />
            <LearnItem text="Organize and structure your code using software patterns like modules" />
            <LearnItem text="Downloadable lectures, code and design assets for all projects" />
          </VStack>
        ) : (
          <HStack flexWrap="wrap" justifyContent="space-between">
            <VStack space={4} width="48%">
              <LearnItem text="Practice your new skills with coding challenges (solutions included)" />
              <LearnItem text="Get friendly and fast support in the course Q&A" />
            </VStack>

            <VStack space={4} width="48%">
              <LearnItem text="Organize and structure your code using software patterns like modules" />
              <LearnItem text="Downloadable lectures, code and design assets for all projects" />
            </VStack>
          </HStack>
        )}
      </Box>

      {/* ================= COURSE CONTENT ================= */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          Course Content
        </Text>

        <CourseSection
          title="Getting Started"
          isOpen={openSection === "section1"}
          onPress={() => toggleSection("section1")}
          lessons={[
            { title: "How to use the Course", time: "03:54" },
            { title: "Class project 01 - Create your own brief", time: "04:33" },
            { title: "Life Coaches in Design", time: "02:44" },
            { title: "Make it Pretty", time: "04:05" },
            { title: "Quiz – UX Design", type: "quiz" },
            { title: "Understanding user friendly experience", time: "11:00" },
          ]}
        />

        <CourseSection
          title="What is Design?"
          isOpen={openSection === "section2"}
          onPress={() => toggleSection("section2")}
          lessons={[
            { title: "Design Process", time: "08:44" },
            { title: "Process Problems", time: "04:00" },
            { title: "Divergence & Convergence", time: "02:09" },
          ]}
        />

        <CourseSection
          title="Research (Exercises)"
          isOpen={openSection === "section3"}
          onPress={() => toggleSection("section3")}
          lessons={[
            { title: "Test Assumptions", time: "10:05" },
            { title: "Another User Interview", time: "04:08" },
            { title: "Competitive Analysis", time: "08:45" },
          ]}
        />

      </Box>
    </Box>
  );
}

/* 🔹 SECTION (ANIMATED HEIGHT FIX) */
const CourseSection = ({ title, isOpen, onPress, lessons }) => {

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? contentHeight: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight]);

  return (
    <Box
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="xl"
      mb={4}
      overflow="hidden"
      bg="white"
      shadow={1}
      w="100%"
    >

      <Pressable onPress={onPress}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={4}
          bg={isOpen ? "gray.50" : "gray.100"}
        >
          <Text fontWeight="bold" fontSize="md">
            {title}
          </Text>

          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="gray"
          />
        </HStack>
      </Pressable>

      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <VStack
          onLayout={(e) => {
            setContentHeight(e.nativeEvent.layout.height);
          }}
        >
          {lessons.map((item, index) => (
            <Lesson key={index} {...item} />
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
    <Text flex={1} color="gray.700" lineHeight={22}>
      {text}
    </Text>
  </HStack>
);

/* 🔹 LESSON ITEM */
const Lesson = ({ title, time, type = "video" }) => (
  <HStack
    justifyContent="space-between"
    alignItems="center"
    px={4}
    py={4}
    borderTopWidth={1}
    borderColor="gray.100"
    _hover={{ bg: "gray.50" }}
    w="100%"
  >
    <HStack alignItems="center" space={3} flex={1}>
      {type === "quiz" ? (
        <Ionicons name="help-circle-outline" size={20} color="#f59e0b" />
      ) : (
        <Ionicons name="play-circle-outline" size={20} color="#43b39c" />
      )}

      <Text color="gray.700" flex={1} fontSize="md">
        {title}
      </Text>
    </HStack>

    <HStack alignItems="center" space={3}>
      {time && (
        <Text color="gray.400" fontSize="sm">
          {time}
        </Text>
      )}
      <Ionicons name="lock-closed-outline" size={18} color="gray" />
    </HStack>
  </HStack>
);
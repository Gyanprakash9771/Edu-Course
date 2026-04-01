import { Ionicons } from "@expo/vector-icons";
import { Box, Button, HStack, Image, Text, VStack } from "native-base";

export default function CourseSidebar({ course, isMobile }) {
  return (
    <Box
      flex={isMobile ? 1 : 0.3}
      mt={isMobile ? 100 : 0}
      mx={isMobile ? 2 : 0}
    >

      {/* ================= MAIN CARD ================= */}
      <Box bg="white" borderRadius="2xl" shadow={6} overflow="hidden">

        {/* 🎥 VIDEO THUMBNAIL */}
        <Box position="relative">
          <Image
            source={{
              uri: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
            }}
            alt="video"
            height={220}   // 🔥 slightly reduced for clean look
            width="100%"
          />

          {/* ▶ PLAY BUTTON */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform={[{ translateX: -25 }, { translateY: -25 }]}
            bg="red.500"
            p={3}
            borderRadius="full"
            shadow={4}   // 🔥 glow effect
          >
            <Ionicons name="play" size={22} color="white" />
          </Box>
        </Box>

        {/* 📦 CONTENT */}
        <VStack p={5} space={4}>

          <Button
            bg="#43b39c"
            borderRadius="lg"
            _hover={{ bg: "#379e8c" }}
            py={3}
          >
            Enroll Now
          </Button>

          <Text textAlign="center" fontSize="xs" color="gray.400">
            Free access this course
          </Text>

          {/* DETAILS */}
          <VStack space={3} mt={2}>
            <DetailRow label="Price" value="Free" highlight />
            <DetailRow label="Enrolled" value="3 Students" />
            <DetailRow label="Duration" value="8 hours 20 minutes" />
            <DetailRow label="Lessons" value="14 Lessons" />
            <DetailRow label="Quiz" value="1 Quiz" />
            <DetailRow label="Skill Level" value="Expert" />
            <DetailRow label="Category" value={course?.category} />
            <DetailRow label="Language" value="Spanish" />
          </VStack>

          {/* SHARE */}
          <HStack justifyContent="center" alignItems="center" mt={3} space={2}>
            <Text fontSize="sm" color="gray.500">
              Share this course
            </Text>
            <Ionicons name="share-social-outline" size={16} color="gray" />
          </HStack>

        </VStack>
      </Box>

      {/* ================= INSTRUCTOR ================= */}
      <Box mt={6} bg="white" p={5} borderRadius="2xl" shadow={3}>
        <Text fontWeight="bold" mb={3}>
          A course by
        </Text>

        <HStack alignItems="center" space={3}>
          <Box bg="gray.100" p={3} borderRadius="full">
            <Ionicons name="person" size={20} color="gray" />
          </Box>

          <Text fontWeight="medium">varshik</Text>
        </HStack>
      </Box>

      {/* ================= TAGS ================= */}
      <Box mt={4} bg="white" p={5} borderRadius="2xl" shadow={2}>
        <Text fontWeight="bold" mb={3}>
          Tags
        </Text>

        <HStack flexWrap="wrap">
          <Tag text="Cybersecurity" />
          <Tag text="Email Marketing" />
          <Tag text="Machine Learning" />
          <Tag text="UI/UX Design" />
        </HStack>
      </Box>

    </Box>
  );
}

/* 🔹 DETAIL ROW (IMPROVED) */
const DetailRow = ({ label, value, highlight }) => (
  <HStack
    justifyContent="space-between"
    alignItems="center"
    borderBottomWidth={1}
    borderColor="gray.100"
    pb={2}
  >
    <Text color="gray.500" fontSize="sm">
      {label} :
    </Text>
    <Text
      color={highlight ? "red.500" : "gray.700"}
      fontWeight="semibold"
      fontSize="sm"
    >
      {value}
    </Text>
  </HStack>
);

/* 🔹 TAG CHIP (MODERN STYLE) */
const Tag = ({ text }) => (
  <Box
    bg="gray.100"
    px={3}
    py={1}
    borderRadius="full"
    mr={2}
    mb={2}
  >
    <Text fontSize="xs" color="gray.700">
      {text}
    </Text>
  </Box>
);
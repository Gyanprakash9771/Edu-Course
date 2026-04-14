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
        {/* 🎥 VIDEO THUMBNAIL */}
<Box position="relative">
  <Image
    source={{
      uri: course?.previewVideo
        ? `https://img.youtube.com/vi/${course.previewVideo.split("/embed/")[1]}/maxresdefault.jpg`
        : "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
    }}
    alt="video"
    height={220}
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
    shadow={4}
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
            {course?.price === 0 || course?.price === "Free"
              ? "Free access this course"
              : "Paid course"}
          </Text>

          {/* DETAILS */}
          <VStack space={3} mt={2}>
            <DetailRow
              label="Price"
              value={course?.price || "Free"}
              highlight
            />
            <DetailRow
              label="Enrolled"
              value={`${course?.enrolled || 0} Students`}  
            />
            <DetailRow
              label="Duration"
              value={course?.duration || "N/A"}
            />
            <DetailRow
              label="Lessons"
              value={`${course?.lessons || 0} Lessons`}   
            />
            <DetailRow
              label="Quiz"
              value={`${course?.totalQuizzes || 0} Quiz`}
            />
            <DetailRow
              label="Skill Level"
              value={course?.level || "All Levels"}
            />
            <DetailRow
              label="Category"
              value={
                course?.category?.name || course?.category || "General"
              }   
            />
            <DetailRow
              label="Language"
              value={course?.language || "English"}
            />
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

          <Text fontWeight="medium">
            {course?.instructor || "Unknown"}
          </Text>
        </HStack>
      </Box>

      {/* ================= TAGS ================= */}
      <Box mt={4} bg="white" p={5} borderRadius="2xl" shadow={2}>
        <Text fontWeight="bold" mb={3}>
          Tags
        </Text>

        <HStack flexWrap="wrap">
          {course?.tags?.length ? (
            course.tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))
          ) : (
            <>
              <Tag text="General" />
            </>
          )}
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
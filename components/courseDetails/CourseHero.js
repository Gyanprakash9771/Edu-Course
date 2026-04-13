import { Avatar, Box, HStack, Text } from "native-base";

export default function CourseHero({ course, isMobile }) {
  return (
    <Box
      bg="#080808"
      px={isMobile ? 4 : 12}
      py={isMobile ? 10 : 20}
      minH={isMobile ? 250 : 450}
      justifyContent="center"
    >
      <HStack
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* LEFT CONTENT */}
        <Box maxW={isMobile ? "100%" : "750px"}>
          
          {/* 🔗 BREADCRUMB */}
          <Text color="gray.400" fontSize={isMobile ? "sm" : "md"} mb={4}>
            Home {'>'} Course {'>'}{' '}
            <Text color="#43b39c">{course?.title}</Text>
          </Text>

          {/* 🏷 TITLE */}
          <Text
            color="white"
            fontSize={isMobile ? "3xl" : "5xl"}
            fontWeight="bold"
            lineHeight={isMobile ? "38px" : "60px"}
          >
            {course?.title}
          </Text>

          {/* 📝 DESCRIPTION (DYNAMIC) */}
          <Text
            color="gray.300"
            mt={5}
            fontSize={isMobile ? "md" : "lg"}
            lineHeight={isMobile ? "22px" : "28px"}
          >
            {course?.description
              ? course.description
              : `Learn everything about ${
    typeof course?.category === "object"
      ? course.category?.name
      : course?.category
  }`}
          </Text>

          {/* ⭐ META INFO */}
          <HStack
            mt={6}
            space={5}
            alignItems="center"
            flexWrap="wrap"
          >
            {/* 👤 Instructor */}
            <HStack alignItems="center" space={2}>
              <Avatar size="sm" />
              <Text color="white" fontSize="md">
                {course?.instructor || "Unknown Instructor"}
              </Text>
            </HStack>

            {/* Divider */}
            <Text color="gray.500">|</Text>

            {/* ⭐ Rating (static for now) */}
            <Text color="yellow.400" fontSize="md">
              ★★★★★
            </Text>
            <Text color="gray.300" fontSize="md">
              (5.00 / 4 Reviews)
            </Text>

            {/* Divider */}
            <Text color="gray.500">|</Text>

            {/* 📅 Date (dynamic from DB) */}
            <Text color="gray.400" fontSize="md">
              Last Updated :{" "}
              {course?.updatedAt
                ? new Date(course.updatedAt).toDateString()
                : "N/A"}
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}
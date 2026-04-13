import { Box, HStack, Text } from "native-base";

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
        </Box>
      </HStack>
    </Box>
  );
}
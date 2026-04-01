import { Avatar, Box, HStack, Text } from "native-base";

export default function CourseHero({ course, isMobile }) {
  return (
    <Box
      bg="#080808"
      px={isMobile ? 4 : 12}
      py={isMobile ? 10 : 20}   // 🔥 increased height
      minH={isMobile ? 250 : 450} // 🔥 ensures bigger hero
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
            fontSize={isMobile ? "3xl" : "5xl"} // 🔥 bigger title
            fontWeight="bold"
            lineHeight={isMobile ? "38px" : "60px"}
          >
            {course?.title}
          </Text>

          {/* 📝 DESCRIPTION */}
          <Text
            color="gray.300"
            mt={5}
            fontSize={isMobile ? "md" : "lg"} // 🔥 bigger text
            lineHeight={isMobile ? "22px" : "28px"}
          >
            Welcome to this tutorial designed to help you learn quickly and
            thoroughly. In this course, you'll dive into {course?.category}.
          </Text>

          {/* ⭐ META INFO */}
          <HStack
            mt={6}
            space={5}
            alignItems="center"
            flexWrap="wrap"
          >
            {/* Avatar + Name */}
            <HStack alignItems="center" space={2}>
              <Avatar size="sm" />
              <Text color="white" fontSize="md">
                varshik
              </Text>
            </HStack>

            {/* Divider */}
            <Text color="gray.500">|</Text>

            {/* Rating */}
            <Text color="yellow.400" fontSize="md">
              ★★★★★
            </Text>
            <Text color="gray.300" fontSize="md">
              (5.00 / 4 Reviews)
            </Text>

            {/* Divider */}
            <Text color="gray.500">|</Text>

            {/* Date */}
            <Text color="gray.400" fontSize="md">
              Last Updated : 20 January 2024
            </Text>
          </HStack>
        </Box>

      </HStack>
    </Box>
  );
}
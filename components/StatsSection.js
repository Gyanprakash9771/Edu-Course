import { Box, HStack, Text, VStack } from "native-base";

export default function StatsSection({ isMobile }) {
  const stats = [
    {
      number: "2.1+ Crore",
      label: "Hours of LIVE learning",
      color: "#ff6b6b",
    },
    {
      number: "10+ Lakh",
      label: "Monthly YouTube views",
      color: "#20c997",
    },
    {
      number: "25+ Lakh",
      label: "Doubts resolved on the app",
      color: "#ffd43b",
    },
    {
      number: "50+ Countries",
      label: "Students take LIVE classes",
      color: "#845ef7",
    },
  ];

  return (
    <Box px={isMobile ? 4 : 10} mt={-10}>
      <Box
        bg="white"
        borderRadius="2xl"
        shadow={3}
        py={isMobile ? 10 : 12}   // 👈 increased height
        px={isMobile ? 4 : 10}
        minHeight={350}
        justifyContent={'center'}
      >
        <HStack
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          space={isMobile ? 6 : 0}
        >
          {stats.map((item, index) => (
            <VStack key={index} alignItems="center" flex={1}>
              
              {/* NUMBER WITH CIRCLE */}
              <Box position="relative" mb={3}>
                <Box
                  position="absolute"
                  width={10}      // 👈 increased circle size
                  height={10}
                  borderRadius="full"
                  bg={item.color}
                  top={1}
                  left={-3}
                />
                <Text fontSize={isMobile ? "2xl" : "5xl"} fontWeight="bold">
                  {item.number}
                </Text>
              </Box>

              {/* LABEL */}
              <Text
                fontSize={isMobile ? "md" : '2xl'}   // 👈 increased
                color="gray.500"
                textAlign="center"
              >
                {item.label}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
import React from "react";
import { Box, Text, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

export default function BannerSection({ isMobile }) {
    return (
        <LinearGradient
            colors={["#f7928b", "#fbfdfd", "#b8f0ed"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
                height: 500,
                justifyContent: "center",
            }}
        >
            <Box px={isMobile ? 4 : 10} marginLeft={isMobile ? 10 : 50}>
                <Text
                    color="black"
                    fontSize={isMobile ? "3xl" : "8xl"}
                    fontWeight="bold"
                    mb={4}
                    fontStyle="italic"
                >
                    Explore{" "}
                    <Text color="#07f5c5">better skills</Text>
                    {"\n"}
                    through thousand
                    {"\n"}
                    online courses
                </Text>

                <Button
                    bg="#07f5c5"
                    _text={{ color: "blue.700", fontWeight: "bold" }}
                    width={isMobile ? "30%" : "5%"}

                >
                    Learn More
                </Button>
            </Box>
        </LinearGradient>
    );
}
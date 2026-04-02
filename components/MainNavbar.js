import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    Box,
    Divider,
    HStack,
    Image,
    Pressable,
    Text,
    VStack,
} from "native-base";
import { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";

export default function MainNavbar({ onOpenAuth }) {

    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // ✅ NEW (ONLY MOBILE)
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMobile, setActiveMobile] = useState(null);


    // ✅ YOUR ORIGINAL STATES (UNCHANGED)
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [showPages, setShowPages] = useState(false);
    const [showBlog, setShowBlog] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const navigation = useNavigation();

    return (
        <Box
            bg="white"
            position="relative"
            zIndex={10}
            onMouseLeave={() => {
                setShowMegaMenu(false);
                setShowCourses(false);
                setShowPages(false);
                setShowBlog(false);
                setShowShop(false);
            }}
        >

            {/* ================= NAVBAR ================= */}
            <HStack
                maxW="1200px"
                mx="auto"
                w="100%"
                height={94}
                alignItems="center"
                px={isMobile ? 4 : 0}
                justifyContent="space-between"
            >

                {/* LOGO */}
                <HStack flex={1} ml={isMobile ? 0 : -12}>
                    <Image
                        source={require("../assets/images/logo.png")}
                        alt="Logo"
                        style={{ width: isMobile ? 160 : 168, height: 38 }}
                    />
                </HStack>

                {/* ================= MOBILE ICON (ONLY ADDITION) ================= */}
                {isMobile && (
                    <Pressable onPress={() => setMenuOpen(true)}>
                        <Ionicons name="menu" size={28} />
                    </Pressable>
                )}

                {/* ================= YOUR ORIGINAL DESKTOP CODE (UNCHANGED) ================= */}
                {!isMobile && (
                    <>
                        <HStack flex={2} justifyContent="center" space={8}>

                            {/* HOME */}
<Box
  onMouseEnter={() => {
    setShowMegaMenu(true);
    setShowCourses(false);
    setShowPages(false);
    setShowBlog(false);
    setShowShop(false);
  }}
>
  <Pressable
    onPress={() => {
      navigation.navigate("Home");
    }}
  >
    <HStack alignItems="center">
      <Text fontSize="lg" fontWeight="600">Home</Text>
      <Ionicons name="chevron-down" size={16} />
    </HStack>
  </Pressable>
</Box>

                            {/* COURSES */}
                            <Box
                                position="relative"
                                onMouseEnter={() => {
                                    setShowCourses(true);
                                    setShowMegaMenu(false);
                                    setShowPages(false);
                                    setShowBlog(false);
                                    setShowShop(false);
                                }}
                            >
                                <Pressable>
                                    <HStack alignItems="center">
                                        <Text fontSize="lg" fontWeight="600">Courses</Text>
                                        <Ionicons name="chevron-down" size={16} />
                                    </HStack>
                                </Pressable>

                                {showCourses && (
                                    <Box
                                        position="absolute"
                                        top="100%"
                                        mt={2}
                                        left={0}
                                        bg="white"
                                        w="280px"
                                        py={4}
                                        shadow={4}
                                        borderRadius="md"
                                        borderTopWidth={3}
                                        borderTopColor="teal.400"
                                        zIndex={999}
                                    >
                                        <VStack space={4} px={5}>
                                            <Pressable
                                                onPress={() => {
                                                    setShowCourses(false);
                                                    navigation.navigate("CourseScreen");
                                                }}
                                            >
                                                <DropdownItem title="MY Course" hasArrow />
                                            </Pressable>
                                            <DropdownItem title="Advanced Course Filter" hasArrow />
                                            <DropdownItem title="Tutor Dashboard" />
                                            <DropdownItem title="Student Registration" />
                                            <DropdownItem title="Instructor Registration" />
                                            <DropdownItem title="Free Type Course" />
                                            <DropdownItem title="Paid Type Course" active />
                                            <DropdownItem title="Single Layout" hasArrow />
                                        </VStack>
                                    </Box>
                                )}
                            </Box>

                            {/* PAGES */}
                            <Box
                                position="relative"
                                onMouseEnter={() => {
                                    setShowPages(true);
                                    setShowCourses(false);
                                    setShowMegaMenu(false);
                                    setShowBlog(false);
                                    setShowShop(false);
                                }}
                            >
                                <Pressable>
                                    <HStack alignItems="center">
                                        <Text fontSize="lg" fontWeight="600">Pages</Text>
                                        <Ionicons name="chevron-down" size={16} />
                                    </HStack>
                                </Pressable>

                                {showPages && (
                                    <Box
                                        position="absolute"
                                        top="100%"
                                        mt={2}
                                        left={0}
                                        bg="white"
                                        w="260px"
                                        py={4}
                                        shadow={4}
                                        borderRadius="md"
                                        borderTopWidth={3}
                                        borderTopColor="teal.400"
                                        zIndex={999}
                                    >
                                        <VStack space={4} px={5}>
                                            <DropdownItem title="About Us" hasArrow />
                                            <DropdownItem title="Zoom Meeting" />
                                            <DropdownItem title="Events" hasArrow />
                                            <DropdownItem title="Pricing Table" hasArrow />
                                            <DropdownItem title="Our Team" hasArrow />
                                            <DropdownItem title="Programs" hasArrow />
                                            <DropdownItem title="Privacy Policy" />
                                            <DropdownItem title="404 Page" />
                                            <DropdownItem title="Coming Soon" />
                                            <DropdownItem title="FAQs" />
                                        </VStack>
                                    </Box>
                                )}
                            </Box>

                            {/* BLOG */}
                            <Box
                                position="relative"
                                onMouseEnter={() => {
                                    setShowBlog(true);
                                    setShowCourses(false);
                                    setShowPages(false);
                                    setShowMegaMenu(false);
                                    setShowShop(false);
                                }}
                            >
                                <Pressable>
                                    <HStack alignItems="center">
                                        <Text fontSize="lg" fontWeight="600">Blog</Text>
                                        <Ionicons name="chevron-down" size={16} />
                                    </HStack>
                                </Pressable>

                                {showBlog && (
                                    <Box
                                        position="absolute"
                                        top="100%"
                                        mt={2}
                                        left={0}
                                        bg="white"
                                        w="240px"
                                        py={4}
                                        shadow={4}
                                        borderRadius="md"
                                        borderTopWidth={3}
                                        borderTopColor="teal.400"
                                        zIndex={999}
                                    >
                                        <VStack space={4} px={5}>
                                            <DropdownItem title="Blog Lists" />
                                            <DropdownItem title="Blog Grid" hasArrow />
                                            <DropdownItem title="Blog Single" hasArrow />
                                        </VStack>
                                    </Box>
                                )}
                            </Box>

                            {/* SHOP */}
                            <Box
                                position="relative"
                                onMouseEnter={() => {
                                    setShowShop(true);
                                    setShowCourses(false);
                                    setShowPages(false);
                                    setShowBlog(false);
                                    setShowMegaMenu(false);
                                }}
                            >
                                <Pressable>
                                    <HStack alignItems="center">
                                        <Text fontSize="lg" fontWeight="600">Shop</Text>
                                        <Ionicons name="chevron-down" size={16} />
                                    </HStack>
                                </Pressable>

                                {showShop && (
                                    <Box
                                        position="absolute"
                                        top="100%"
                                        mt={2}
                                        left={0}
                                        bg="white"
                                        w="220px"
                                        py={4}
                                        shadow={4}
                                        borderRadius="md"
                                        borderTopWidth={3}
                                        borderTopColor="teal.400"
                                        zIndex={999}
                                    >
                                        <VStack space={4} px={5}>
                                            <DropdownItem title="Shop Grid" />
                                            <DropdownItem title="Single Product" />
                                            <DropdownItem title="My account" />
                                        </VStack>
                                    </Box>
                                )}
                            </Box>

                            <Text fontSize="lg">Contact</Text>

                        </HStack>

                        <HStack flex={1} justifyContent="flex-end" mr={-8}>
                            <Ionicons name="search-outline" size={26} />
                            <Divider orientation="vertical" bg="black" h={6} mx={8} />
                            <Ionicons name="cart-outline" size={26} />
                        </HStack>
                    </>
                )}
            </HStack>

            {/* ================= YOUR MEGA MENU (UNCHANGED) ================= */}
            {showMegaMenu && (
                <Box
                    position="absolute"
                    top={94}
                    left="10%"
                    right="10%"
                    bg="white"
                    py={10}
                    shadow={6}
                    zIndex={999}
                >
                    <Box maxW="1200px" mx="auto">
                        <HStack justifyContent="space-between">
                            <VStack space={3} w="220px">
                                <MenuItem title="Online Academy" badge="HOT" color="red.400" />
                                <MenuItem title="Digital Marketing" badge="HOT" color="red.400" />
                                <MenuItem title="Learning Platform" badge="HOT" color="red.400" />
                                <MenuItem title="Coaching Center" />
                                <MenuItem title="Cooking Courses" />
                                <MenuItem title="Language School" badge="HOT" color="red.400" />
                                <MenuItem title="Learning Space" />
                                <MenuItem title="Learning Hub" />
                            </VStack>

                            <VStack space={3} w="220px">
                                <MenuItem title="Online Learning" badge="NEW" color="teal.400" />
                                <MenuItem title="Skill Development" badge="NEW" color="teal.400" />
                                <MenuItem title="Course Hub" badge="HOT" color="red.400" />
                                <MenuItem title="Gym Coaching" />
                                <MenuItem title="Learning Center" />
                                <MenuItem title="Business Coach" />
                                <MenuItem title="Education Center" />
                                <MenuItem title="Corporate Training" />
                            </VStack>

                            <VStack space={3} w="220px">
                                <MenuItem title="University" badge="NEW" color="teal.400" />
                                <MenuItem title="University Classic" />
                                <MenuItem title="Knowledge Hub" />
                                <MenuItem title="Course Portal" />
                                <MenuItem title="Motivation" badge="NEW" color="teal.400" />
                                <MenuItem title="Remote Learning" badge="NEW" color="teal.400" />
                                <MenuItem title="Online Institution" />
                                <MenuItem title="Marketplace" badge="NEW" color="teal.400" />
                            </VStack>

                            <VStack space={3} w="220px">
                                <MenuItem title="Career Coaching" badge="NEW" color="teal.400" />
                                <MenuItem title="LMS Portal" />
                                <MenuItem title="eLearning Hub" badge="NEW" color="teal.400" />
                                <MenuItem title="Online Course" />
                                <MenuItem title="Kindergarten" />
                                <MenuItem title="Classic LMS" />
                            </VStack>
                        </HStack>
                    </Box>
                </Box>
            )}
            {/* ================= ONLY NEW MOBILE DRAWER ================= */}
            {isMobile && menuOpen && (
                <Box
                    position="fixed"   // ✅ FIXED (NOT absolute)
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    zIndex={9999}
                    elevation={20}     // ✅ Android fix
                >
                    {/* 🔥 OVERLAY */}
                    <Pressable
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0,0,0,0.6)"
                        onPress={() => setMenuOpen(false)}
                    />

                    {/* 📱 DRAWER */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        height="100%"
                        width="90%"
                        bg="white"
                        shadow={5}
                    >
                        <HStack justifyContent="space-between" alignItems="center" p={4}>
                            <Image
                                source={require("../assets/images/logo.png")}
                                alt="Logo"
                                style={{ width: 120, height: 30 }}
                                resizeMode="contain"
                            />

                            <Pressable onPress={() => setMenuOpen(false)}>
                                <Text fontSize="lg">✕</Text>
                            </Pressable>
                        </HStack>

                        <Divider />

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack space={4} p={4}>

                                {/* HOME */}
                                <Pressable>
                                    <HStack justifyContent="space-between" alignItems="center">

                                        {/* 👇 TEXT CLICK → NAVIGATE */}
                                        <Text
                                            fontSize="lg"
                                            fontWeight="bold"
                                            onPress={() => {
                                                setMenuOpen(false);
                                                navigation.navigate("Home");
                                            }}
                                        >
                                            Home
                                        </Text>

                                        {/* 👇 ICON CLICK → TOGGLE */}
                                        <Pressable
                                            onPress={() =>
                                                setActiveMobile(activeMobile === "home" ? null : "home")
                                            }
                                        >
                                            <Ionicons
                                                name={activeMobile === "home" ? "chevron-up" : "chevron-down"}
                                                size={20}
                                            />
                                        </Pressable>

                                    </HStack>
                                </Pressable>
                                {activeMobile === "home" && (
                                    <VStack pl={4} mt={2} space={2}>

                                        {/* COLUMN 1 */}
                                        <Text fontSize="md" fontWeight="bold">Online Academy</Text>
                                        <Text fontSize="md" fontWeight="bold">Digital Marketing</Text>
                                        <Text fontSize="md" fontWeight="bold">Learning Platform</Text>
                                        <Text fontSize="md" fontWeight="bold">Coaching Center</Text>
                                        <Text fontSize="md" fontWeight="bold">Cooking Courses</Text>
                                        <Text fontSize="md" fontWeight="bold">Language School</Text>
                                        <Text fontSize="md" fontWeight="bold">Learning Space</Text>
                                        <Text fontSize="md" fontWeight="bold">Learning Hub</Text>

                                        {/* COLUMN 2 */}
                                        <Pressable
                                            onPress={() => {
                                                setMenuOpen(false);           // 👈 FIRST close drawer
                                                setTimeout(() => {
                                                    navigation.navigate("Home"); // 👈 THEN navigate
                                                }, 0);
                                            }}
                                        >
                                            <Text fontSize="md" fontWeight="bold">Online Learning</Text>
                                        </Pressable>
                                        <Text fontSize="md" fontWeight="bold">Skill Development</Text>
                                        <Text fontSize="md" fontWeight="bold">Course Hub</Text>
                                        <Text fontSize="md" fontWeight="bold">Gym Coaching</Text>
                                        <Text fontSize="md" fontWeight="bold">Learning Center</Text>
                                        <Text fontSize="md" fontWeight="bold">Business Coach</Text>
                                        <Text fontSize="md" fontWeight="bold">Education Center</Text>
                                        <Text fontSize="md" fontWeight="bold">Corporate Training</Text>

                                        {/* COLUMN 3 */}
                                        <Text fontSize="md" fontWeight="bold">University</Text>
                                        <Text fontSize="md" fontWeight="bold">University Classic</Text>
                                        <Text fontSize="md" fontWeight="bold">Knowledge Hub</Text>
                                        <Text fontSize="md" fontWeight="bold">Course Portal</Text>
                                        <Text fontSize="md" fontWeight="bold">Motivation</Text>
                                        <Text fontSize="md" fontWeight="bold">Remote Learning</Text>
                                        <Text fontSize="md" fontWeight="bold">Online Institution</Text>
                                        <Text fontSize="md" fontWeight="bold">Marketplace</Text>

                                        {/* COLUMN 4 */}
                                        <Text fontSize="md" fontWeight="bold">Career Coaching</Text>
                                        <Text fontSize="md" fontWeight="bold">LMS Portal</Text>
                                        <Text fontSize="md" fontWeight="bold">eLearning Hub</Text>
                                        <Text fontSize="md" fontWeight="bold">Online Course</Text>
                                        <Text fontSize="md" fontWeight="bold">Kindergarten</Text>
                                        <Text fontSize="md" fontWeight="bold">Classic LMS</Text>

                                    </VStack>
                                )}

                                {/* COURSES */}
                                <Pressable
                                    onPress={() =>
                                        setActiveMobile(activeMobile === "courses" ? null : "courses")
                                    }
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text fontSize="lg" fontWeight="bold">Courses</Text>
                                        <Ionicons
                                            name={activeMobile === "courses" ? "chevron-up" : "chevron-down"}
                                            size={20}
                                        />
                                    </HStack>
                                </Pressable>

                                {activeMobile === "courses" && (
                                    <VStack pl={4} mt={2} space={2}>
                                        <Pressable
                                            onPress={() => {
                                                setMenuOpen(false);   // 👈 close drawer
                                                navigation.navigate("CourseScreen");  // 👈 navigate
                                            }}
                                        >
                                            <Text fontSize="md" fontWeight="bold">My Course</Text>
                                        </Pressable>
                                        <Text fontSize="md" fontWeight="bold">Advanced Filter</Text>
                                        <Text fontSize="md" fontWeight="bold">Instructor</Text>
                                        <Text fontSize="md" fontWeight="bold">Student</Text>
                                    </VStack>
                                )}

                                {/* PAGES */}
                                <Pressable
                                    onPress={() =>
                                        setActiveMobile(activeMobile === "pages" ? null : "pages")
                                    }
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text fontSize="lg" fontWeight="bold">Pages</Text>
                                        <Ionicons
                                            name={activeMobile === "pages" ? "chevron-up" : "chevron-down"}
                                            size={20}
                                        />
                                    </HStack>
                                </Pressable>

                                {activeMobile === "pages" && (
                                    <VStack pl={4} mt={2} space={2}>
                                        <Text fontSize="md" fontWeight="bold">About</Text>
                                        <Text fontSize="md" fontWeight="bold">Events</Text>
                                        <Text fontSize="md" fontWeight="bold">Team</Text>
                                        <Text fontSize="md" fontWeight="bold">FAQs</Text>
                                    </VStack>
                                )}

                                {/* BLOG */}
                                <Pressable
                                    onPress={() =>
                                        setActiveMobile(activeMobile === "blog" ? null : "blog")
                                    }
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text fontSize="lg" fontWeight="bold">Blog</Text>
                                        <Ionicons
                                            name={activeMobile === "blog" ? "chevron-up" : "chevron-down"}
                                            size={20}
                                        />
                                    </HStack>
                                </Pressable>

                                {activeMobile === "blog" && (
                                    <VStack pl={4} mt={2} space={2}>
                                        <Text fontSize="md" fontWeight="bold">Blog List</Text>
                                        <Text fontSize="md" fontWeight="bold">Blog Grid</Text>
                                        <Text fontSize="md" fontWeight="bold">Blog Single</Text>
                                    </VStack>
                                )}

                                {/* SHOP */}
                                <Pressable
                                    onPress={() =>
                                        setActiveMobile(activeMobile === "shop" ? null : "shop")
                                    }
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text fontSize="lg" fontWeight="bold">Shop</Text>
                                        <Ionicons
                                            name={activeMobile === "shop" ? "chevron-up" : "chevron-down"}
                                            size={20}
                                        />
                                    </HStack>
                                </Pressable>

                                {activeMobile === "shop" && (
                                    <VStack pl={4} mt={2} space={2}>
                                        <Text fontSize="md" fontWeight="bold">Shop Grid</Text>
                                        <Text fontSize="md" fontWeight="bold">Product</Text>
                                        <Text fontSize="md" fontWeight="bold">Account</Text>
                                    </VStack>
                                )}

                                {/* CONTACT */}
                                <Text fontSize="lg" fontWeight="bold">Contact</Text>
                                

{/* 🔥 LOGIN / REGISTER (ONLY MOBILE ADDITION) */}
<Pressable
  mt={4}
  onPress={() => {
    setMenuOpen(false);
    onOpenAuth && onOpenAuth(); // 🔥 THIS LINE OPENS MODAL
  }}
>
  <Box
    bg="#3bbc9b"
    py={3}
    borderRadius="md"
    alignItems="center"
  >
    <Text color="white" fontWeight="bold">
      Login / Register
    </Text>
  </Box>
</Pressable>

                            </VStack>
                        </ScrollView>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

/* ORIGINAL COMPONENTS UNTOUCHED */
const MenuItem = ({ title, badge, color }) => (
    <HStack space={2}>
        <Text fontSize="lg">{title}</Text>
        {badge && (
            <Box bg={color} px={2} rounded="md">
                <Text fontSize="10px" color="white">{badge}</Text>
            </Box>
        )}
    </HStack>
);

const DropdownItem = ({ title, active, hasArrow }) => (
    <HStack justifyContent="space-between">
        <Text color={active ? "teal.500" : "gray.800"}>
            {title}
        </Text>
        {hasArrow && <Ionicons name="chevron-forward" size={16} />}
    </HStack>
);
"use client";

import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	Image,
	Button,
	MenuList,
} from "@chakra-ui/react";
import {
	FiHome,
	FiTrendingUp,
	FiUsers,
	FiLogOut,
	FiMenu,
	FiBell,
	FiChevronDown,
	FiFileText,
} from "react-icons/fi";
import { IconType } from "react-icons";
import PatientsManagement from "@/components/PatientsManagement";
import React, { useState } from "react";

interface LinkItemProps {
	name: string;
	icon: IconType;
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: React.ReactNode;
}

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
	setSelectedMenu: (menu: string) => void;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome },
	{ name: "Patients Management", icon: FiUsers },
	{ name: "Medical Records", icon: FiFileText },
];

const SidebarContent = ({
	onClose,
	setSelectedMenu,
	...rest
}: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" mb={10} alignItems="center" mx="8" justifyContent="center">
				<Image
					borderRadius="full"
					border="1px solid black"
					boxSize="75px"
					src={"doctor.png"}
					alt="Profile Image"
					mt={4}
				/>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					onClick={() => setSelectedMenu(link.name)}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
	return (
		<Box
			as="a"
			href="#"
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	);
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"
			>
				Logo
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Button leftIcon={<FiLogOut />} colorScheme="gray">
					Logout
				</Button>
			</HStack>
		</Flex>
	);
};

const SidebarWithHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedMenu, setSelectedMenu] = useState("");

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
				setSelectedMenu={setSelectedMenu}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent setSelectedMenu={setSelectedMenu} onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{selectedMenu === "Patients Management" && <PatientsManagement />}
			</Box>
		</Box>
	);
};

export default SidebarWithHeader;

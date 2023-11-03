"use client";

import React from "react";
import { Box, Button, Flex, Spacer, Text, Image } from "@chakra-ui/react";

const Header = () => {
	return (
		<Flex
			as="header"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding={5}
			bg="gray.50"
			color="white"
		>
			<Flex align="center">
				<Image
					borderRadius="full"
					boxSize="50px"
					src={"defaultAvatar.jpg"}
					alt="Profile Image"
					mr={4}
				/>
				<Text fontSize="2xl" fontWeight="bold" color="black">
					Welcome to the Patient Page
				</Text>
			</Flex>
			<Spacer />
			<Box>
				<Button bg="gray.50" marginRight={2}>
					Personal data
				</Button>
				<Button bg="gray.50" marginRight={2}>
					Health records
				</Button>
				<Button bg="gray.50">Emergency contact numbers</Button>
			</Box>
		</Flex>
	);
};

export default Header;

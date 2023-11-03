"use client";

import { Box, Button, Image, Flex, VStack, Text } from "@chakra-ui/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
	const { open } = useWeb3Modal();
	const router = useRouter();
	const [role, setRole] = useState<string>();

	const handleLogin = async (role: string) => {
		try {
			setRole(role);
			await open();
		} catch (error) {
			console.error("Failed to open web3 modal", error);
		}
	};

	const { address } = useAccount();

	useEffect(() => {
		if (address && role) {
			router.push(`/${role}`);
		}
	}, [address, role, router]);

	return (
		<Flex direction={"row"} h="100vh">
			<Box flex="1">
				<Image
					src="/homepage.jpg"
					alt="Descriptive Alt Text"
					objectFit="cover"
					objectPosition="top"
					height="100%"
					width="100%"
				/>
			</Box>
			<VStack
				flex="1"
				direction="column"
				justify="flex-start"
				align="center"
				p="10"
				spacing="10"
			>
				<VStack align="start">
					<Text fontSize="4xl">Welcome to Appname</Text>
					<Text fontSize="2xl" color="gray.500">
						Login to the Dashboard
					</Text>
				</VStack>
				<Flex direction="column" justify="center" align="center" flexGrow={1}>
					<Button
						colorScheme="blue"
						size="lg"
						mb="4"
						onClick={() => handleLogin("patient")}
					>
						Patient
					</Button>
					<Button
						colorScheme="green"
						size="lg"
						onClick={() => handleLogin("doctor")}
					>
						Doctor
					</Button>
				</Flex>
			</VStack>
		</Flex>
	);
}

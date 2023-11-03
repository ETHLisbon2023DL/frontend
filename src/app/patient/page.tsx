"use client";
import React from "react";
import {
	Box,
	Button,
	Flex,
	Image,
	Text,
	Divider,
	Heading,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import Header from "@/components/HeaderPatient";
import { useRef } from "react";

const Patient = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef<HTMLButtonElement | null>(null);

	const onShare = () => {
		setIsOpen(true);
	};

	return (
		<>
			<Header />
			<Flex direction="row" align="center" p={10}>
				<Image
					boxSize="500px"
					src={"health-report.png"}
					alt="Profile Image"
					mb={4}
				/>

				<Flex
					direction="column"
					align="start"
					w="50%"
					p={4}
					borderWidth={1}
					borderRadius="md"
					ml={5}
					borderColor="black"
				>
					<Heading mb={2}>John Doe</Heading>
					<Text mb={2}>Date of Birth: January 1, 1990</Text>
					<Divider mb={2} />
					<Text mb={2}>Blood Group: O+</Text>
					<Divider mb={2} />
					<Text mb={2}>Allergies: None</Text>
					<Divider mb={2} />
					<Text mb={2}>Medical Conditions: None</Text>
					<Divider mb={2} />
					<Text mb={2}>Medications: None</Text>
					<Flex justifyContent="flex-end">
						<Button colorScheme="blue" size="md" mt={4} onClick={onShare}>
							Share your medical records
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Share Medical Records
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure you want to share your medical records?
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="blue" onClick={onClose} ml={3}>
								Share
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default Patient;

"use client";

import React, { useState } from "react";
import {
	Box,
	Input,
	List,
	ListItem,
	Avatar,
	Text,
	Flex,
	Divider,
	Button,
} from "@chakra-ui/react";

const patients = [
	{
		name: "John Doe",
		fiscalCode: "1234567890",
		avatar: "avatar1.png",
		shared: true,
	},
	{
		name: "Jane Doe",
		fiscalCode: "0987654321",
		avatar: "avatar2.png",
		shared: false,
	},
	{
		name: "Bob Smith",
		fiscalCode: "1122334455",
		avatar: "avatar3.png",
		shared: false,
	},
];

const PatientsManagement = () => {
	const [selectedPatient, setSelectedPatient] = useState<{
		name: string;
		fiscalCode: string;
		avatar: string;
		shared: boolean;
	} | null>(null);

	return (
		<Flex>
			<Box w="50%" p={5}>
				<Input placeholder="Search patients" mb={5} />
				<List spacing={3}>
					{patients.map((patient, index) => (
						<ListItem
							key={index}
							p={5}
							shadow="md"
							borderWidth="1px"
							_hover={{ cursor: "pointer", bg: "gray.100" }}
							onClick={() => setSelectedPatient(patient)}
						>
							<Flex align="center">
								<Avatar src={patient.avatar} mr={4} />
								<Box>
									<Text fontWeight="bold">{patient.name}</Text>
									<Text fontSize="sm">{patient.fiscalCode}</Text>
								</Box>
							</Flex>
						</ListItem>
					))}
				</List>
			</Box>
			<Divider orientation="vertical" />
			<Box w="50%" p={5}>
				{selectedPatient && (
					<>
						<Text fontSize="2xl" mb={5}>
							{selectedPatient.name}
						</Text>
						<Text>Fiscal Code: {selectedPatient.fiscalCode}</Text>
						{selectedPatient.shared ? (
							<>
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
									<Button colorScheme="blue" size="md" mt={4} mr={2}>
										Download
									</Button>
									<Button colorScheme="blue" size="md" mt={4}>
										Upload
									</Button>
								</Flex>
							</>
						) : (
							<Text>The patient has not shared the Medical Records.</Text>
						)}
					</>
				)}
			</Box>
		</Flex>
	);
};

export default PatientsManagement;

import { Box, Image, Text, VStack } from '@chakra-ui/react'

const PotholeCard = ({ pothole }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Image
        src={pothole.imageUrl}
        alt={`Pothole in ${pothole.location}`}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      <VStack p={4} align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {pothole.location}
        </Text>
        <Text color="gray.600">{pothole.description}</Text>
        <Text fontSize="sm" color="gray.500">
          Reported on: {new Date(pothole.date).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  )
}

export default PotholeCard
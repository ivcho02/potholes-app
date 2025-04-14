import { Box, Image, Text, Badge, Stack } from '@chakra-ui/react'

const PotholeCard = ({ report }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      bg="white"
    >
      {report.imageUrl && (
        <Image
          src={report.imageUrl}
          alt={`Pothole at ${report.location}`}
          objectFit="cover"
          h="200px"
          w="100%"
        />
      )}
      <Stack p={4} spacing={2}>
        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
          {report.location}
        </Text>
        <Text color="gray.600" fontSize="sm" noOfLines={2}>
          {report.description}
        </Text>
        <Badge colorScheme={report.status === 'reported' ? 'red' : 'green'}>
          {report.status}
        </Badge>
        <Text fontSize="xs" color="gray.500">
          Reported: {report.createdAt?.toDate().toLocaleDateString()}
        </Text>
      </Stack>
    </Box>
  )
}

export default PotholeCard
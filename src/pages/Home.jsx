import { Container, Grid, Heading, Text } from '@chakra-ui/react'
import PotholeCard from '../components/PotholeCard'

const Home = () => {
  // This would be replaced with actual data from Firebase
  const potholes = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300',
      location: 'Sofia, Mladost',
      description: 'Large pothole near the bus stop',
      date: '2024-03-14',
    },
    // More potholes would be added here
  ]

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Reported Potholes in Bulgaria</Heading>
      {potholes.length === 0 ? (
        <Text>No potholes reported yet. Be the first to report one!</Text>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          w="100%"
        >
          {potholes.map((pothole) => (
            <PotholeCard key={pothole.id} pothole={pothole} />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Home
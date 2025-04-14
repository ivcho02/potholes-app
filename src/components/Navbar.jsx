import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="gray.100" py={4} shadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <RouterLink to="/">
            <Heading size="lg" color="blue.600">
              🕳️ BG Potholes
            </Heading>
          </RouterLink>
          <RouterLink to="/report">
            <Button colorScheme="red" size="md">
              Report a Pothole
            </Button>
          </RouterLink>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
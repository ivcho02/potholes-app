import { Box, Container, Flex, Button, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  return (
    <Box bg="blue.500" color="white" py={4} shadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <RouterLink to="/">
            <Heading size="md">Pothole Reporter</Heading>
          </RouterLink>
          <Flex gap={4}>
            <Button
              as={RouterLink}
              to="/"
              variant="ghost"
              _hover={{ bg: 'blue.600' }}
              color="white"
            >
              Home
            </Button>
            <Button
              as={RouterLink}
              to="/report"
              colorScheme="whiteAlpha"
            >
              Report Pothole
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
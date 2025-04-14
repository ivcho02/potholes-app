import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReportPothole = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    image: null,
  })
  const navigate = useNavigate()
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here we would implement Firebase storage and database logic
      console.log('Submitting:', formData)

      toast({
        title: 'Success!',
        description: 'Your pothole report has been submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      navigate('/')
    } catch (error) {
      console.error('Error submitting report:', error)
      toast({
        title: 'Error',
        description: 'Failed to submit your report. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Report a Pothole</Heading>
        <Box as="form" onSubmit={handleSubmit} w="100%">
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                placeholder="e.g., Sofia, Mladost 1A"
                value={formData.location}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Describe the pothole and its surroundings..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={loading}
            >
              Submit Report
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default ReportPothole
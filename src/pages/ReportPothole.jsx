import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage, db } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const ReportPothole = () => {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
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
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const storageRef = ref(storage, 'pothole-images/' + fileName)
    const metadata = { contentType: file.type }
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef)
            resolve(downloadURL)
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setUploadProgress(0)

    try {
      let imageUrl = null

      if (formData.image) {
        imageUrl = await uploadImage(formData.image)
      }

      await addDoc(collection(db, 'potholes'), {
        location: formData.location,
        description: formData.description,
        imageUrl,
        status: 'reported',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      toast({
        title: 'Success!',
        description: 'Your pothole report has been submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to submit report: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
      setUploadProgress(0)
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

            <FormControl>
              <FormLabel>Image (Optional)</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <Box mt={2}>
                  Upload progress: {Math.round(uploadProgress)}%
                </Box>
              )}
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
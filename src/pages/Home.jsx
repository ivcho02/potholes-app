import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Spinner,
  Center,
  Input,
  Select,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import PotholeCard from '../components/PotholeCard'

const Home = () => {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(
          collection(db, 'potholes'),
          orderBy('createdAt', 'desc')
        )

        const querySnapshot = await getDocs(q)
        const fetchedReports = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setReports(fetchedReports)
        setFilteredReports(fetchedReports)
      } catch (err) {
        console.error('Error fetching reports:', err)
        setError('Failed to load pothole reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    let result = [...reports]

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(report => report.status === statusFilter)
    }

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(
        report =>
          report.location.toLowerCase().includes(searchLower) ||
          report.description.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return b.createdAt?.toDate() - a.createdAt?.toDate()
      } else {
        return a.createdAt?.toDate() - b.createdAt?.toDate()
      }
    })

    setFilteredReports(result)
  }, [reports, searchTerm, statusFilter, sortBy])

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Reported Potholes</Heading>

        <HStack spacing={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by location or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">All Status</option>
            <option value="reported">Reported</option>
            <option value="in_progress">In Progress</option>
            <option value="fixed">Fixed</option>
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            maxW="200px"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </Select>
        </HStack>

        {filteredReports.length === 0 ? (
          <Text>No potholes found matching your criteria.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredReports.map(report => (
              <PotholeCard key={report.id} report={report} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  )
}

export default Home
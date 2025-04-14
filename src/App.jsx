import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ReportPothole from './pages/ReportPothole'

const App = () => {
  return (
    <Router>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Box as="main" py={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportPothole />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App

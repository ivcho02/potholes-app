import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ReportPothole from './pages/ReportPothole'

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportPothole />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App

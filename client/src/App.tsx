import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProblemView from './pages/ProblemView'
import Problem from './pages/Problem'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems/:topic/:difficulty" element={<ProblemView />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
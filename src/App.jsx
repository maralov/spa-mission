import { Routes, Route, Navigate } from 'react-router-dom'
import Invite from './pages/Invite'
import Quest from './pages/Quest'
import Certificate from './pages/Certificate'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/ksenia" replace />} />
        {/* slug-first */}
        <Route path="/:slug" element={<Invite />} />
        <Route path="/:slug/quest" element={<Quest />} />
        <Route path="/:slug/certificate" element={<Certificate />} />
      </Routes>
    </Layout>
  )
}

export default App

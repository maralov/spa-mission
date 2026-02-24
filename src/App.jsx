import {Routes, Route} from "react-router-dom"
import Invite from "./pages/Invite"
import Quest from "./pages/Quest"
import Certificate from "./pages/Certificate"
import Layout from "./components/Layout"

function App() {
    return (
        <Layout>
            <Routes>
                <Route path=":slug" element={<Invite/>}/>
                <Route path="/quest" element={<Quest/>}/>
                <Route path="/certificate" element={<Certificate/>}/>
            </Routes>
        </Layout>
    )
}

export default App


import { Container } from "react-bootstrap"
import Footer from "./components/Footer/footer.tsx"
import Header from "./components/Header/header.tsx"
import AppRoutes from "./routes/AppRoutes.tsx"

import {BrowserRouter as Router} from "react-router-dom"
import Loader from "./components/Loader/Loader.tsx"
import { Suspense } from "react"
import { ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
        <Header/>
          <Container style={{minHeight: '100vh', minWidth:'100%', padding:'0'}}>
            <Suspense fallback={<Loader/>}>
              <AppRoutes/>
            </Suspense>
          </Container>
        <Footer/>
      </Router>
    </>
  )

}

export default App

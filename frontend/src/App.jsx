
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import MainRoutes from './Routes/MainRoutes'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <MainRoutes/>
    </div>
      <Footer/>
    </>
  )
}

export default App
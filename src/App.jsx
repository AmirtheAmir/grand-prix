import './App.css'
import './index.css';
import Navbar from "../src/Components/Navbar/navigation"
import HomePage from './Components/Home/homepage';

function App() {
  return (
    <div className="flex flex-col bg-cream min-h-screen">
      <Navbar/>
      <HomePage/>
    </div>
  )
}

export default App

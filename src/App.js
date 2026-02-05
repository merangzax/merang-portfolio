import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Gallery from "./components/Gallery"; // your current gallery component
import Preview from "./components/Preview"; // create this page

function App() {

 return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />   {/*Temporary redirect*/}
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/preview/:title" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;

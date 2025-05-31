import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Exam from './components/Exam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/exam" element={<Exam />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

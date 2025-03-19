import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import QuizPlay from "./pages/QuizPlay";
import QuizResult from "./pages/QuizResult";
import CreateQuestion from "./pages/CreateQuestion"; // ✅ Import the new component
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/create-question" element={<CreateQuestion />} />{" "}
        {/* ✅ New Route */}
        <Route path="/quiz/:id" element={<QuizPlay />} />
        <Route path="/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
}

export default App;

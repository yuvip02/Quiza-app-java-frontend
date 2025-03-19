import { useLocation, useNavigate } from "react-router-dom";

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <p className="text-lg">
        You got <span className="text-green-500 font-bold">{score}</span> out of{" "}
        <span className="font-bold">{total}</span> correct!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Home
      </button>
    </div>
  );
}

export default QuizResult;

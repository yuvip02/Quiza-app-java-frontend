import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizPlay() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/get-quiz/${id}`) // ✅ Corrected API URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Quiz not found");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid quiz data received");
        }
        setQuestions(data);
      })
      .catch((err) => console.error("Failed to fetch quiz:", err));
  }, [id]);

  const handleSubmit = () => {
    fetch(`http://localhost:8080/quiz/submit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        Object.keys(answers).map((questionId) => ({
          id: questionId,
          response: answers[questionId],
        }))
      ),
    })
      .then((res) => res.json())
      .then((score) => {
        navigate("/result", { state: { score, total: questions.length } });
      })
      .catch((err) => console.error("Error submitting quiz:", err));
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.length === 0 ? (
        <p className="text-red-500">No questions found for this quiz.</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
            <p>{q.questionTitle}</p>
            <div className="mt-2">
              {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    className="mr-2"
                    onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizPlay;

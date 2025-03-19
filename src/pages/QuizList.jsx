import { useState, useEffect } from "react";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/quiz/all")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Failed to fetch quizzes:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/quiz/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setQuizzes(quizzes.filter((quiz) => quiz.id !== id)); // Remove from UI
        } else {
          console.error("Failed to delete quiz");
        }
      })
      .catch((err) => console.error("Error deleting quiz:", err));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex justify-between p-4 bg-gray-100 rounded-lg shadow mb-2"
        >
          <p className="text-lg font-semibold">{quiz.title}</p>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={() => (window.location.href = `/quiz/${quiz.id}`)}
            >
              Play
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDelete(quiz.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizList;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ To navigate to Login page

const CreateQuiz = () => {
  const [category, setCategory] = useState("");
  const [numQ, setNumQ] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset previous messages

    const quizData = {
      category,
      numQ: parseInt(numQ, 10),
      title,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(quizData),
      });

      if (response.status === 401 || response.status === 403) {
        setMessage("❌ You are not authorized. Please log in.");
        setIsError(true);
        setTimeout(() => navigate("/login"), 1500); // ✅ Redirect to Login
        return;
      }

      if (response.ok) {
        setMessage("✅ Quiz created successfully!");
        setIsError(false);
        setCategory("");
        setNumQ("");
        setTitle("");
      } else {
        setMessage("⚠️ Failed to create quiz. Try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong.");
      setIsError(true);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Number of Questions"
          value={numQ}
          onChange={(e) => setNumQ(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Create Quiz
        </button>
      </form>

      {message && (
        <p className={`mt-4 font-semibold ${isError ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateQuiz;

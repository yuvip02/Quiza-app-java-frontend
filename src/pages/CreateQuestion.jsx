import { useState } from "react";

function CreateQuestion() {
  const [questionData, setQuestionData] = useState({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultyLevel: "Easy",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/questions/add-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include", // ✅ Important for CORS with credentials
          body: JSON.stringify(questionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add question");
      }

      setMessage("✅ Question successfully created!");
      setIsError(false);
      setQuestionData({
        questionTitle: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: "",
        difficultyLevel: "Easy",
        category: "",
      });
    } catch (err) {
      console.error("Error adding question:", err);
      setMessage("⚠️ " + err.message);
      setIsError(true);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Question</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded shadow"
      >
        <input
          type="text"
          name="questionTitle"
          value={questionData.questionTitle}
          onChange={handleChange}
          placeholder="Enter Question"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option1"
          value={questionData.option1}
          onChange={handleChange}
          placeholder="Option 1"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option2"
          value={questionData.option2}
          onChange={handleChange}
          placeholder="Option 2"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option3"
          value={questionData.option3}
          onChange={handleChange}
          placeholder="Option 3"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option4"
          value={questionData.option4}
          onChange={handleChange}
          placeholder="Option 4"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="rightAnswer"
          value={questionData.rightAnswer}
          onChange={handleChange}
          placeholder="Correct Answer"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="difficultyLevel"
          value={questionData.difficultyLevel}
          onChange={handleChange}
          placeholder="Difficulty (Easy, Medium, Hard)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={questionData.category}
          onChange={handleChange}
          placeholder="Category (e.g., Geography, Literature)"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Question
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 font-semibold ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateQuestion;

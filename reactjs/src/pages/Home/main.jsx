import { Link } from "react-router-dom";

function Home() {
  localStorage.removeItem("token"); 
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Chatbot RAG</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced AI technology helps you find information quickly and accurately using Retrieval-Augmented Generation (RAG).
        </p>
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
            Start Chatting
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home

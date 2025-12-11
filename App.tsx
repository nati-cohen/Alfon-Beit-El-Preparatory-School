import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { fetchStudents } from './services/dataService';
import { Student } from './types';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';

// IMPORTANT: We use HashRouter here because this is often deployed to static hosts 
// (like GitHub Pages) where standard BrowserRouter might fail on refresh without server config.
// It also makes it easier to run locally without a server.

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError('שגיאה בטעינת הנתונים. אנא בדוק את החיבור לאינטרנט או נסה שוב מאוחר יותר.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 flex-col gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">טוען נתונים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-sm">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">שגיאה בטעינה</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-2xl overflow-hidden relative">
        <Routes>
          <Route path="/" element={<StudentList students={students} />} />
          <Route path="/student/:id" element={<StudentDetail students={students} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Student } from '../types';
import { PhoneIcon, WhatsappIcon, CopyIcon, ArrowRightIcon } from './Icons';

interface StudentDetailProps {
  students: Student[];
}

const StudentDetail: React.FC<StudentDetailProps> = ({ students }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const found = students.find((s) => s.id === id);
    setStudent(found || null);
  }, [id, students]);

  if (!student) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        טוען תלמיד...
      </div>
    );
  }

  // Action Handlers
  const handleCall = () => {
    window.open(`tel:${student.phone_number}`, '_self');
  };

  const handleWhatsApp = () => {
    // Sanitize phone number for WhatsApp API
    // Remove non-digits, remove leading zero, add 972 (Israel)
    // Basic logic for IL numbers:
    let cleanNum = student.phone_number.replace(/\D/g, '');
    if (cleanNum.startsWith('0')) {
      cleanNum = '972' + cleanNum.substring(1);
    }
    window.open(`https://wa.me/${cleanNum}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(student.phone_number).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowRightIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">פרטי תלמיד</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center animate-fadeIn">
        
        {/* Profile Header */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg">
             <img 
              src={student.image_url} 
              alt={student.full_name} 
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(student.full_name)}`;
              }}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center">{student.full_name}</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-8">
          {student.class}
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
          <button 
            onClick={handleCall}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">חיוג</span>
          </button>

          <button 
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
              <WhatsappIcon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">וואטסאפ</span>
          </button>

          <button 
            onClick={handleCopy}
            className="relative flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <CopyIcon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {copyFeedback ? 'הועתק!' : 'העתק'}
            </span>
          </button>
        </div>

        {/* Info Cards */}
        <div className="w-full max-w-md space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">מספר טלפון</label>
             <p className="text-lg font-medium text-gray-800 dir-ltr text-right">{student.phone_number}</p>
          </div>

          {student.notes && (
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">הערות</label>
                <p className="text-base text-gray-700 leading-relaxed">{student.notes}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

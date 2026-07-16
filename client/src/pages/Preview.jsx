import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import {ArrowLeftIcon, Loader, FileX2} from "lucide-react"
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resume/public/${resumeId}`);
      setResumeData(data.resume);
    } catch (error) {
      setResumeData(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 flex flex-col items-center max-w-md w-full text-center">
            <div className="size-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <FileX2 className="size-10 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-2">Resume Not Found</h1>
            <p className="text-slate-500 text-sm mb-8">The resume you're looking for doesn't exist or may have been removed.</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white rounded-full px-6 py-2.5 text-sm transition-all"
            >
              <ArrowLeftIcon className="size-4" />
              Go to Home Page
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;

import React, { useState } from 'react'
import {Sparkles} from 'lucide-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

export const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {
  const { token } = useSelector(state => state.auth)
  const [isEnhancing, setIsEnhancing] = useState(false)

  const enhanceSummary = async () => {
    if(!data){
      return toast.error('Please write a summary first')
    }
    setIsEnhancing(true)
    try {
      const { data: response } = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: data },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      onChange(response.enhancedContent)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsEnhancing(false)
  }

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-center'>
            <div>
                <h3>professional Summary</h3>
                <p className='text-sm text-gray-500'> Add summary for you resume here</p>
            </div>
            <button onClick={enhanceSummary} disabled={isEnhancing} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
              <Sparkles className='size-4'/>
                {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
            </button>
        </div>
         <div className='mt-6'>
          <textarea value={data || ""} onChange={(e) => onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compeling professional summary that highlights your key strengths and career objectives...' /> 
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>
              Tip: Keep it concise (3-4 sentences) and focus on your mostrelevant achievements and skills.
            </p>
        </div>

    </div>
  )
}


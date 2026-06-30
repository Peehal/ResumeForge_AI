import React from 'react'
import { User } from 'lucide-react'



const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {

  const handleChange = (field, value) =>{
    onChange({...data, [field]: value})
  }


  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'> Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>
      <div className='flex items-center gap-2'>
          <label>
            {data.image? (
              <img src={typeof data.image === 'string' ? data.image :URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'/>
            ):(
              <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700c cursor-pointer'>
                <User className='size-10 p-2.5 border rounded-full' />
                upload user image
              </div>
            )}

            <input type='file' accept='image/jpeg, image/png' className='hidden' onChange={(e) => handleChange("image", e.target.files[0])} />
          </label>
          {typeof data.image === 'object' && (
            <div className='flex flex-col gap-1 pl-4 text-sm'>
              <p>Remove Background</p>
              <label htmlFor='remove-bg' className='relative inline-flex items-center cursor-pointer'>
                <input id='remove-bg' type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-transform after:duration-200 peer-checked:after:translate-x-4 relative"></div>
              </label>
            </div>
          )}
      </div>
    </div>
  )
}

export default PersonalInfoForm
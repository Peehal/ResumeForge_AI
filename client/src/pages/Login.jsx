import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import {AppleIcon, Lock, Mail, User2Icon} from 'lucide-react'
import api from '../configs/api'
import {useDispatch} from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')

  const [state, setState] = React.useState( urlState || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await api.post(`/api/user/${state}`, formData)
            dispatch(login(data));
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <form
            onSubmit={handleSubmit}
            className="sm:w-96 w-full text-center bg-white border border-slate-200 shadow-md rounded-2xl px-8">
            <h1 className="text-slate-800 text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-slate-500 text-sm mt-2">Please {state} to continue</p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <User2Icon size={16} className="text-slate-400" />
                    <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-slate-700 placeholder-slate-400 border-none outline-none text-sm" value={formData.name} onChange={handleChange} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail size={14} className="text-slate-400" />
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-slate-700 placeholder-slate-400 border-none outline-none text-sm" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="flex items-center mt-4 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock size={14} className="text-slate-400" />
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-slate-700 placeholder-slate-400 border-none outline-none text-sm" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-indigo-500 hover:underline">
                    Forget password?
                </button>
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition">
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-slate-500 text-sm mt-3 mb-11 cursor-pointer">
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-indigo-500 hover:underline ml-1">click here</span>
            </p>
        </form>
    </div>
  )
}

export default Login

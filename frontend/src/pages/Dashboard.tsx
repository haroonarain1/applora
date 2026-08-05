import { useState, useEffect } from 'react'

type Application = {
    id: number
    company: string
    role: string
    status: string
    salary: number
    date_applied: string
    notes: string
    user_id: number
}

export default function Dashboard(){
    
    const [application, setApplication]  = useState<Application[]>([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        
        fetch("http://localhost:8000/applications", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setApplication(data))
    }, [])
    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="w-full h-16 bg-gray-800 flex items-center justify-between px-6">
                <span className="text-blue-500 font-bold text-xl">Applora</span>
                <div className="flex gap-2">
                    <button onClick={() => {}} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Home
                    </button>
                    <button onClick={() => {}} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Applications
                    </button>
                    <button onClick={() => {}} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Resume
                    </button>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    HA
                </div>
            </div>
            <div className="p-6 text-white">
                Application History
                <div className="flex justify-between text-gray-400 text-sm px-4 py-2 border-b border-gray-700 mb-2">
                    <span className="w-1/4">Company</span>
                    <span className="w-1/4">Role</span>
                    <span className="w-1/4">Status</span>
                    <span className="w-1/4">Date Applied</span>
                </div>
                {application.map((app) => (
                    <div key={app.id} className="flex justify-between text-white bg-gray-800 px-4 py-3 rounded-lg mb-2">
                        <span className="w-1/4">{app.company}</span>
                        <span className="w-1/4">{app.role}</span>
                        <span className="w-1/4">{app.status}</span>
                        <span className="w-1/4">{app.date_applied}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
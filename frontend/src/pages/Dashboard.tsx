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
    const [showForm, setShowForm] = useState(false)
    const [company, setCompany] = useState("")
    const [role, setRole] = useState("")
    const [status, setStatus] = useState("")
    const [dateApplied, setDateApplied] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token")
        
        fetch("https://applora-production.up.railway.app/applications", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())       
        .then(data => setApplication(data))
    }, [])

    async function handleSubmit(){
        const token = localStorage.getItem("token")
        const response = await fetch("https://applora-production.up.railway.app/applications", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company: company,
                role: role,
                status: status,
                date_applied: dateApplied,
                salary: 0,
                notes: ""
            })
        })
        if(response.ok) {
            setShowForm(false);
            window.location.reload();
        }
    }
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
            
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md flex flex-col gap-4">
                        <h2 className="text-white text-xl font-bold">Add Application</h2>
                        <input 
                            type="text" 
                            placeholder="Company" 
                            value={company} 
                            onChange={(e) => setCompany(e.target.value)} 
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg" 
                        />
                        <input 
                            type="text" 
                            placeholder="Role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg" 
                        />
                        <input 
                            type="text" 
                            placeholder="Status" 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg" 
                        />
                        <input 
                            type="date" 
                            value={dateApplied} 
                            onChange={(e) => setDateApplied(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg" 
                        />
                        <div className="flex gap-2">
                            <button onClick={() => setShowForm(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-x1 font-bold">Application History</h2>
                    <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        + Add Job
                    </button>
                </div>
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
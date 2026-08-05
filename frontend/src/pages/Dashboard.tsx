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
        <div>
            {application.map((app) => (
                <div key={app.id}>
                    {app.company}
                </div>
            ))}
        </div>
    )
}
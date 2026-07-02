import { useState } from 'react'

export default function Login() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin() {
        const formData = new URLSearchParams()
        formData.append("username", username)
        formData.append("password", password)

        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        const token = data.access_token
        localStorage.setItem("token", token)
        console.log("logged in", token)
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md flex flex-col gap-4">
                <h1 className="text-white text-2xl font-bold">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                />
                <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold">
                    Login
                </button>
            </div>
        </div>
    )
}
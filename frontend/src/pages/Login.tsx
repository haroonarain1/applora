import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()
    
    async function handleLogin() {
        const formData = new URLSearchParams()
        formData.append("username", username)
        formData.append("password", password)

        const response = await fetch("https://applora-production.up.railway.app/login", {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        const token = data.access_token
        localStorage.setItem("token", token)
        navigate('/dashboard')
    }

    async function handleSignup() {
        const response = await fetch("https://applora-production.up.railway.app/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            name: name,
            bio: ""
        })
        })
        if (response.ok) {
            await handleLogin()
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md flex flex-col gap-4">
                <h1 className="text-white text-2xl font-bold">Login or Signup</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                />
                {isSignup && (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                        />
                    </>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 w-full"
                />
                <button onClick={isSignup ? handleSignup : handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold">
                    {isSignup ? "Sign Up" : "Login"}
                </button>
                <button onClick={() => setIsSignup(!isSignup)} className="text-gray-400 text-sm">
                    {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div> 
    )
}
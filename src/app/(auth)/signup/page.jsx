"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api, ENDPOINT } from "@/lib/api"
import { userLoggedInDetails } from "@/redux/userSlice"
import { LucideLoader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
function signUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const router= useRouter();
    const dispatch= useDispatch();


    const onSubmit = async () => {
        try {
            if(!email || !password || !name || !confirmPassword) {
                alert("Please fill the form completely");
                return;
            }
            if (password.length < 6) {
                setPasswordError("Password must be at least 6 characters long");
                return;
            }
            if(password !== confirmPassword) {
                setConfirmPasswordError("Password and confirm password do not match");
                return;
            }
            setLoading(true);
            
            const res=  await api.post(ENDPOINT.signup, {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            if(res.data.status === "success") {
                dispatch(userLoggedInDetails(res.data.data));
                router.push("/");
            }
        }
        catch (err) {
            alert(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }




  return (
    <div className="h-screen flex items-center justify-center">
            <Card className=" w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={passwordError ? "border border-red-500 focus:ring-red-500" : ""}
                            />
                            {passwordError && (
                                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={confirmPasswordError ? "border border-red-500 focus:ring-red-500" : ""}
                            />
                            {confirmPasswordError && (
                                <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
                            )}
                        </div>
                        <Button  onClick={onSubmit} variant="secondary" className="w-full bg-red-700 hover:bg-red-900 cursor-grab">
                            Create an account
                            {loading && (
                                <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
  )
}

export default signUp

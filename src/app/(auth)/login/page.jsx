"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api, ENDPOINT } from '@/lib/api'
import { userLoggedInDetails } from '@/redux/userSlice'
import { LucideLoader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {useDispatch} from "react-redux";

function login() {

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [loading, setLoading]= useState(false);
  const router= useRouter();
  const dispatch= useDispatch();


  const onSubmit = async () => {
    try {
      if(!email || !password) {
        alert("Please enter email and password");
        return;
      }
      setLoading(true);
      const res= await api.post(ENDPOINT.login, {
        email: email,
        password: password
      });
      if(res.data.status === "success") {
        // logged in .. do what u want
        
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
    <div className='h-screen flex justify-center items-center'>
      <Card className="bg-[#050208] w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className='flex flex-col gap-2'>
            <Label htmlFor= "email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xyz@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor= "password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={onSubmit} variant={"secondary"} className="w-full bg-red-700 hover:bg-red-900 cursor-grab">
            Sign in
            {loading && <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />}
          </Button>
        </CardFooter>
        <div className="mt-4 text-center text-sm pb-6 flex justify-between px-6">
          <Link href="">Forgot Password?</Link>
            <div>
              Need an account?
              <Link href="/signup" className='underline'>Sign Up</Link>
            </div>
        </div>
      </Card>

    </div>
  )
}

export default login

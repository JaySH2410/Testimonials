import React, { useEffect, useState, useContext } from 'react'
import { Car, MailOpen } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { userContext } from '../hooks/useContext';
import { useNavigate } from "react-router-dom"
import { comma } from 'postcss/lib/list';
// import Heading from '../myComponets/Heading';

const LoginSignup = () => {
    const [loginFlag, setLoginFlag] = useState(true);
    const { user, setUser } = useContext(userContext);
    const [tuser, setTUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(tuser);
        if (tuser) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tuser.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${tuser.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    //call api to get user info to localhost:3000/api/existingUser?email=

                    setUser(prev => ({
                        ...prev,
                        name: res.data.name,
                        email: res.data.email,
                        picture: res.data.picture
                    }));
                    sessionStorage.setItem("name", res.data.name);
                    sessionStorage.setItem("email", res.data.email);
                    sessionStorage.setItem("picture", res.data.picture);
                })
                .catch((err) => console.log(err));
        }
    }, [tuser]);

    useEffect(() => {
        console.log(profile);
    }, [profile])

    useEffect(() => {
        console.log(user);
        if (user.email !== undefined) {
            navigate("/dashboard");
        }
    }, [user])

    async function getDbUserInfo(userInfo) {
        try {
            const response = await fetch("http://localhost:3000/api/getUserDetailsByEmail?email=" + userInfo.email);
            const data = await response.json();
            console.log(data);

            return data;
        } catch (err) {
            console.log(err); // Handle error
        }
    }

    async function getUserInfo(codeResponse) {
        try {
            const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            });
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err); // Handle error
        }
    }

    async function createUser(userInfo) {
        try {
            const response = await fetch("http://localhost:3000/api/createNewUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture
                })
            });
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err); // Handle error
        }
    }

    const handleLogin = async (codeResponse) => {
        const userInfo = await getUserInfo(codeResponse);
        const dbUserInfo = await getDbUserInfo(userInfo);
        console.log(dbUserInfo);

        if (dbUserInfo.length > 0) {
            // const userInfo = await getUserInfo(codeResponse);
            setUser(prev => ({
                ...prev,
                id: dbUserInfo[0].id,
                name: dbUserInfo[0].name,
                email: dbUserInfo[0].email,
                picture: dbUserInfo[0].picture
            }));
            sessionStorage.setItem("id", dbUserInfo[0].id);
            sessionStorage.setItem("name", dbUserInfo[0].name);
            sessionStorage.setItem("email", dbUserInfo[0].email);
            sessionStorage.setItem("picture", dbUserInfo[0].picture);
        }
        else {
            //TODO: create the user first
            // const userInfo = await getUserInfo(codeResponse);
            const newUser = await createUser(userInfo);
            console.log(newUser);
            setUser(prev => ({
                ...prev,
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture
            }));
            sessionStorage.setItem("id", newUser.id);
            sessionStorage.setItem("name", newUser.name);
            sessionStorage.setItem("email", newUser.email);
            sessionStorage.setItem("picture", newUser.picture);
        }
    }

    const googleLogin = useGoogleLogin({
        // onSuccess: (codeResponse) => setTUser(codeResponse),
        onSuccess: (codeResponse) => handleLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });


    return (
        <div className="flex min-h-screen flex-col py-24 px-60">
            <Card className="w-240">
                <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-28 text-white">
                    {/* <MailOpen size={40} strokeWidth={2} className='mr-2 mb-0.5' /> */}
                    <img className="h-9" src="sticky-notes.png" alt="Girl in a jacket"  />
                    {/* width="55" height="200" */}
                    <h1 className="flex text-4xl font-bold text-center">Testimonials</h1>
                </div>
                <CardHeader>
                    <CardTitle className="text-3xl">Login to Testimonials</CardTitle>
                    <div className='grid grid-cols-2 gap-4 pt-6'>
                        <CardDescription className="text-base"><strong>Welcome to Testimonials.</strong> Your one stop for all your Testimonials needs.</CardDescription>
                        <Button onClick={() => googleLogin()}>
                            <div className='h-4 w-4 mr-2'>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                            </div>
                            {loginFlag ? "Login with Google" : "Sign Up with Google"}
                        </Button>
                    </div>
                </CardHeader>
                <div className='flex flex-row place-content-around'>
                    <CardFooter>
                        <Button variant="link" onClick={() => setLoginFlag(!loginFlag)}>
                            {loginFlag ? "New User" : "Existing User"}
                        </Button>
                    </CardFooter>
                </div>

            </Card>
        </div>
    )
}

export default LoginSignup;
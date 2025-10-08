import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-slate-50 p-4'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3'>
                    Welcome Back
                </h1>
                <p className='text-lg text-gray-600'>
                    Choose your role to continue your journey with us.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full'>
                <Card className='transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-semibold'>Login as a Rider</CardTitle>
                        <CardDescription>
                            Access your account to book and manage your rides.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-center items-center p-6'>
                        <img
                            src="/rider.svg"
                            alt="A person waiting for a ride"
                            className='w-full max-w-xs h-auto rounded-md'
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full text-md py-6'>
                            Continue as Rider <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-semibold'>Login as a Captain</CardTitle>
                        <CardDescription>
                            Manage your trips, earnings, and driver profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-center items-center p-6'>
                        <img
                            src="/driver.svg"
                            alt="A person driving a car"
                            className='w-full max-w-xs h-[210px] rounded-md'
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full text-md py-6'>
                            Continue as Captain <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Login;
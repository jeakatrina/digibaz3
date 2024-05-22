"use client"

import { Controller } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, startTransition } from 'react'
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormControl
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { loginUserSchema } from '@/schema'
import { Input } from '../ui/input'
import {
    ToggleGroup,
    ToggleGroupItem
} from '../ui/toggle-group'
import { Button } from '../ui/button'
import Link from 'next/link'
import { login } from '@/actions/auth.actions';
import toast from 'react-hot-toast';

interface LoginFormProps {

}

const LoginForm: FC<LoginFormProps> = ({ }) => {

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',

        }
    })

    const onSubmit = (values: z.infer<typeof loginUserSchema>) => {
        console.log(values)

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    toast.error(data.error)
                } else {
                    toast.success('Login successful')
                }
            })
        })
    }

    return (
        <div className='w-screen h-3/4 rounded-lg overflow-hidden flex flex-row shadow-2xl bg-primary bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-300 to-indigo-100'>

            <div className='h-full w-full bg-primary-foreground flex items-center justify-center flex-col lg:w-2/5'>
                <h1 className='text-xl font-semibold text-left'>Sign-In</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-3/5'
                    >
                        <div className='space-y-2'>

                            {/* email */}
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='agreatartist@gmail.com'
                                                type='email'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* password */}
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='*******'
                                                type='password'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>
                        </div>

                        <Button type='submit' className='w-full mt-4'>Login</Button>
                        <p className='text-xs mt-4'>have an account? <span className='font-semibold text-indigo-700'><Link href='/register'>sign up</Link></span></p>
                    </form>

                </Form>
            </div>
            <div className='h-full w-3/5 hidden justify-start text-primary lg:flex'>
                <div className='flex flex-col items-start justify-center ml-4'>
                    <h1 className='text-9xl font-semibold '>
                        Digital <br /> Bazaaar
                    </h1>
                    <h1 className='font-semibold text-2xl ml-2 text-balance'>
                        Welcome to the digital realm!
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
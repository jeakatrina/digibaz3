import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { FC, startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSettingsSchema } from '@/schema'
import { editProfile } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { User } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { EditIcon } from 'lucide-react'

interface EditProfileFormProps {
    userData: User | null
}

const EditProfileForm: FC<EditProfileFormProps> = ({ userData }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false) // State to control the dialog

    const form = useForm<z.infer<typeof userSettingsSchema>>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: userData ? {
            name: userData.name || '',
            username: userData.username || '',
            bio: userData.bio || '',
            password: '',
            newPassword: ''
        } : {
            name: '',
            username: '',
            bio: '',
            password: '',
            newPassword: ''
        }
    })

    const onSubmit = (values: z.infer<typeof userSettingsSchema>) => {
        startTransition(() => {
            editProfile(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    toast.error(data.error)
                } else {
                    toast.success('Profile edited successfully')
                    setIsOpen(false) // Close the dialog
                    router.refresh()
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='px-4 py-2 rounded-full bg-[#8889DA]'>
                <p className="flex flex-row justify-center items-center">
                    <EditIcon className='mr-0 md:mr-2' size={20} /><span className='hidden md:flex'>Edit Profile</span>
                </p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit Profile</DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='John Dope'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='_thebestartist'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name='bio'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder='Inspiring to be the best artist'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button type='submit'>Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileForm

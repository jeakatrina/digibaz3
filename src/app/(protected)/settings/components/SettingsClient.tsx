'use client'

import * as z from 'zod'
import { UploadButton } from '@/utils/uploadthing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FC, startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { userSettingsSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfile } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { PaletteIcon } from 'lucide-react'

interface SettingsClientProps {
    userData: User | null
}

const SettingsClient: FC<SettingsClientProps> = ({
    userData
}) => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const router = useRouter()

    console.log('get user settings: ', userData)

    const form = useForm<z.infer<typeof userSettingsSchema>>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: userData ? {
            name: userData.name || '',
            username: userData.username || '',
            avatar: userData.image || '',
            bio: userData.bio || '',
            facebookLink: userData.facebookLink || '',
            instagramLink: userData.instagramLink || '',
            gmailLink: userData.gmailLink || '',
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        } : {
            name: '',
            username: '',
            bio: '',
            facebookLink: '',
            instagramLink: '',
            gmailLink: '',
            password: '',
            newPassword: '',
            confirmNewPassword: ''
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
                    router.refresh()
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    return (
        <Card className='my-4'>
            <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>
                    Change your user settings here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 overflow-auto'
                    >
                        <div className=" h-fill flex flex-col-reverse lg:space-x-4 lg:flex-row">
                            <div className="flex flex-col mt-2 space-y-4 w-full lg:w-1/2 lg:mt-0">
                                <h2 className='font-semibold'>Basic information</h2>
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
                                <Separator />
                                <h2 className='font-semibold'>Personal Privacy</h2>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='******'
                                                    type='password'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name='newPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='******'
                                                    type='password'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name='confirmNewPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='******'
                                                    type='password'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <Separator />
                                <h2 className='font-semibold'>Contact Links</h2>
                                <FormField
                                    control={form.control}
                                    name='facebookLink'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>facebook</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='https://facebook.com/username'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name='instagramLink'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='https://instagram.com/username'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name='gmailLink'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='youremail@gmail.com'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className='w-full flex items-center justify-center flex-col space-y-2 lg:w-1/2 lg:justify-start lg:items-start'>
                                <h2 className='font-semibold'>User Avatar</h2>
                                <div className='relative w-full h-auto lg:h-3/4 overflow-hidden rounded-sm aspect-square'>
                                    {uploadedFileName ? (
                                        <Image
                                            src={uploadedImageUrl || ''}
                                            alt='uploaded image'
                                            layout='fill' // Fill the container
                                            objectFit='cover'
                                            className='rounded-sm'
                                        />
                                    ) : (
                                        <Image
                                            src={userData?.image || ''}
                                            alt='uploaded image'
                                            layout='fill' // Fill the container
                                            objectFit='cover'
                                            className='rounded-sm '
                                        />
                                    )}
                                </div>
                                <div className="mx-auto">
                                    <UploadButton
                                        appearance={{
                                            button({ ready, isUploading }) {
                                                return `custom-button ${ready ? "custom-button-ready" : "custom-button-not-ready"} ${isUploading ? "custom-button-uploading" : ""}`;
                                            },
                                            container: "custom-container",
                                            allowedContent: "custom-allowed-content",
                                        }}
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            if (res && res.length > 0) {
                                                const uploadedFile = res[0];
                                                const uploadedUrl = uploadedFile.url;
                                                setUploadedImageUrl(uploadedUrl);
                                                form.setValue('avatar', uploadedUrl);
                                                const fileName = uploadedFile.name;
                                                setUploadedFileName(fileName);
                                                alert(`Upload Completed. File name: ${fileName}`);
                                            } else {
                                                alert("No files uploaded.");
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        <Separator />

                        <Button type='submit'>Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingsClient
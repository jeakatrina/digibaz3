'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceFormSchema } from '@/schema'
import { addService } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { Services } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { UploadButton, UploadDropzone } from '@/utils/uploadthing'
import { HandCoins, PaletteIcon } from 'lucide-react'
import Image from 'next/image'

interface ServiceFormProps {
}

const ServiceForm: FC<ServiceFormProps> = ({

}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    // const title = serviceData ? 'Edit Service' : 'Add Service'
    // const toastMessage = serviceData ? 'Service edited successfully' : 'Service added successfully'
    // const action = serviceData ? 'Save Changes' : 'Submit'

    const form = useForm<z.infer<typeof serviceFormSchema>>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            name: '',
            description: '',
            imageUrl: uploadedImageUrl || '', // Default value is an empty string
            startingPrice: 0
        }
    })

    const onSubmit = (values: z.infer<typeof serviceFormSchema>) => {
        addService(values).then((data) => {
            if (data?.error) {
                form.reset()
                toast.error(data.error)
            } else {
                toast.success('Service added successfully!')
                setIsOpen(false)
                router.refresh()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='px-4 py-1 rounded-full bg-[#8889DA]'>
                <p className="flex flex-row justify-center items-center">
                    <HandCoins className='mr-0 md:mr-2' size={20} /><span className='hidden md:flex'>Add Service</span>
                </p>
            </DialogTrigger>
            <DialogContent className='md:max-w-4xl overflow-auto'>
                <DialogHeader>New Service</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="space-y-4 w-full md:w-2/5 h-full flex flex-col justify-center items-center overflow-hidden rounded-sm">
                                <FormItem>

                                    <div className="w-full flex flex-col space-y-1 items-center justify-center">
                                        <div className='relative w-full h-[250px] aspect-square overflow-hidden rounded-sm mb-2'>
                                            {uploadedFileName ? (
                                                <Image
                                                    src={uploadedImageUrl || ''}
                                                    alt='uploaded image'
                                                    fill
                                                    objectFit='cover'
                                                    className='rounded-sm'
                                                />) : (
                                                <div className='w-full h-[250px] border rounded-sm flex flex-col items-center justify-center'>
                                                    <PaletteIcon size={100} className='text-slate-500 mb-4' />
                                                    your artwork image here
                                                </div>
                                            )
                                            }
                                        </div>

                                        <UploadButton
                                            appearance={{
                                                button({ ready, isUploading }) {
                                                    return `custom-button ${ready ? "custom-button-ready" : "custom-button-not-ready"
                                                        } ${isUploading ? "custom-button-uploading" : ""}`;
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
                                                    form.setValue('imageUrl', uploadedUrl);
                                                    // Set the file name
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

                                    <FormMessage />
                                </FormItem>
                            </div>
                            <div className="space-y-4 w-full md:w-3/5">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder='3D Art'
                                                    type='text'
                                                    autoComplete={Math.random().toString()}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder='A brief description of your service' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <FormField
                                    control={form.control}
                                    name='startingPrice'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Starting Price</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='number' placeholder='100' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end"><Button type='submit'>Submit</Button></div>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceForm

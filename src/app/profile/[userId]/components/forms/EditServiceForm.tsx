import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { editServiceFormSchema, serviceFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { editService } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Edit, PaintbrushIcon, Palette, PaletteIcon, PencilIcon, PlusIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Services } from '@prisma/client'

interface EditServiceFormProps {
    serviceData: Services
}

const EditServiceForm: FC<EditServiceFormProps> = ({
    serviceData
}) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const form = useForm<z.infer<typeof serviceFormSchema>>({
        resolver: zodResolver(editServiceFormSchema),
        defaultValues: serviceData ? {
            name: serviceData?.name || '',
            description: serviceData?.description || '',
            imageUrl: serviceData?.thumbnail || '', // Use existing artwork's image URL when no new image is uploaded
            startingPrice: serviceData?.startingPrice || 0
        } : {
            name: '',
            description: '',
            imageUrl: '', // Default value is an empty string
            startingPrice: 0
        }
    })



    const onSubmit = (values: z.infer<typeof serviceFormSchema>) => {
        editService(values, serviceData?.id).then((data) => {
            if (data?.error) {
                form.reset()
                toast.error(data.error)
                console.log(data.error)
            } else {
                toast.success('Artwork added successfully!')
                setIsOpen(false)
                router.refresh()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    // console.log('services: ', servicesData)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='px-4 py-1 rounded-full bg-[#8889DA]'>
                <p className="flex flex-row justify-center items-center">
                    <Edit size={20} className='mr-2' /> Edit
                </p>
            </DialogTrigger>
            <DialogContent className='md:max-w-4xl overflow-auto'>
                <DialogHeader>New Artwork</DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="space-y-4 w-full md:w-2/5 h-full flex flex-col justify-center items-center overflow-hidden rounded-sm">
                                <div className='relative w-full h-[250px] overflow-hidden rounded-sm'>
                                    {uploadedFileName ? (
                                        <Image
                                            src={uploadedImageUrl || ''}
                                            alt='uploaded image'
                                            fill
                                            objectFit='cover'
                                            className='rounded-sm'
                                        />
                                    ) : (
                                        serviceData?.thumbnail ? (
                                            <Image
                                                src={serviceData?.thumbnail || ''}
                                                alt='uploaded image'
                                                fill
                                                objectFit='cover'
                                                className='rounded-sm'
                                            />
                                        ) : (
                                            <div className='w-full h-[250px] border rounded-sm flex flex-col items-center justify-center'>
                                                <PaletteIcon size={100} className='text-slate-500 mb-4' />
                                                your artwork image here
                                            </div>
                                        )
                                    )}
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
                            <div className="space-y-4 w-full md:w-3/5">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='My masterpiece'
                                                    autoComplete={Math.random().toString()}
                                                    type='text'
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

export default EditServiceForm
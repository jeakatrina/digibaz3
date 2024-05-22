import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { artworkFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { addArtwork } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { PaintbrushIcon, Palette, PaletteIcon, PencilIcon, PlusIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Services } from '@prisma/client'

interface ArtworkFormProps {
    services: Services[]
}

const ArtworkForm: FC<ArtworkFormProps> = ({
    services
}) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const form = useForm<z.infer<typeof artworkFormSchema>>({
        resolver: zodResolver(artworkFormSchema),
        defaultValues: {
            title: '',
            serviceId: '',
            description: '',
            imageUrl: uploadedImageUrl || '', // Default value is an empty string
            startingPrice: 0
        }
    })

    const onSubmit = (values: z.infer<typeof artworkFormSchema>) => {
        addArtwork(values).then((data) => {
            if (data?.error) {
                form.reset()
                toast.error(data.error)
            } else {
                toast.success('Artwork added successfully!')
                setIsOpen(false)
                router.refresh()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    console.log('services: ', services)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='px-4 py-1 rounded-full bg-[#8889DA]'>
                <p className="flex flex-row justify-center items-center">
                    <PencilIcon className='mr-0 md:mr-2' size={20} /><span className='hidden md:flex'>Post Artwork</span>
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
                            <div className="space-y-4 w-full md:w-3/5">
                                <FormField
                                    control={form.control}
                                    name='title'
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
                                    name='serviceId'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                defaultValue={field.value}
                                                                placeholder="Select a service"
                                                            />
                                                        </ SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {services && services.map((service) => (
                                                            <SelectItem
                                                                key={service.id}
                                                                value={service.id}
                                                            >
                                                                {service.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </ Select>
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

export default ArtworkForm
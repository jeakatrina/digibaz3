'use client'

import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FC, startTransition, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { avatarFormSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { uploadAvatar } from '@/actions/user.actions';
import { UploadButton } from '@/utils/uploadthing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProfileImageUploadProps { }

const ProfileImageUpload: FC<ProfileImageUploadProps> = () => {
    const router = useRouter();

    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const form = useForm<z.infer<typeof avatarFormSchema>>({
        resolver: zodResolver(avatarFormSchema),
        defaultValues: {
            imageUrl: uploadedImageUrl || '',
        },
    });

    const onSubmit = (values: z.infer<typeof avatarFormSchema>) => {
        startTransition(() => {
            uploadAvatar(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        toast.error(data.error);
                        console.log(data.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    const close = () => {
        toast.success('Avatar updated successfully');
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full h-full">Upload Avatar</DialogTrigger>
            <DialogContent className='flex flex-col overflow-auto'>
                <DialogHeader>New Avatar</DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 h-full'
                    >
                        <FormItem>
                            <div className="flex flex-col items-center justify-center">
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
                                            const fileName = uploadedFile.name;
                                            setUploadedFileName(fileName);
                                            form.handleSubmit(onSubmit)();
                                            alert(`Upload Completed. File name: ${fileName}`);
                                        } else {
                                            alert("No files uploaded.");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                                {uploadedFileName && (
                                    <div className="mt-4 w-full flex flex-col items-center justify-center space-y-2">
                                        <div className="h-full w-full flex items-center justify-center">
                                            <div className="aspect-square w-[300px] h-[300px] overflow-hidden relative">
                                                <Image
                                                    src={uploadedImageUrl || 'defaultImageUrl'}
                                                    alt="Uploaded Image"
                                                    fill
                                                    objectFit='cover'
                                                    className='rounded-full'
                                                />
                                            </div>
                                        </div>
                                        <p className='text-xs'>Uploaded file: {uploadedFileName}</p>
                                    </div>
                                )}
                            </div>
                        </FormItem>
                        <Button onClick={close}>Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileImageUpload;


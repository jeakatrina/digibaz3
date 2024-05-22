'use client'

import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { bioFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addBio } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


interface EditBioFormProps {

}

const EditBioForm: FC<EditBioFormProps> = ({ }) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof bioFormSchema>>({
        resolver: zodResolver(bioFormSchema),
        defaultValues: {
            bio: ''
        }
    })

    const onSubmit = (values: z.infer<typeof bioFormSchema>) => {
        console.log(values)

        startTransition(() => {
            addBio(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    toast.error(data.error)
                    console.log(data.error)
                } else {

                    toast.success('Bio added successfully')
                    router.refresh()
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    }
    return (
        <Dialog>
            <DialogTrigger>
                Add Bio
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Add Bio
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='bio'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder='Inspiring to be the best artist'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button type='submit'>Add Bio</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditBioForm
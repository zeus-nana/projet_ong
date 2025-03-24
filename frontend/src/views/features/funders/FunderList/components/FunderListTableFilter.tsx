// FunderList/components/FunderListTableFilter.tsx
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Checkbox from '@/components/ui/Checkbox'
import Input from '@/components/ui/Input'
import { Form, FormItem } from '@/components/ui/Form'
import useFunderList from '../hooks/useFunderList'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'

type FormSchema = {
    category: Array<string>
    name: string
}

const categoryList = ['public', 'private', 'international']

const validationSchema: ZodType<FormSchema> = z.object({
    category: z.array(z.string()),
    name: z.string(),
})

const FunderListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const { filterData, setFilterData } = useFunderList()

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const { handleSubmit, reset, control } = useForm<FormSchema>({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        setFilterData(values)
        setIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => openDialog()}>
                Filtre
            </Button>
            <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <h4 className="mb-4">Filtre</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem label="Nom">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input type="text" autoComplete="off" placeholder="Rechercher par nom" {...field} />
                            )}
                        />
                    </FormItem>
                    <FormItem label="Catégorie">
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Checkbox.Group vertical className="flex mt-4" {...field}>
                                    {categoryList.map((category, index) => (
                                        <Checkbox
                                            key={category + index}
                                            name={field.name}
                                            value={category}
                                            className="justify-between flex-row-reverse heading-text"
                                        >
                                            {category}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button type="button" onClick={() => reset()}>
                            Réinitialiser
                        </Button>
                        <Button type="submit" variant="solid">
                            Appliquer
                        </Button>
                    </div>
                </Form>
            </Dialog>
        </>
    )
}

export default FunderListTableFilter

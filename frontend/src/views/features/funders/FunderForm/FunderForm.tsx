// FunderForm/FunderForm.tsx
import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './components/OverviewSection'
import CategorySection from './components/CategorySection'
import ContactSection from './components/ContactSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { FunderFormSchema } from './types'

type FunderFormProps = {
    onFormSubmit: (values: FunderFormSchema) => void
    defaultValues?: FunderFormSchema
    isEdit?: boolean
} & CommonProps

const validationSchema: ZodType<FunderFormSchema> = z.object({
    name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }).max(255),
    acronym: z.string().max(50).nullable().optional(),
    description: z.string().nullable().optional(),
    category: z.enum(['public', 'private', 'international'], {
        errorMap: () => ({ message: 'La catégorie doit être "public", "private" ou "international"' }),
    }),
    country_iso_2: z
        .string()
        .length(2, { message: 'Le code ISO du pays doit être composé de 2 caractères' })
        .nullable()
        .optional(),
    address: z.string().max(255).nullable().optional(),
    contact_name: z.string().max(255).nullable().optional(),
    contact_email: z.string().email({ message: 'Format email invalide' }).max(255).nullable().optional(),
    contact_phone: z.string().max(50).nullable().optional(),
})

const FunderForm = (props: FunderFormProps) => {
    const { onFormSubmit, defaultValues = {}, isEdit = false, children } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<FunderFormSchema>({
        defaultValues: {
            category: 'public',
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues), reset])

    const onSubmit = (values: FunderFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <OverviewSection control={control} errors={errors} />
                        <ContactSection control={control} errors={errors} />
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        <CategorySection control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default FunderForm

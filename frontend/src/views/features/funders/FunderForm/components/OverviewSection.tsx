// FunderForm/components/OverviewSection.tsx
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type OverviewSectionProps = FormSectionBaseProps

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Informations générales</h4>
            <FormItem label="Nom" invalid={Boolean(errors.name)} errorMessage={errors.name?.message}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input type="text" autoComplete="off" placeholder="Nom du bailleur de fonds" {...field} />
                    )}
                />
            </FormItem>
            <FormItem label="Acronyme" invalid={Boolean(errors.acronym)} errorMessage={errors.acronym?.message}>
                <Controller
                    name="acronym"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Acronyme (optionnel)"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Input
                            textArea
                            type="text"
                            autoComplete="off"
                            placeholder="Description (optionnel)"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default OverviewSection

// FunderForm/components/CategorySection.tsx
import Card from '@/components/ui/Card'
import Radio from '@/components/ui/Radio'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type CategorySectionProps = FormSectionBaseProps

const CategorySection = ({ control, errors }: CategorySectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Catégorie</h4>
            <FormItem invalid={Boolean(errors.category)} errorMessage={errors.category?.message}>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Radio.Group vertical value={field.value} onChange={field.onChange}>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Privé</Radio>
                            <Radio value="international">International</Radio>
                        </Radio.Group>
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default CategorySection

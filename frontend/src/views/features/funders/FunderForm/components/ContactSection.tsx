// FunderForm/components/ContactSection.tsx
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import { countryList } from '@/constants/countries.constant'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps } from '../types'
import type { ControlProps, OptionProps } from 'react-select'

type ContactSectionProps = FormSectionBaseProps

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components

const CustomSelectOption = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar shape="circle" size={20} src={`/img/countries/${data.value.toLowerCase()}.png`} />
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value.toLowerCase()}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const ContactSection = ({ control, errors }: ContactSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Informations de contact</h4>
            <FormItem label="Pays" invalid={Boolean(errors.country_iso_2)} errorMessage={errors.country_iso_2?.message}>
                <Controller
                    name="country_iso_2"
                    control={control}
                    render={({ field }) => (
                        <Select<CountryOption>
                            options={countryList}
                            {...field}
                            components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                            }}
                            placeholder="Sélectionner un pays"
                            value={field.value ? countryList.filter((option) => option.value === field.value) : null}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem label="Adresse" invalid={Boolean(errors.address)} errorMessage={errors.address?.message}>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Adresse"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Nom du contact"
                invalid={Boolean(errors.contact_name)}
                errorMessage={errors.contact_name?.message}
            >
                <Controller
                    name="contact_name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nom du contact"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={Boolean(errors.contact_email)}
                errorMessage={errors.contact_email?.message}
            >
                <Controller
                    name="contact_email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="email"
                            autoComplete="off"
                            placeholder="Email"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Téléphone"
                invalid={Boolean(errors.contact_phone)}
                errorMessage={errors.contact_phone?.message}
            >
                <Controller
                    name="contact_phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Téléphone"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default ContactSection

import Card from '@/components/ui/Card'

type ContactSectionProps = {
    data: {
        country_iso_2: string | null
        address: string | null
        contact_name: string | null
        contact_email: string | null
        contact_phone: string | null
    }
    countryName?: string | null
}

const ContactInfoItem = ({ label, value }: { label: string; value: string | null }) => (
    <div className="mb-4">
        <div className="font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</div>
        <div className="font-medium">{value || '-'}</div>
    </div>
)

const ContactSection = ({ data, countryName }: ContactSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Informations de contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContactInfoItem label="Pays" value={countryName || data.country_iso_2 || '-'} />
                <ContactInfoItem label="Nom du contact" value={data.contact_name} />
                <ContactInfoItem label="Email" value={data.contact_email} />
                <ContactInfoItem label="Téléphone" value={data.contact_phone} />
            </div>
            {data.address && (
                <div className="mt-2">
                    <div className="font-semibold text-gray-500 dark:text-gray-400 mb-1">Adresse</div>
                    <div className="font-medium whitespace-pre-line">{data.address}</div>
                </div>
            )}
        </Card>
    )
}

export default ContactSection

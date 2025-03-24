// FunderDetails/components/ProfileSection.tsx
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { apiDeleteFunder } from '@/services/FunderService'

type FunderInfoFieldProps = {
    title?: string
    value?: string | null
}

type ProfileSectionProps = {
    data: {
        id: number
        name: string
        acronym: string | null
        category: 'public' | 'private' | 'international'
        description: string | null
        created_at: Date
        updated_at: Date
        country_iso_2: string | null
    }
}

const FunderInfoField = ({ title, value }: FunderInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value || '-'}</p>
        </div>
    )
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await apiDeleteFunder(data.id)
            setDialogOpen(false)
            navigate('/features/funders/funder-list')
            toast.push(
                <Notification title="Suppression réussie" type="success">
                    Bailleur de fonds supprimé avec succès
                </Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification title="Erreur" type="danger">
                    Erreur lors de la suppression du bailleur de fonds
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = () => {
        navigate(`/features/funders/funder-edit/${data.id}`)
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'public':
                return 'Public'
            case 'private':
                return 'Privé'
            case 'international':
                return 'International'
            default:
                return category
        }
    }

    const flagSrc = data.country_iso_2
        ? `/img/countries/${data.country_iso_2.toLowerCase()}.png`
        : '/img/placeholder.png'

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Modifier">
                    <button className="close-button button-press-feedback" type="button" onClick={handleEdit}>
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar size={90} shape="circle" src={flagSrc} />
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <FunderInfoField title="Acronyme" value={data.acronym} />
                    <FunderInfoField title="Catégorie" value={getCategoryLabel(data.category)} />
                    <FunderInfoField title="Date de création" value={dayjs(data.created_at).format('DD/MM/YYYY')} />
                    <FunderInfoField title="Dernière mise à jour" value={dayjs(data.updated_at).format('DD/MM/YYYY')} />
                    {data.description && (
                        <div className="col-span-full">
                            <span className="font-semibold">Description</span>
                            <p className="mt-1">{data.description}</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <Button block variant="solid" onClick={handleEdit}>
                        Modifier
                    </Button>
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                        loading={isDeleting}
                    >
                        Supprimer
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Supprimer le bailleur de fonds"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Êtes-vous sûr de vouloir supprimer ce bailleur de fonds ? Cette action ne peut pas être annulée.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection

// FunderDetails/components/ContactSection.tsx

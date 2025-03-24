import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetFunder, apiUpdateFunder, apiDeleteFunder } from '@/services/FunderService'
import FunderForm from '../FunderForm'
import Loading from '@/components/shared/Loading'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { FunderFormSchema } from '../FunderForm'

const FunderEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        id ? [`/api/v1/funders/${id}`, { id: Number(id) }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetFunder(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleFormSubmit = async (values: FunderFormSchema) => {
        if (!id) return

        try {
            setIsSubmitting(true)
            await apiUpdateFunder(Number(id), values)
            toast.push(<Notification type="success">Modifications enregistrées!</Notification>, {
                placement: 'top-center',
            })
            navigate('/features/funders/funder-list')
        } catch (error) {
            toast.push(<Notification type="danger">Erreur lors de la mise à jour du bailleur de fonds</Notification>, {
                placement: 'top-center',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleConfirmDelete = async () => {
        if (!id) return

        try {
            setIsDeleting(true)
            await apiDeleteFunder(Number(id))
            setDeleteConfirmationOpen(false)
            toast.push(<Notification type="success">Bailleur de fonds supprimé!</Notification>, {
                placement: 'top-center',
            })
            navigate('/features/funders/funder-list')
        } catch (error) {
            toast.push(<Notification type="danger">Erreur lors de la suppression du bailleur de fonds</Notification>, {
                placement: 'top-center',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    const getDefaultValues = (): FunderFormSchema | undefined => {
        if (data?.data?.funder) {
            const funder = data.data.funder
            return {
                name: funder.name,
                acronym: funder.acronym || '',
                description: funder.description || '',
                category: funder.category,
                country_iso_2: funder.country_iso_2 || '',
                address: funder.address || '',
                contact_name: funder.contact_name || '',
                contact_email: funder.contact_email || '',
                contact_phone: funder.contact_phone || '',
            }
        }
        return undefined
    }

    return (
        <Loading loading={isLoading}>
            {data?.data?.funder && (
                <>
                    <FunderForm defaultValues={getDefaultValues()} isEdit={true} onFormSubmit={handleFormSubmit}>
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Retour
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                        loading={isDeleting}
                                    >
                                        Supprimer
                                    </Button>
                                    <Button variant="solid" type="submit" loading={isSubmitting}>
                                        Enregistrer
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </FunderForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Supprimer le bailleur de fonds"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>Êtes-vous sûr de vouloir supprimer ce bailleur de fonds ? Cette action est irréversible.</p>
                    </ConfirmDialog>
                </>
            )}
        </Loading>
    )
}

export default FunderEdit

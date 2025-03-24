// FunderList/components/FunderListSelected.tsx
import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import useFunderList from '../hooks/useFunderList'
import { apiDeleteFunder } from '@/services/FunderService'
import { TbChecks } from 'react-icons/tb'

const FunderListSelected = () => {
    const { selectedFunder, funderList, mutate, funderListTotal, setSelectAllFunder } = useFunderList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        setDeleteLoading(true)
        try {
            const deletePromises = selectedFunder.map((funder) => apiDeleteFunder(funder.id))
            await Promise.all(deletePromises)

            const newFunderList = funderList.filter((funder) => {
                return !selectedFunder.some((selected) => selected.id === funder.id)
            })

            setSelectAllFunder([])
            toast.push(<Notification type="success">Bailleurs de fonds supprimés avec succès!</Notification>, {
                placement: 'top-center',
            })

            mutate(
                {
                    status: 'succès',
                    results: funderListTotal - selectedFunder.length,
                    data: {
                        funders: newFunderList,
                    },
                },
                false,
            )
        } catch (error) {
            toast.push(<Notification type="danger">Erreur lors de la suppression</Notification>, {
                placement: 'top-center',
            })
        } finally {
            setDeleteLoading(false)
            setDeleteConfirmationOpen(false)
        }
    }

    return (
        <>
            {selectedFunder.length > 0 && (
                <StickyFooter
                    className="flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedFunder.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">{selectedFunder.length} Bailleurs</span>
                                            <span>sélectionnés</span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    loading={deleteLoading}
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={handleDelete}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Supprimer les bailleurs"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>Êtes-vous sûr de vouloir supprimer ces bailleurs de fonds ? Cette action est irréversible.</p>
            </ConfirmDialog>
        </>
    )
}

export default FunderListSelected

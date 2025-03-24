// FunderList/components/FunderListTable.tsx
import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useFunderList from '../hooks/useFunderList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Funder } from '../types'
import type { TableQueries } from '@/@types/common'

const categoryColors: Record<string, string> = {
    public: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    private: 'bg-amber-200 dark:bg-amber-200 text-gray-900 dark:text-gray-900',
    international: 'bg-blue-200 dark:bg-blue-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Funder }) => {
    const flagSrc = row.country_iso_2 ? `/img/countries/${row.country_iso_2.toLowerCase()}.png` : '/img/placeholder.png'

    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={flagSrc} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/features/funders/funder-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const ActionColumn = ({ onEdit, onViewDetail }: { onEdit: () => void; onViewDetail: () => void }) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Modifier">
                <div className={`text-xl cursor-pointer select-none font-semibold`} role="button" onClick={onEdit}>
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Voir">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const FunderListTable = () => {
    const navigate = useNavigate()

    const {
        funderList,
        funderListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllFunder,
        setSelectedFunder,
        selectedFunder,
    } = useFunderList()

    const handleEdit = (funder: Funder) => {
        navigate(`/features/funders/funder-edit/${funder.id}`)
    }

    const handleViewDetails = (funder: Funder) => {
        navigate(`/features/funders/funder-details/${funder.id}`)
    }

    const columns: ColumnDef<Funder>[] = useMemo(
        () => [
            {
                header: 'Nom',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Acronyme',
                accessorKey: 'acronym',
                cell: (props) => {
                    return props.row.original.acronym || '-'
                },
            },
            {
                header: 'Catégorie',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={categoryColors[row.category]}>
                                <span className="capitalize">{row.category}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Contact',
                accessorKey: 'contact_name',
                cell: (props) => {
                    return props.row.original.contact_name || '-'
                },
            },
            {
                header: 'Email',
                accessorKey: 'contact_email',
                cell: (props) => {
                    return props.row.original.contact_email || '-'
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() => handleViewDetails(props.row.original)}
                    />
                ),
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedFunder.length > 0) {
            setSelectAllFunder([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Funder) => {
        setSelectedFunder(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Funder>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllFunder(originalRows)
        } else {
            setSelectAllFunder([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={funderList}
            noData={!isLoading && funderList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: funderListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) => selectedFunder.some((selected) => selected.id === row.id)}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default FunderListTable

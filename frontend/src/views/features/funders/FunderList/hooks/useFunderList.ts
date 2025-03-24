import useSWR from 'swr'
import { useFunderListStore } from '../store/funderListStore'
import type { GetFundersListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiGetFundersList } from '@/services/FunderService'

export default function useFunderList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedFunder,
        setSelectedFunder,
        setSelectAllFunder,
        setFilterData,
    } = useFunderListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/v1/funders', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetFundersList<GetFundersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    // Transformer la réponse du backend au format attendu par le frontend
    const transformFundersData = (data?: GetFundersListResponse) => {
        if (!data) return { list: [], total: 0 }

        return {
            list: data.data.funders.map((funder) => ({
                ...funder,
                status: 'active', // Valeur par défaut pour la propriété status
                img: `/img/avatars/funder-${funder.id % 10}.png`, // Image par défaut pour l'avatar
            })),
            total: data.results,
        }
    }

    const transformedData = data ? transformFundersData(data) : { list: [], total: 0 }
    const funderList = transformedData.list
    const funderListTotal = transformedData.total

    return {
        funderList,
        funderListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedFunder,
        setSelectedFunder,
        setSelectAllFunder,
        setFilterData,
    }
}

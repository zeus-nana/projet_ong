import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Funder, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: Filter = {
    category: ['public', 'private', 'international'],
    name: '',
}

export type FundersListState = {
    tableData: TableQueries
    filterData: Filter
    selectedFunder: Partial<Funder>[]
}

type FundersListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedFunder: (checked: boolean, funder: Funder) => void
    setSelectAllFunder: (funder: Funder[]) => void
}

const initialState: FundersListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedFunder: [],
}

export const useFunderListStore = create<FundersListState & FundersListAction>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedFunder: (checked, row) =>
        set((state) => {
            const prevData = state.selectedFunder
            if (checked) {
                return { selectedFunder: [...prevData, ...[row]] }
            } else {
                if (prevData.some((prevFunder) => row.id === prevFunder.id)) {
                    return {
                        selectedFunder: prevData.filter((prevFunder) => prevFunder.id !== row.id),
                    }
                }
                return { selectedFunder: prevData }
            }
        }),
    setSelectAllFunder: (row) => set(() => ({ selectedFunder: row })),
}))

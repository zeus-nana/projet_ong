// FunderList/components/FunderListTableTools.tsx
import useFunderList from '../hooks/useFunderList'
import FunderListSearch from './FunderListSearch'
import FunderListTableFilter from './FunderListTableFilter'
import cloneDeep from 'lodash/cloneDeep'

const FunderListTableTools = () => {
    const { tableData, setTableData } = useFunderList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <FunderListSearch onInputChange={handleInputChange} />
            <FunderListTableFilter />
        </div>
    )
}

export default FunderListTableTools

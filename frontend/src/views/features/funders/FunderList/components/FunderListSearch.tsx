// FunderList/components/FunderListSearch.tsx
import { forwardRef } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

type FunderListSearchProps = {
    onInputChange: (value: string) => void
}

const FunderListSearch = forwardRef<HTMLInputElement, FunderListSearchProps>((props, ref) => {
    const { onInputChange } = props

    return (
        <DebouceInput
            ref={ref}
            placeholder="Recherche rapide..."
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
})

FunderListSearch.displayName = 'FunderListSearch'

export default FunderListSearch

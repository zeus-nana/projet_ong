// FunderList/components/FunderListActionTools.tsx
import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useFunderList from '../hooks/useFunderList'
import { CSVLink } from 'react-csv'

const FunderListActionTools = () => {
    const navigate = useNavigate()

    const { funderList } = useFunderList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink className="w-full" filename="funderList.csv" data={funderList}>
                <Button icon={<TbCloudDownload className="text-xl" />} className="w-full">
                    Télécharger
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => navigate('/features/funders/funder-create')}
            >
                Ajouter
            </Button>
        </div>
    )
}

export default FunderListActionTools

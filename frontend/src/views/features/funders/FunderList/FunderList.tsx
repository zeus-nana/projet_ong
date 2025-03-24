// FunderList/FunderList.tsx
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import FunderListTable from './components/FunderListTable'
import FunderListActionTools from './components/FunderListActionTools'
import FunderListTableTools from './components/FunderListTableTools'
import FunderListSelected from './components/FunderListSelected'

const FunderList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Bailleurs de fonds</h3>
                            <FunderListActionTools />
                        </div>
                        <FunderListTableTools />
                        <FunderListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <FunderListSelected />
        </>
    )
}

export default FunderList

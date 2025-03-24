// FunderDetails/FunderDetails.tsx
import Card from '@/components/ui/Card'
import Loading from '@/components/shared/Loading'
import ProfileSection from './components/ProfileSection'
import ContactSection from './components/ContactSection'
import { apiGetFunder } from '@/services/FunderService'
import { countryList } from '@/constants/countries.constant'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

const FunderDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        id ? [`/api/v1/funders/${id}`, { id: Number(id) }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetFunder(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const countryName = useMemo(() => {
        if (!data?.data?.funder?.country_iso_2) return null

        return countryList.find((country) => country.value === data.data.funder.country_iso_2)?.label || null
    }, [data?.data?.funder?.country_iso_2])

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data?.data?.funder) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data.data.funder} />
                    </div>
                    <Card className="w-full">
                        <ContactSection data={data.data.funder} countryName={countryName} />
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default FunderDetails

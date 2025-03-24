import ApiService from './ApiService'
import type { Funder, GetFundersListResponse, GetFunderResponse } from '@/views/features/funders/FunderList/types'
import type { TableQueries } from '@/@types/common'
import endpointConfig from '@/configs/endpoint.config'

export async function apiGetFundersList<T = GetFundersListResponse, U extends Record<string, unknown> = TableQueries>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder,
        method: 'get',
        params,
    })
}

export async function apiGetFunder<T = GetFunderResponse, U extends Record<string, unknown> = { id: number }>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder + `/${id}`,
        method: 'get',
        params,
    })
}

export async function apiCreateFunder<T = Funder>(data: Partial<Funder>) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder,
        method: 'post',
        data,
    })
}

export async function apiUpdateFunder<T = Funder>(id: number, data: Partial<Funder>) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder + `/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteFunder<T = void>(id: number) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder + `/${id}`,
        method: 'delete',
    })
}

export async function apiGetFundersByCategory<
    T = GetFundersListResponse,
    U extends Record<string, unknown> = { category: string },
>({ category, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder + `/category/${category}`,
        method: 'get',
        params,
    })
}

export async function apiGetFunderLog<T, U extends Record<string, unknown>>({ ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.features.funder + '/log',
        method: 'get',
        params,
    })
}

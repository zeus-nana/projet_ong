// src/configs/routes.config/featuresRoute.ts

import { lazy } from 'react'
import { FEATURES_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const featuresRoute: Routes = [
    {
        key: 'features.funders.funderList',
        path: `${FEATURES_PREFIX_PATH}/funders/funder-list`,
        component: lazy(() => import('@/views/features/funders/FunderList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'features.funders.funderEdit',
        path: `${FEATURES_PREFIX_PATH}/funders/funder-edit/:id`,
        component: lazy(() => import('@/views/features/funders/FunderEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Modifier un bailleur',
                description: 'Gérer les détails du bailleur de fonds, ses coordonnées et sa catégorie.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'features.funders.funderCreate',
        path: `${FEATURES_PREFIX_PATH}/funders/funder-create`,
        component: lazy(() => import('@/views/features/funders/FunderCreate')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Créer un bailleur',
                description: 'Ajouter un nouveau bailleur de fonds avec ses informations et coordonnées.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'features.funders.funderDetails',
        path: `${FEATURES_PREFIX_PATH}/funders/funder-details/:id`,
        component: lazy(() => import('@/views/features/funders/FunderDetails')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default featuresRoute

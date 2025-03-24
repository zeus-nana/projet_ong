// src/configs/navigation.config/features.navigation.config.ts

import { FEATURES_PREFIX_PATH } from '@/constants/route.constant'
import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const featuresNavigationConfig: NavigationTree[] = [
    {
        key: 'features',
        path: '',
        title: 'Features',
        translateKey: 'nav.features',
        icon: 'features',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'features.funders',
                path: '',
                title: 'Bailleurs de fonds',
                translateKey: 'nav.featuresFunders.funders',
                icon: 'funders',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.featuresFunders.fundersDesc',
                        label: 'Gestion des bailleurs de fonds',
                    },
                },
                subMenu: [
                    {
                        key: 'features.funders.funderList',
                        path: `${FEATURES_PREFIX_PATH}/funders/funder-list`,
                        title: 'Liste des bailleurs',
                        translateKey: 'nav.featuresFunders.funderList',
                        icon: 'funderList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.featuresFunders.funderListDesc',
                                label: 'Liste de tous les bailleurs de fonds',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'features.funders.funderEdit',
                        path: `${FEATURES_PREFIX_PATH}/funders/funder-edit/1`,
                        title: 'Modifier un bailleur',
                        translateKey: 'nav.featuresFunders.funderEdit',
                        icon: 'funderEdit',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.featuresFunders.funderEditDesc',
                                label: "Modifier les informations d'un bailleur",
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'features.funders.funderCreate',
                        path: `${FEATURES_PREFIX_PATH}/funders/funder-create`,
                        title: 'Créer un bailleur',
                        translateKey: 'nav.featuresFunders.funderCreate',
                        icon: 'funderCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.featuresFunders.funderCreateDesc',
                                label: 'Ajouter un nouveau bailleur de fonds',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'features.funders.funderDetails',
                        path: `${FEATURES_PREFIX_PATH}/funders/funder-details/1`,
                        title: 'Détails du bailleur',
                        translateKey: 'nav.featuresFunders.funderDetails',
                        icon: 'funderDetails',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.featuresFunders.funderDetailsDesc',
                                label: 'Informations détaillées sur le bailleur',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default featuresNavigationConfig

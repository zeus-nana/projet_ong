import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
    PiToolboxDuotone,
    PiCurrencyCircleDollarDuotone,
    PiListStarDuotone,
    PiPencilSimpleLineDuotone,
    PiPlusSquareDuotone,
    PiFileMagnifyingGlassDuotone,
} from 'react-icons/pi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    features: <PiToolboxDuotone />,
    funders: <PiCurrencyCircleDollarDuotone />,
    funderList: <PiListStarDuotone />,
    funderEdit: <PiPencilSimpleLineDuotone />,
    funderCreate: <PiPlusSquareDuotone />,
    funderDetails: <PiFileMagnifyingGlassDuotone />,
}

export default navigationIcon

const TopBarClassicSvg = ({
    height = 100,
    width = 100,
}: {
    height?: number | string
    width?: number | string
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500" // Adjusted viewBox
            width={width}
            height={height}
            fill="none"
        >
            <rect
                width={500}
                height={500}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
            <path
                className="fill-gray-100 dark:fill-gray-950"
                d="M0 0h500v500H0z"
            />
            <mask id="a" className="fill-white dark:fill-gray-800 ">
                <path d="M0 20C0 8.954 8.954 0 20 0h460c11.046 0 20 8.954 20 20v58H0V20Z" />
            </mask>
            <path
                className="fill-white dark:fill-gray-800 "
                d="M0 20C0 8.954 8.954 0 20 0h460c11.046 0 20 8.954 20 20v58H0V20Z"
            />
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M0 0h500H0Zm500 79H0v-2h500v2ZM0 78V0v78ZM500 0v78V0Z"
                mask="url(#a)"
            />
            <circle
                cx={47}
                cy={39}
                r={17}
                className="fill-gray-200 dark:fill-gray-600"
            />
            <rect
                width={88}
                height={33}
                x={94}
                y={22.5}
                className="fill-primary-subtle"
                rx={6}
            />
            <rect
                width={69}
                height={13}
                x={103.5}
                y={32.5}
                className="fill-primary"
                rx={6}
            />
            <rect
                width={56}
                height={13}
                x={192}
                y={32.5}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={56}
                height={13}
                x={268}
                y={32.5}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={56}
                height={13}
                x={344}
                y={32.5}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={460}
                height={382}
                x={20}
                y={98}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
        </svg>
    )
}

export default TopBarClassicSvg

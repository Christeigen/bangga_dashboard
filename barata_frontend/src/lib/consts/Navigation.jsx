import {
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineDocument,
	HiOutlineCog,
    HiOutlineHome,
	HiOutlineChartSquareBar
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineHome />
	},
	{
		key: 'otherpage',
		label: 'Other Page',
		path: '/otherpage',
		icon: <HiOutlineChartSquareBar />
	},
	{
		key: 'downloadpage',
		label: 'Download Report',
		path: '/downloadreport',
		icon: <HiOutlineDocument />
	},
]

// export const DASHBOARD_SIDEBAR_CHART_LINKS = [
// 	{
// 		key: 'barchart',
// 		label: 'Top Market',
// 		path: '/barchart',
// 		icon: <HiOutlineCog />
// 	},
// 	{
// 		key: 'linechart',
// 		label: 'Revenue History',
// 		path: '/linechart',
// 		icon: <HiOutlineQuestionMarkCircle />
// 	},
// 	{
// 		key: 'piechart',
// 		label: 'Buyer Profile',
// 		path: '/piechart',
// 		icon: <HiOutlineQuestionMarkCircle />
// 	}
// ]
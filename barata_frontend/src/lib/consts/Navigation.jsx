import {
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineDocument,
	HiOutlineCog,
    HiOutlineHome,
	HiOutlineChartSquareBar,
	HiOutlineLightningBolt,
	HiTrendingUp,
	HiShieldCheck
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiTrendingUp />
	},
	{
		key: 'otherpage',
		label: 'Performance',
		path: '/otherpage',
		icon: <HiOutlineChartSquareBar />
	},
	{
		key: 'downloadpage',
		label: 'Download Report',
		path: '/downloadreport',
		icon: <HiOutlineDocument />
	},
	{
		key: 'chargingstation',
		label: 'Charging Station',
		path: '/chargingstation',
		icon: <HiOutlineLightningBolt />
	},
	{
		key: 'adminverification',
		label: 'Admin Verification',
		path: '/adminverification',
		icon: <HiShieldCheck />
	}
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
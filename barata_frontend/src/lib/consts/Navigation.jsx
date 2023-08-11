import {
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
    HiOutlineHome
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
		icon: <HiOutlineCube />
	},
	{
		key: 'downloadpage',
		label: 'Download Report',
		path: '/downloadreport',
		icon: <HiOutlineShoppingCart />
	},
	// {
	// 	key: 'customers',
	// 	label: 'Customers',
	// 	path: '/customers',
	// 	icon: <HiOutlineUsers />
	// },
	// {
	// 	key: 'transactions',
	// 	label: 'Transactions',
	// 	path: '/transactions',
	// 	icon: <HiOutlineDocumentText />
	// },
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_CHART_LINKS = [
	{
		key: 'barchart',
		label: 'Top Market',
		path: '/barchart',
		icon: <HiOutlineCog />
	},
	{
		key: 'linechart',
		label: 'Revenue History',
		path: '/linechart',
		icon: <HiOutlineQuestionMarkCircle />
	},
	{
		key: 'piechart',
		label: 'Buyer Profile',
		path: '/piechart',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
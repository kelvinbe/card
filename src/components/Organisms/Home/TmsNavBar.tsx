import { Box } from '@chakra-ui/react'
import { Link, useLocation } from "react-router-dom";


const TmsNavBar = () => {

    const pages = [
        {
            path: 'dashboard',
            name: 'Dashboard'
        },
        {
            path: 'terminals',
            name: 'Terminals'
        },
        {
            path: 'merchants',
            name: 'Merchants'
        },
        {
            path: 'operators',
            name: 'Operators'
        },
        {
            path: 'admin',
            name: 'Admin Settings'
        },
        {
            path: 'users',
            name: 'User Management'
        },


    ]

    let location = useLocation();

    console.log('location', location.pathname)

  return (
<Box padding={3}>
    <div className="px-4 py-3 ml-16">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            {pages.map((page) => {
                const isActive = location.pathname.includes(page.path)
             return   <li key={page.name}>
                <Link key={page.name} to={page.path} className={`text-gray-900 dark:text-white hover:underline active:${isActive ? 'text-[#0A4DA1]   underline has-[:focus]' : ''} focus:text-[#0A4DA1] focus:underline text-[#5D5C5C]  active:underline`} aria-current={isActive ? "page" : undefined}>{page.name}</Link>
            </li>
            })}
            </ul>
        </div>
    </div>
</Box>
  )
}

export default TmsNavBar 
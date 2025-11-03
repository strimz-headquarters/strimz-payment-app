import { SideBarLinksTypes } from "@/types/dashboard";
import { AiOutlineDollar } from "react-icons/ai";
import { GoHome, GoHistory } from "react-icons/go";
import { LuUsers } from "react-icons/lu";

export const UserSideBarLinks: SideBarLinksTypes[] = [
    {
        href: "/user",
        title: "Home",
        icon: <GoHome className="w-[20px] h-[20px]" />
    },
    {
        href: "/user/payroll",
        title: "Payroll",
        icon: <AiOutlineDollar className="w-[20px] h-[20px]" />
    },
    {
        href: "/user/transaction-history",
        title: "Tx History",
        icon: <GoHistory className="w-[20px] h-[20px]" />
    },
]

export const BusinessSideBarLinks: SideBarLinksTypes[] = [
    {
        href: "/business",
        title: "Home",
        icon: <GoHome className="w-[21px] h-[21px]" />
    },
    {
        href: "/business/transactions",
        title: "Transactions",
        icon: <AiOutlineDollar className="w-[21px] h-[21px]" />
    },
    {
        href: "/business/customers",
        title: "Customers",
        icon: <LuUsers className="w-[21px] h-[21px]" />
    },
];
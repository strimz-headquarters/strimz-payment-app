'use client'

import Footer from "@/components/dashboard/business/Footer";
import Header from "@/components/dashboard/business/Header";
import SideBar from "@/components/dashboard/business/SideBar";
import { useState } from "react";

/**
 * The BusinessLayout component renders the layout for the business dashboard.
 * It includes a sidebar, a header, and a main content area.
 * The sidebar is collapsible and can be toggled by clicking on the hamburger
 * button in the header.
 * The main content area is a scrollable container that contains the
 * content of the currently active page.
 * The Footer component is rendered at the bottom of the page.
 * @param {React.ReactNode} children - The content to be rendered within the main section.
 * @returns {JSX.Element} The business layout component.
 */
export default function BusinessLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div className=" bg-[#F9FAFB] lg:p-1.5">
            {/* Page Wrapper Start  */}
            <div className="flex h-screen gap-1 overflow-hidden">
                {/* Sidebar Start */}
                <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Sidebar End  */}

                {/* Content Area Start  */}
                <div className="relative flex min-h-[100svh] rounded-t-[8px] bg-white flex-1 border border-[#E5E7EB] flex-col justify-between overflow-y-auto overflow-x-hidden no-scrollbar">
                    <section>
                        {/*  Header Start */}
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        {/*  Header End */}

                        {/*  Main Content Start */}
                        <main>
                            <div className="mx-auto 2xl:max-w-screen-2xl max-w-[800px] mt-4 pb-6 md:pt-4 md:pb-10 2xl:p-10">
                                <section className="w-full lg:px-1.5 px-3">{children}</section>
                            </div>
                        </main>
                    </section>
                    {/*  Main Content End  */}
                    <Footer />
                </div>
                {/*  Content Area End  */}
            </div>
            {/*  Page Wrapper End  */}
        </div>
    );
}
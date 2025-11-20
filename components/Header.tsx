import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";

import UserDropdown from "@/components/UserDropdown";
const Header = async ({ user }: { user: User }) => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                <Image src="/assets/images/stockll.png" alt="StockList Logo" width={150} height={40} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems/>

                </nav>
                <UserDropdown user={user} />
            </div>
        </header>
    )
}
export default Header;
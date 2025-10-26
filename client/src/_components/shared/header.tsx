import MenuComponent from '@/_components/common/menu';
import { Link } from "react-router";
import { Menu, X } from 'lucide-react';
import { useHeader } from '@/_hooks/useHeader';
import { useAuthContext } from '@/_hooks/auth/useAuthContext';
import { Avatar, AvatarImage } from '@/_components/ui/avatar';
import { ProfileData } from "@/_data/profile";

export default function Header() {
    const {
        isMenuVisible,
        toggleHeader,
        menuRef
    } = useHeader();
    const {
        isAuthenticated,
        isVerified,
        profileRef,
        avatarImg,
        handleProfile,
        handleLogout,
        avatar
    } = useAuthContext();

    // console.log("Header - isAuthenticated:", isAuthenticated, "isVerified:", isVerified, "avatarImg:", avatarImg);

    return (
        <header className="border-b-2 libertinus-sans-bold antialiased sticky top-0 z-50">
            <nav className="flex justify-between items-center p-6 bg-background">
                {/* Logo */}
                <Link
                    to="/"
                    className='font-extrabold text-4xl -tracking-wider'
                >
                    TheInsight
                </Link>

                {
                    !isVerified && isAuthenticated ? null : !isAuthenticated ? (
                        <>
                            <ul className='hidden sm:flex gap-6 items-center font-sans' ref={menuRef}>
                                <MenuComponent />
                            </ul>

                            <div
                                className='sm:hidden cursor-pointer'
                                onClick={toggleHeader}
                            >
                                {isMenuVisible ? (
                                    <X className='size-8' />
                                ) : (
                                    <Menu className='size-8' />
                                )}
                            </div>
                        </>
                    ) : (
                        <div className='flex gap-6 items-center'>
                            {/* Menu */}
                            <ul className='hidden sm:flex gap-6 items-center font-sans' ref={menuRef}>
                                <MenuComponent />
                            </ul>

                            {/* Profile */}
                            {isAuthenticated && (
                                <div className="relative" ref={profileRef}>
                                    <span className="relative w-fit h-fit cursor-pointer" onClick={handleProfile}>
                                        <Avatar>
                                            <AvatarImage src={
                                                avatarImg
                                            } />
                                        </Avatar>
                                    </span>
                                    {avatar && (
                                        <div className="absolute top-12 right-0 shadow-md bg-background p-4 rounded-md font-sans z-50">
                                            <ul className="relative flex flex-col gap-2 w-[150px] sm:w-[200px] h-fit text-sm">
                                                {ProfileData.map((item, index) => {
                                                    const Icon = item.icon;

                                                    return (
                                                        <li className="flex items-center gap-2 w-full font-semibold hover:text-muted-foreground 
                                hover:bg-muted rounded-sm cursor-pointer p-1" key={index}>
                                                            {Icon && <Icon className="w-4 h-4" strokeWidth={2.5} />}
                                                            {item.name === "Logout" ? (
                                                                <span
                                                                    className="w-full"
                                                                    onClick={() => handleLogout({ to: item.href })}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                            ) : (
                                                                <Link to={item.href} className="w-full">
                                                                    {item.name}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div
                                className='sm:hidden cursor-pointer'
                                onClick={toggleHeader}
                            >
                                {isMenuVisible ? (
                                    <X className='size-8' />
                                ) : (
                                    <Menu className='size-8' />
                                )}
                            </div>
                        </div>
                    )
                }
                {/* Mobile Menu */}
                {isMenuVisible && (
                    <ul className='absolute sm:hidden w-full h-fit bg-white left-0 top-22 p-4 flex flex-col gap-6 items-center font-sans border-b' ref={menuRef}>
                        <MenuComponent />

                    </ul>
                )}
            </nav>
        </header>
    );
}
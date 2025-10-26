import Footer from '@/_components/shared/footer';
import Header from '@/_components/shared/header';
import HomeProvider from '@/_components/common/providers/homeProvider'
import AuthProvider from '@/_components/common/providers/authProvider'
import QueryProvider from '@/_components/common/providers/queryProvider'
import ProtectedProvider from '@/_components/common/providers/protectedProvider'
import { Toaster } from "@/_components/ui/sonner"
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { csrfFetch } from "@/_lib/axios/csrfFetch";

export default function Router() {
    const fetched = useRef(false);

    useEffect(() => {
        if (!fetched.current) {
            csrfFetch();
            fetched.current = true;
        }
    }, []);

    return (
        <QueryProvider>
            <HomeProvider>
                <AuthProvider>
                    <ProtectedProvider>
                        <Header />
                        <main className='min-h-screen libertinus-sans-regular antialiased'>
                            <Outlet />
                        </main>
                        <Toaster
                            key='toaster'
                            position="top-right"
                            containerAriaLabel='toaster'
                            duration={1500}
                            richColors
                        />
                        <Footer />
                    </ProtectedProvider>
                </AuthProvider>
            </HomeProvider>
        </QueryProvider>
    );
}
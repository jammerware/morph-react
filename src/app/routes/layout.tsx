import { Outlet } from "react-router"

export default function Layout() {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-8">
            <Outlet />
        </main>
    )
}

import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <Link to="/">
          <h1 className="text-5xl lowercase font-brand">Morph</h1>
        </Link>

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

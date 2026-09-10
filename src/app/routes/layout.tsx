import { Link, Outlet } from "react-router";

export default function Layout() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <Link to="/">
          <h1 className="text-5xl lowercase font-brand text-primary">Morph</h1>
        </Link>

        <main>
          <Outlet />
        </main>

        <footer className="mt-4">
          <hr className="border-t border-neutral-content p-2"></hr>

          <div>
            <span>&copy; </span>
            <a href="https://github.com/jammerware" target="_blank">
              Ben Stein
            </a>
            <span> {year}.</span>
          </div>
        </footer>
      </div>
    </>
  );
}

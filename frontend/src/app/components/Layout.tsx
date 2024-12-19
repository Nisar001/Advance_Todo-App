import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Todo App</h1>
          <div>
            <Link href="/todos">
              <a className="mr-4 text-white">Todos</a>
            </Link>
            <Link href="/">
              <a className="text-white">Logout</a>
            </Link>
          </div>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;

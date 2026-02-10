export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-2 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700">ezpz space</p>
        <p>admin@ezpzspace.com</p>
        <p>&copy; {new Date().getFullYear()} ezpz space. All rights reserved.</p>
      </div>
    </footer>
  );
}

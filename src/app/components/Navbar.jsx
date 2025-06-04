export default function Navbar() {
  return (
    <div>
      <nav>
        <ul className="flex items-center p-4 mr-4 ml-4">
          <li>
            <a href="/" className="font-bold">
              SKINSTRIC
            </a>
          </li>
          <li className="ml-4">[ INTRO ]</li>
          <li className="ml-auto bg-black text-white p-2">Enter Code</li>
        </ul>
      </nav>
    </div>
  );
}


import Link from "next/link";

const Footer = () => {
    return (
      <footer className="footer flex justify-center items-center p-10 bg-[#141C2A] gap-2 text-white flex-wrap border-t-2 border-white">
          <Link href="/" className="hover:text-green-500"> All rights reserved </Link>
      </footer>
    );
}

export default Footer
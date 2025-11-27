import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import logo from "@/app/public/img/header/logo.png";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link className={css.linkLogo} href="/">
          <Image src={logo} className={css.logo} alt="Logo" />
        </Link>
        <nav className={css.nav}>
          <Link href="/" className={css.navElem}>
            Home
          </Link>
          <Link href="/catalog" className={css.navElem}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

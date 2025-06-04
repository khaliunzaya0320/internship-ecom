import Link from "next/link";

const Menu = () => {
  return(
    <nav className="flex gap-6 text-sm font-medium">
      {/* <Link href="/">Нүүр</Link> */}
      <Link href="/notification" >Мэдэгдэл</Link>
      <Link href="/wishlist" >Хадгалсан</Link>
      <Link href="/cartitem" >Сагс</Link>
      <Link href="/account" >Account</Link>
    </nav>
  )
}

export default Menu;
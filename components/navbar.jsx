import Link from "next/link";

export default async function Navbar() {

    return(
        <div className="flex items-center gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/account"}>Account</Link>
    </div>
    )
  }
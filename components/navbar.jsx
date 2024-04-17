import Link from "next/link";
import { createClient } from '@/util/supabase/server'

export default async function Navbar() {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    return(
        <div className="flex items-center gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/account"}>Account</Link>
        <div>
           { user ?  
         (  <form action="/auth/signout" method="post">
                <button className="button block" type="submit">
                    Sign out
                </button>
            </form>) : ( <Link href={"/login"}>Login</Link>)}
        </div>
        </div>
    )
  }
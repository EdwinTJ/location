import Link from "next/link";
import { createClient } from '@/util/supabase/server'

export default async function Navbar() {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    return(
        <div className="w-full">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <Link href={"/"}>Home</Link>
              <div>
                { user ?  
                ( 
                  <>
                  <Link href={"/account"}>Account</Link>
                <form action="/auth/signout" method="post">
                  <button className="button block" type="submit">
                    Sign out
                  </button>
                </form></>) : 
                ( <Link href={"/login"}>Login</Link>)}
              </div>
            </div>
          </nav>
        </div>
    )
  }
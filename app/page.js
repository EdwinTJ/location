import { createClient } from '@/util/supabase/server'
import Location from "@/app/Location/page" 
import Link from 'next/link'
import CardComponent from '@/components/Card'
export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (

        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div >
        <Location user={user}/>
          {user ? <CardComponent/>:<><Link href={"/login"}>Login</Link></>}  
            </div>
      </main>
  )
}
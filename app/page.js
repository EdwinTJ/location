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
    <div className="flex-1 w-full flex flex-col items-center p-6 space-y-6">
        <div className="flex flex-col items-center">
    <Location user={user}/>
    {user ? 
      <CardComponent/> :
      <div className="flex flex-col items-center mt-8">
        <p className="text-center mb-4">You need to be logged in to save your places</p>
        <Link
          href={"/login"}
          className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          Login
        </Link>
      </div>
    }
  </div>
    </div>

  )
}

import { createClient } from '@/util/supabase/server'
import { toast } from 'sonner'
export default async function Card(){
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser()

    const { data : placesvisited,error} = await supabase
    .from("placesvisited")
    .select("*")
    .eq("user_id", user.id)
    
    if(error){
        toast.error("Something went wrong... Try again")
    }

    return(
        <div>
        {placesvisited.map((place) => {
            return (
                <div key={place.id}>
                    <h4>{place.country}</h4>
                    <p>{place.state}</p>
                    <p>{place.city}</p>
                </div>
            );
        })}
    </div>
    );
};
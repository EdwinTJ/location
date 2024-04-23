
import { createClient } from '@/util/supabase/server'
import { toast } from 'sonner'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default async function CardComponent(){
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
        <div className='mt-6'>
        {placesvisited.map((place)=>{
            return(
            <Card className="w-[350px]" key={place.id}> 
                <CardHeader>
                   <CardTitle>{place.country}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {place.state}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {place.city}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            );
        })}
    </div>
    );
};
'use client'
import { BotIcon, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useTokenStore, useUserStore } from '@/lib/globalStore';
import { URL_BASE } from "@/lib/endpoint"
import { Toaster, toast } from 'sonner'
// import { addProductFavorite, removeProductFavorite, getProductFavorite } from "@/lib/favorite";

const Favorite = ({ product }: any) => {
    // const [products, setFavoritos] = useState([]);
    const [isfavorite, setFavorite] = useState(false)
    const iduser= useUserStore((state:any) => state.profile)
    const token = useTokenStore((state: any) => state.token)
    const [datafavorite, setDataFavorites] = useState<any>({})

    const heart  = <Heart />
    const markheat = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="#B51517" /></svg>
    const text = isfavorite ? markheat : heart;
    let thisfavorite: any =false


      


    useEffect(() => {
        if (typeof window !== "undefined") {
            if(token!==null){
                const fetchFavorites = async () => {
                try {
                const data = await fetch(`${URL_BASE}/api/users/${iduser}?populate[favoritos][filters][id][$eq]=${product.id}`, {
                    headers: {"Content-Type": "application/json",},
                    });
                    const jsonfavorites= await data.json()
                    setDataFavorites(jsonfavorites.favoritos)
                    console.log(jsonfavorites.favoritos[0].id )
                    jsonfavorites.favoritos[0].id === product.id ? setFavorite(true) : setFavorite(false)
                } catch (error) {
                    console.log('No encontramos resgitro de pedido o ocurrio un error')
            }
            };
            fetchFavorites()
            }
	   
        }
       
    }, []);
    

    const handleClick = async () => {
        
       
            if(isfavorite ){
                const sendData = await fetch(`${URL_BASE}/api/users/${iduser}`, {
                    method: "PUT",
                    body: JSON.stringify({ favoritos:{disconnect: [product.id]} }),
                    headers: {
                        Authorization: `Bearer ${token}`, //${token}
                        "Content-Type": "application/json",
                    },
                })
                .then(response => response.json())
                .catch((error) => console.error("Error:", error))
                toast.error('Eliminado de favoritos')
                // removeProductFavorite(product.id)
                setFavorite(false)
            }else{
                if (typeof window !== 'undefined') {
                    if (sessionStorage.getItem("token")) {
                        const sendData = await fetch(`${URL_BASE}/api/users/${iduser}`, {
                            method: "PUT",
                            body: JSON.stringify({favoritos: {connect: [product.id]} }),
                            headers: {
                                Authorization: `Bearer ${token}`, //${token}
                                "Content-Type": "application/json",
                            },
                        })
                        .then(response => response.json())
                        .catch((error) => console.error("Error:", error))
                      
                        setFavorite(true)
                        // addProductFavorite(product)
                        toast.success('Añadido a favorito')
                         setFavorite(true)
                    }else{
                        toast.error('Necesita iniciar session para añadir a favorito')
                    }
               }
            }
           
    }

    return (
        <>
        <button onClick={handleClick} className="flex justify-center space-x-1 font-bold uppercase text-primary">
            {thisfavorite === true ? markheat: text }<span className="text-xs text-primary pt-1">Favoritos</span></button>
        </>
    )
}

export default Favorite;
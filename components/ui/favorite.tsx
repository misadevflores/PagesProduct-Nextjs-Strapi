'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import Link from 'next/link';
import { useTokenStore } from '@/lib/globalStore';
import Img from './img';
import { Separator } from './separator';


const FavoriteNavbar = () => {
    const token = useTokenStore((state:any) => state.token)
    return (    
        <>
        {
                token ? <><Link href={'/favoritos'}><Img baseUrl={false} url={'/me-gusta.png'} width={'20px'} height={'20px'} objectFit={'cover'} /></Link><Separator orientation="vertical" className='h-1/2' /></> : <>
                </>
               
             }
        </>
    )
}

export default FavoriteNavbar;
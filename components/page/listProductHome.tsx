'use client'
import dynamic from 'next/dynamic';
import CardSkeleton from "@/components/ui/cardSkeleton";
import { URL_BASE } from "@/lib/endpoint"
import React, { useEffect, useState } from 'react';
import TitleBorder from "../ui/titleBorder";
import { ChevronLeftSquare ,ChevronRightSquare } from "lucide-react";
const CardProduct = dynamic(() => import('../ui/cardProduct'),{ ssr: false });
import 'flowbite';
import Link from "next/link";
import { lenghtText } from "@/lib/string";
import { validateOffer } from "@/lib/helpers";
import Img from "../ui/img";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const dividirArrayEnGrupos = (array: [], tamanoGrupo = 4 ) => {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamanoGrupo) {
        grupos.push(array.slice(i, i + tamanoGrupo));
    }
    return grupos;
}


const ListProductsHome = () => {
    const [products, setProducts] = useState<any>([])
    const [elementActive, setElementActive] = useState(0);
    const [isLoadding, setLoadding]=useState(false);
    const elementQ = products?.length;

   

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(`${URL_BASE}/api/productos?populate[imagen][fields][0]=url&populate[tag_producto][fields][1]=nombre&pagination[limit]=12&sort[0]=createdAt:desc`, {
                cache: 'no-store'
            })

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const response = await res.json()
            const _products = dividirArrayEnGrupos(response.data)
            setProducts(_products)
            setLoadding(true)
        }
        fetchProducts()
    }, [])

        const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 2500 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 2500, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
        }

    return (
        <>
        <div className='w-full'>
        <TitleBorder title="Productos recien agregados" />
         {!isLoadding? <CardSkeleton /> :
            <Carousel responsive={responsive}>
                {
                products.map((_products: any, index: any) => (
                     _products.map((product: any, key:any) => <CardProduct key={key} product={product} />)
                ))
                }
            </Carousel>
            }
        </div>
        
           
        </>
    )
}

export default ListProductsHome
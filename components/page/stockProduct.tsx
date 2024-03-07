'use client'
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast";
import { addProductStore } from "@/lib/store";
import { Plus, Minus } from 'lucide-react';
import 'flowbite';
import 'flowbite-react';

import { promiseHooks } from "v8";




const StockProduct = ({ product }: any) => {
 
    const { toast } = useToast()
    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [q, setQ] = useState(1);
    const [stock, setStock] = useState(0);


    function handleClickPlus() {
        if (stock !== 0) {
            if (q <= 4) {
                if (q >= stock) {
                    toast({title: 'Solo hay ' + stock + " Disponible en este momento",})
                    // alert('Solo hay ' + stock + " Disponible en este momento")
                } else {
                    setQ(q + 1);
                }
            } else {
                setQ(q);
            }
        } else {
            if (q <= 4) {
                setQ(q + 1);
            } else {
                setQ(q);
                toast({title: "Solo puede comprar 5 articulos",})
            }
        }

    }
    function handleClickMinus() {
        if (q > 0) {
            setQ(q - 1);
            if (q === 1) {
                setQ(0 + 1);
            }
        }

    }
    useEffect(() => {
        const fetchStock = async (sku: any) => {
            try {
                const responseStock = await fetch(`http://190.186.38.20:8084/REST/STOCK/ECOMMERCE/STOCK?productCode=${sku}`, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Content-Security-Policy": "upgrade-insecure-requests",
                        "Cache-Control" : "no-cache",
                        "Authorization": 'Basic ZWNvbW1lcmNlYXBpOjFlY29tbWVyY2VhcGkx' ,
                        "X-Content-Type-Options" : "nosniff"  
                    }

                })
                const jsonStock = await responseStock.json();
                
              
                setStock(jsonStock.globalQuantity)
                
                if (jsonStock.globalQuantity != 0) {
                    setLoading(false)
                    setAvailable(false)
                } else {
                    setLoading(false)
                    setAvailable(true)
                }
            } catch (error) {
                setLoading(false)
                setAvailable(false)
            }
        }
        fetchStock(product.sku);

    }, [])

        
  
    return (
       <>
    {loading ? (
        <div className="dots"></div>
    ) : available ? (
        <p>Producto no disponible por el momento</p>
    ) : (
        <>
      <br />
      <div className="relative flex items-center max-w-[8rem]">

         {/* ... Contenido del botón de resta */}
        <button
          type="button"
          onClick={handleClickMinus}
          className="bg-[#0f2557] border-2  border-[#0f2557] dark:bg-gray-700 dark:hover:bg-[#FFC436]  dark:border-gray-600 rounded-s-lg p-3 h-11  focus:outline-none">
        <Minus size={18} strokeWidth={2} className=" text-[#f7dd4d] dark:text-white  hover:text-[#fff] dark:hover:text-slate-900" />
        </button>

        <input value={q === 0 ? 1 : q} type="text" readOnly={true} className="bg-gray-50 border-x-0 border-[#0f2557] h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

         {/* ... Contenido del botón de suma */}
        <button
          type="button"
          onClick={handleClickPlus} id="increment-button" data-input-counter-increment="quantity-input"
          className="bg-[#0f2557] border-2  border-[#0f2557] dark:bg-gray-700 dark:hover:bg-[#FFC436] dark:border-gray-600 rounded-e-lg p-3 h-11   focus:outline-none" >
         <Plus size={18} strokeWidth={2} className=" text-[#f7dd4d] dark:text-white  hover:text-[#fff] dark:hover:text-slate-900" />
        </button>
      </div>

      <button
        onClick={() => {
            toast({
                            title: "Producto añadido al carrito",
                        })
                        addProductStore(product, q)
        }}
        className="rounded-full border-2 border-solid border-primary text-xl text-center dark:bg-sky-900 text-white font-bold bg-primary px-5"
      >
        Comprar
      </button>

      
    </>
  )}
</>
    )
}

export default StockProduct;

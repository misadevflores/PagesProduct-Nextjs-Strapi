
'use client'
import React, { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast";
import { addProductStore } from "@/lib/store";
import { Plus, Minus } from 'lucide-react';
import 'flowbite';
import 'flowbite-react';
import ConfetiComponent from '../ui/ConfertiAnimation';

const StockProduct = ({ product }: any) => {
    const [productoAñadido, setProductoAñadido] = useState(false);
    const { toast } = useToast()
    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [q, setQ] = useState(1);
    const [stock, setStock] = useState(0);

    const handleClickPlus = () => {
        setQ(q + 1);
    };

    const handleClickMinus = () => {
        if (q > 1) {
            setQ(q - 1);
        }
    };

    const añadirAlCarrito = () => {
        setProductoAñadido(true);
        setTimeout(() => {
            setProductoAñadido(false);
        }, 2000);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <button type="button" onClick={handleClickMinus} className="bg-[#0f2557] border-2  border-[#0f2557] dark:bg-gray-700   dark:hover:bg-[#FFC436]  dark:border-gray-600 rounded-s-lg p-3 h-11  focus:outline-none ">
                    <Minus size={18} strokeWidth={2} className=" text-[#f7dd4d] dark:text-white  hover:text-[#fff] dark:hover:text-slate-900" />
                </button>
                <input value={q} type="text" readOnly={true} className="bg-gray-50 border-x-0 border-[#0f2557] h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button type="button" onClick={handleClickPlus} id="increment-button" data-input-counter-increment="quantity-input" className=" bg-[#0f2557] border-2  border-[#0f2557] dark:bg-gray-700 dark:hover:bg-[#FFC436] dark:border-gray-600 rounded-e-lg p-3 h-11   focus:outline-none">
                    <Plus size={18} strokeWidth={2} className=" text-[#f7dd4d] dark:text-white  hover:text-[#fff] dark:hover:text-slate-900" />
                </button>
            </div>

            <button onClick={() => {
                toast({
                    title: "Producto añadido al carrito",
                })
                addProductStore(product, q);
                añadirAlCarrito();
            }} className="rounded-full border-2 border-solid border-primary text-xl text-center dark:bg-sky-900 text-white font-bold bg-primary px-5">Comprar</button>
            <ConfetiComponent active={productoAñadido} />
        </>
    )
}

export default StockProduct;

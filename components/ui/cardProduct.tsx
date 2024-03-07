'use client'
import Link from "next/link";
import Img from "./img";
import { lenghtText } from "@/lib/string";
import { validateOffer } from "@/lib/helpers";
import 'flowbite';

const CardProduct = ({ product }: any) => {
   const bg = (product?.attributes?.color_etiqueta) || '#0C356A';

   return ( 
      <div>
         <Link href={`/producto/${product?.attributes?.slug}`} className="content-between mr-1 bg-white border-2 border-red-500" data-tooltip-target="tooltip-nameproduct">
            <div className="grid gap-2 relative  w-11/12 m-8 h-[390px] max-w-xs overflow-hidden  max-h-96 rounded-xl bg-white shadow-xl border   hover:shadow-yellow-800/80 dark:bg-gray-900 dark:hover:shadow-none">
               <a href={`/producto/${product?.attributes?.slug}`} className="w-full overflow-hidden">
                  {/* Aquí tu componente Img */}
               </a>
               {validateOffer(product?.attributes?.precio, product?.attributes?.precio_oferta, product?.attributes?.inicio_oferta, product?.attributes?.limite_oferta) ? 
                  <span  style={{background:bg }} className="oferta absolute  w-38 translate-y-4 -translate-x-5 -rotate-45  text-center text-sm text-white animate-pulse border-2 border-blue-950">
                     <span className="text-xl text-oferta  text-white animate-out " >{product?.attributes?.tag_producto?.data !== null ? product.attributes.tag_producto.data.attributes.nombre :<></>}</span>
                  </span> : <></>
               }
               <div className="mt-4 px-5 pb-5">
                  <a href="#">
                     <h3 className="text-[14px] dark:text-white font-semibold tracking-tight text-slate-900 ">{lenghtText(product?.attributes?.nombre,25)}</h3>
                  </a>
                  <div className="flex items-center justify-between">
                     {validateOffer(product?.attributes?.precio, product?.attributes?.precio_oferta, product?.attributes?.inicio_oferta, product?.attributes?.limite_oferta)
                        ?
                        <>
                           <p className="text-sm font-extrabold text-slate-900 dark:text-white animated-pulse">Bs {product?.attributes?.precio_oferta}</p><br></br>
                           <p className="text-xs text-red-900 line-through font-bold  dark:text-white ">  Bs. {product?.attributes?.precio}</p>
                        </>
                        :
                        <span className="text-md font-bold text-slate-900 dark:text-white ">Bs {product?.attributes?.precio}</span>
                     }
                     <a  data-tooltip-target="tooltip-infoproduct"  href={`/producto/${product?.attributes?.slug}`} className="bg-[#e8d464] text-blue-800 ms-3 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                        +  Detalle
                        <div id="tooltip-infoproduct" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                           Ver mas informacion del producto
                           <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                     </a> 
                  </div>
               </div>
            </div>
            <div id="tooltip-nameproduct" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
               {lenghtText(product?.attributes?.nombre,26)}
               <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
         </Link>
      </div>
   );
}

export default CardProduct;

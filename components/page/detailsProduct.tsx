// Importa la función 'dynamic' de 'next/dynamic' para cargar componentes dinámicamente en el lado del cliente.
import dynamic from 'next/dynamic';
import { URL_BASE } from "@/lib/endpoint";
import { parse } from "@/lib/snarkdown";
// Carga el componente 'MiComponenteDificil' de manera dinámica, sin soporte para el pre-renderizado en el lado del servidor (SSR).
const StockProduct = dynamic(() => import('./stockProduct'),{ ssr: false });
// const { StockProduct } = await import('./stockProduct');
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ImageZoom from "./imgHoverProduct";
import Markdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { Separator } from "../ui/separator";
import { validateOffer } from "@/lib/helpers";
const CardProduct = dynamic(() => import('../ui/cardProduct'),{ ssr: false });
const Favorite = dynamic(() => import('@/app/producto/[slug]/favorite'),{ ssr: false });
// const CardsProductsComponent = (await import("../ui/cardProduct")).CardsProducts;
// import Favorite from "@/app/producto/[slug]/favorite";
import TitleBorder from "../ui/titleBorder";
// import CardProduct from "../ui/cardProduct";
import Link from "next/link";
import { Share2, GitCompare,Facebook,Instagram,Copy,Linkedin,Twitter,Frown } from 'lucide-react';

const fetchProduct = async (slug: any) => {
  try {
    const response: Response = await fetch(`${URL_BASE}/api/productos?filters[slug][$eq]=${slug}&populate=*`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error de red Código: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error durante la solicitud fetch:", error.message);
    throw error;
  }
};

const DetailsProduct = async ({ slug }: any) => {
  const _product = await fetchProduct(slug);
  let url = "";
  let coutaOferta;

  if (_product && _product.data && _product.data.length > 0) {
    if (_product?.data?.[0]?.attributes) {
      url = `${process.env.HOT_DOMIN}producto/${_product.data[0].attributes.slug}`;
    } else {
      console.error("La estructura de datos no es la esperada");
    }

    if (_product?.data?.[0]?.attributes?.cuota_oferta > 0) {
      coutaOferta = _product.data[0].attributes.cuota_oferta;
    } else {
      coutaOferta = _product.data[0].attributes.precio_cuota;
    }
  }



  return (
    <>
      {_product && _product.data && _product.data.length > 0 ? (
        <div id="detailsProduct" className="grid lg:grid-cols-3 xl:grid-cols-6 grid-cols-1 md:grid-col-3 gap-4 w-full p-4 ">
          <div className="lg:col-span-2 xl:col-span-4 md:col-span-6 col-span-1">
            <Card className="text-primary dark:bg-slate-800 border-2 border-cyan-800">
              <CardHeader>
                <CardTitle>{_product.data[0].attributes.nombre}</CardTitle>
                <CardDescription>
                  {_product.data[0].attributes.modelo.data !== null
                    ? _product.data[0].attributes.modelo.data.attributes.nombre
                    : "SIN MODELO"}
                </CardDescription>
              </CardHeader>
              <CardContent className="m-0">
                <ImageZoom
                  arrayImg={_product.data[0].attributes.imagen.data}
                  imagePrimary={_product.data[0].attributes.imagen.data[0].attributes.url}
                  className="border-2 border-red-800"
                />
              </CardContent>
            </Card>
          </div>
          <div className="xl:col-span-2 lg:col-span-2 md:col-span-1 col-span-1">
            <Card className="text-primary border-[2px] border-blue-900/80 rounded-[20px] shadow-lg dark:bg-slate-800">
              <CardContent className="p-8">
                {validateOffer(
                  _product.data[0].attributes.precio,
                  _product.data[0].attributes.precio_oferta,
                  _product.data[0].attributes.inicio_oferta,
                  _product.data[0].attributes.limite_oferta
                ) ? (
                  <>
                    <p className="text-[28px] h-[34px] font-extrabold">
                      Precio al Contado
                    </p>
                    <p className="text-[46px] font-extrabold">
                      <span className="text-[25px]">BS.</span>
                      {_product.data[0].attributes.precio_oferta}
                    </p>
                    <p className="text-[26px] h-[30px] font-extrabold text-primary/50">
                      Precio Antes
                    </p>
                    <p className="text-xl font-extrabold text-primary/50 line-through decoration-red-600 ">
                      <span className="text-xl">BS.</span>
                      {_product.data[0].attributes.precio}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[28px] h-[34px] font-extrabold">
                      Precio al Contado
                    </p>
                    <p className="text-[46px] font-extrabold">
                      <span className="text-[25px]"></span>
                      {_product.data[0].attributes.precio} BOB
                    </p>
                  </>
                )}
                {_product.data[0].attributes.precio_cuota > 0 ? (
                  <div className="flex flex-col w-3/4 border-[2px] border-sky-800 rounded-[10px] p-4 hover:border-x-indigo-900 ">
                    <p className="text-[26px] h-[24px] font-extrabold">
                      <span>11 Cuotas</span>
                    </p>
                    <p className="text-[36px] h-[34px] font-extrabold">
                      <span className="text-[15px]">BS.</span>
                      {_product.data[0].attributes.precio_oferta > 0
                        ? coutaOferta
                        : _product.data[0].attributes.precio_cuota}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <p className="my-2 tracking-[2px] text-center text-sm">
                    <span className="text-primary font-bold">
                      ENVIÓS A DOMICILIO
                    </span>{" "}
                    <span className="text-primary font-extrabold">
                      DISPONIBLE.
                    </span>
                  </p>
                  <p className="border-solid border-[1px] border-blue-900/80"></p>
                </div>

                <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                  <span className="font-medium">
                    Toma en cuenta los siguiente!
                  </span>Todo los producto esta sujeto a verificación y coordinación de stock
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <StockProduct
                     product={{
                      id: _product.data[0].id,
                      nombre: _product.data[0].attributes.nombre,
                      imagen: _product.data[0].attributes.imagen.data[0].attributes.url,
                      modelo:
                        _product.data[0].attributes.modelo.data !== null
                          ? _product.data[0].attributes.modelo.data.attributes.nombre
                          : "SIN MODELO",
                      precio: _product.data[0].attributes.precio,
                      precio_oferta: _product.data[0].attributes.precio_oferta,
                      cantidad: "1",

                      sku: _product.data[0].attributes.sku,
                      }}
                    />
                  </div>
                </CardContent>

                <CardFooter className="px-8 flex">
                  <div className="flex-1 ">
                     <Favorite product={{ id: _product.data[0].id }} />
                  </div>

                  <div className="flex-1 ml-2 block">
                    <span className="text-xs text-primary pt-1 font-bold">
                      COMPARTIR
                    </span>
                    <div className="inline-block">
                      <Link
                        className="inline-block ml-2"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <Facebook />
                      </Link>
                      <Link
                        className="inline-block ml-2"
                        href={`https://www.instagram.com/?url=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram />
                      </Link>
                      <Link
                        className="inline-block ml-2"
                        href={`https://twitter.com/share?url=${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter />
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="lg:col-span-3 sm:col-span-6 md:col-span-6 text-primary my-6 py-4 sm:my-2 smd:py-2">
              <span className=" text-4xl font-extrabold py-2">CARACTERÍSTICAS</span>
              <Separator className="bg-primary" />
              <div className="my-4">
                <Markdown
                  className="dark:text-blue-950 dark:bg-primary"
                  remarkPlugins={[remarkGfm]}
                >
                  {_product.data[0].attributes.caracteristica}
                </Markdown>
              </div>
            </div>
            <div className="lg:col-span-3 sm:col-span-6 md:col-span-6 text-primary my-6 py-4 sm:my-2 smd:py-2">
              <span className=" text-4xl font-extrabold py-2">
                INFORMACIÓN ADICIONAL
              </span>
              <Separator className="bg-primary" />
              <div className="my-4" dangerouslySetInnerHTML={{ __html: parse(_product.data[0].attributes.especificacion) }}></div>
            </div>

            <div className="lg:col-span-6 sm:col-span-1 md:col-span-2 ">
              <TitleBorder title="PRODUCTOS RELACIONADOS" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 ">
               <CardProduct subcategory={_product.data[0].attributes.subcategoria.data.id} idProduct={_product.data[0].id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="rounded-lg bg-slate-300 dark:bg-slate-900 px-16 py-14">
              <div className="flex justify-center">
                <div className="rounded-full bg-blend-hard-light p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 p-4">
                    <Frown size={84} />
                  </div>
                </div>
              </div>
              <h3 className="my-4 text-center text-3xl font-semibold text-gray-700 dark:text-white">
                Opss!!!
              </h3>
              <p className="w-[230px] text-center font-normal text-gray-600 dark:text-white">
                El producto ya no se encuentra disponible
              </p>
              {/* <button className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300">
                Track Order
              </button> */}
            </div>
          </div>
        )}
      </>
    );
  };

  const fetchSimilarProduct = async (subcategory: string, idProduct: any) => {
    try {
      const responseProductSimilar = await fetch(
        `${URL_BASE}/api/productos?populate[imagen]=*&populate[tag_producto]=*&filters[subcategoria][id][$eq]=${subcategory}&filters[id][$ne]=${idProduct}&pagination[limit]=4`,
        {
          cache: "no-store",
        }
      );

      if (!responseProductSimilar.ok) {
        throw new Error(`Error de red`);
      }

      const dataProductsSimilar = await responseProductSimilar.json();
      return dataProductsSimilar;
    } catch (error: any) {
      console.error("Error durante la solicitud fetch:", error.message);
      throw error;
    }
  };

  const CardsProducts = async ({ subcategory, idProduct }: any) => {
    const productsSimilar = await fetchSimilarProduct(subcategory, idProduct);
    return (
      <>
        {productsSimilar.data.map((product: any) => (
          <div key={product.id} className="col-span-1">
            <CardProduct product={product} />
          </div>
        ))}
      </>
    );
  };

  export default DetailsProduct;
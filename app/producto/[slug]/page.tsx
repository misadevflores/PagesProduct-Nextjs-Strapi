import DetailsProduct from "@/components/page/detailsProduct";
import { Toaster } from "@/components/ui/toaster";
import { Metadata, ResolvingMetadata } from 'next'
import { URL_BASE } from "@/lib/endpoint";
// export const metadata: Metadata = {
//     title: 'titulo del producto',
//     description: 'descripcion del producto constantes además de una experiencia amigable y confiable de compra.',
// }

 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params} : any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const {slug} = params
 console.log(slug)
  // fetch data
//    try {
//         const product :Response = await fetch(`${URL_BASE}/api/productos?filters[slug][$eq]=${slug}&populate=*`, {
//         cache: 'no-store'
//        })
//        if(!product.ok){
//         throw new Error(`Error de red  Código: ${ product.status}`)
//        }
//        const data= await  product.json()
//        return data;
//     } catch (error: any) {
//          console.error('Error durante la solicitud fetch:', error.message);
//         throw error;
//     }
//     console.log(data)
  const product = await fetch(`${URL_BASE}/api/productos?filters[slug][$eq]=${slug}&populate=*`).then((res) => res.json())
    console.log(product)
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
export default function ProductHome({ params }: any ) {
    const { slug } = params
    return (
        <div>
            <DetailsProduct slug={slug} />
            <Toaster />
        </div>
    )
}
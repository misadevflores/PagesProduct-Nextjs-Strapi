import { URL_BASE } from "@/lib/endpoint"
import Image from "next/image"

interface IImg {
    url: string,
    alt?: string,
    qwidth?: number,
    qheight?: number,
    width: string,
    height: string,
    className?: string,
    baseUrl?: true|false,
    objectFit: 'cover'|'contain'
}

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

const Img = ({url, alt = 'Hauscenter', qwidth= 1280, qheight= 720, width = '100%', height= '650px', objectFit = 'cover', className= "", baseUrl=true}: IImg) => {
    return  <Image className={className} src={baseUrl ? `${URL_BASE}${url}` : url} alt={alt} width={qwidth} height={qheight} style={{ width, height, objectFit}} placeholder="blur"
    blurDataURL={rgbDataURL(255, 255, 255)} loading="lazy" />
}

export default Img
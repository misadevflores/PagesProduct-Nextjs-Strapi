'use client'

import React, { useRef, useState } from "react";
import { ZoomIn, ZoomOut, XCircle, MoveLeft, MoveRight } from 'lucide-react';
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import Img from "../ui/img";
import { Button } from "flowbite-react";

const Controls = ({ zoomIn, zoomOut, resetTransform }: any) => (
    <div className="flex justify-center space-x-3">
        <button className="rounded-full h-10 w-10 bg-primary text-white dark:bg-slate-900 p-2 flex justify-center items-center font-extrabold" onClick={() => zoomIn()}>  <ZoomIn size={74} strokeWidth={2}/> </button>
        <button className="rounded-full h-10 w-10 bg-primary text-white dark:bg-slate-900 p-2 flex justify-center items-center font-extrabold" onClick={() => zoomOut()}>  <ZoomOut size={74} strokeWidth={2}/> </button>
        <button className="rounded-full h-10 w-10 bg-primary text-white dark:bg-slate-900 p-2 flex justify-center items-center font-extrabold" onClick={() => resetTransform()}> <XCircle size={74} strokeWidth={2}/> </button>
    </div>
);
const ImageZoom = ({ imagePrimary, arrayImg }: any) => {
    const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
    const [ img, setImg ] = useState<string>(imagePrimary)
    const [ ImgCount, SetImgKey] = useState<any>([arrayImg.length -1 ])
    const [btnRight, SetBtnRight]=useState(true);
    const [btnLeft, SetBtnLeft]=useState(false);
    const zoomToImage = () => {
        if (transformComponentRef.current) {
            const { zoomToElement } = transformComponentRef.current;
            zoomToElement("imgExample");
        }
    };
   function LeftImg(){
            ImgCount.map((number:any) =>{
                if(number<=[0]){
                    SetImgKey([0]);
                    SetBtnLeft(true)
                    // console.log('ya no puede ir mas atras por que ya no hay img')
                }else{
                    const count= number - 1;
                    SetImgKey([count]);
                    setImg(arrayImg[count].attributes.url);
                    SetBtnRight(false)
                }
           })
        
    } 
    function RightImg (){
      
         const LimitArray=[arrayImg.length -1]
                ImgCount.map((number:any) =>{
                    if(LimitArray===ImgCount){
                        SetImgKey([0]);
                        //  console.log('esta condicio no cumple y es mayor')
                        //  console.log(ImgCount,LimitArray)
                         SetBtnRight(true)
                         SetImgKey(0);
                        
                    }else{
                        const count= number + 1;
                        SetImgKey([count]);
                        SetBtnLeft(false)
                        SetBtnRight(false)
                        // console.log(ImgCount,LimitArray)
                        // console.log('esta consicion si cuple al limite del array')
                         setImg(arrayImg[count].attributes.url);
                       
                    }
                
                })
       
    }
    return (

        <>
               
            <div className="flex justify-center items-center  cursor-pointer ">
                
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    ref={transformComponentRef}
                >
                    {(utils) => (
                        <div className="">
                            <Controls {...utils} />
                            <TransformComponent>
                                <Img url={img} width={'1024px'} height={'500px'} objectFit={"contain"} className="contrast-100 iecursor-pointer object-center object-contain"/>
                                <div className="absolute" onClick={zoomToImage}></div>
                            </TransformComponent>
                        </div>
                    )}
                </TransformWrapper>
                 
            </div>
                 <div className="rounded-3xl flex bg-slate-800  w-32 mx-auto mt-[-74px] relative  opacity-[.80]">
                    <button   className=" text-bold m-1  cursor-pointer text-white w-20 hover:text-[#FFC436]" onClick={LeftImg} disabled={btnLeft}>  <MoveLeft  className="w-full"/>  </button >
                    <div  className=" items-center m-1  cursor-pointer text-white"> |  </div>
                    <button className="text-bold items-center m-1  cursor-pointer text-white w-20 hover:text-[#FFC436]" onClick={RightImg} disabled={btnRight}> <MoveRight className="w-full" /></button>
                </div>

            <div className="flex justify-center items-center space-x-4 mt-20">
                {arrayImg.map((element: any) => <div onClick={() => setImg(element.attributes.url)} key={element.id} className="rounded-xl overflow-hidden  border-2  border-solid border-blue-800 w-[150px] h-[150px] flex justify-center items-center hover:cursor-pointer hover:border-[#ffbf36]">
                    <Img url={element.attributes.url} width={"100%"} height={"100%"} objectFit={"contain"} className=" object-center object-contain"/>
                </div>)
                }
            </div>
        </>
    )
}

export default ImageZoom
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {Noto_Serif_JP, Zen_Tokyo_Zoo,Cinzel} from "next/font/google";
import {X} from "lucide-react";

const noto = Noto_Serif_JP({
  subsets:["latin"],
  weight:["400","700","900"],
  variable:"--font-noto",
});

const zen = Zen_Tokyo_Zoo({
  subsets:["latin"],
  weight:["400"],
  variable:"--font-zen",
});

const cinzel = Cinzel({
  subsets:["latin"],
  weight:["400","700","900"],
  variable:"--font-cinzel",
});

export const DialogBox = (data:{text: string,japanese:string}) => {
  return (
    <>
      <div className="w-[95%] md:w-[40%] h-28 md:h-24 rounded-xl bg-[#0d0d0d] backdrop-blur-sm border border-[#7f1d1d] shadow-[0_0_60px_rgba(0,0,0,1)] z-30">
        <div className="w-full h-[100px] md:h-[85px] grid grid-cols-[1fr_4fr_1fr] items-center gap-5">
          <div className="w-2 h-2 rounded-sm transform rotate-45 transition-all bg-transparent border border-[#e6191e] shadow-[0_0_10px_4px_(#e6192e)] flex justify-center items-center p-[10px] justify-self-end"><div className="bg-red-600 p-[5px] rounded-full"></div></div>
          <div className="w-fit h-fit justify-self-start"><p className="text-[#888] cursor-default max-md:text-xs">{data.japanese}</p><p className={`text-white max-md:text-sm cursor-default ${cinzel.variable} tracking-widest`}>{data.text}</p></div>
          <div className="w-fit h-fit z-50 cursor-pointer justify-self-center"><X size={22} fontFamily={"bold"}/></div>
        </div>
        <motion.div
          className="bg-[#e6192e] h-[5px] rounded-ee-xl rounded-es-xl mt-[5px] md:mt-[3px]"
          initial={{ width: "auto" }}
          animate={{ width: 0 }}
          transition={{ duration: 2, ease:"linear" }}
        ></motion.div>
      </div>
    </>
  );
};

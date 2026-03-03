"use client";

import Link from "next/link";
import { Undo, Settings, Pencil, Star } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans flex justify-center py-8 px-6">
      
      <div className="w-full max-w-95 animate-fade-up">
        <div className="flex justify-between items-center mb-8">
          <Link href="./" className="text-foreground hover:opacity-70 transition-opacity">
            <Undo className="w-8 h-8" strokeWidth={2.5} />
          </Link>
          <button className="bg-[#fcf5c7] text-black p-2.5 rounded-full hover:opacity-90 transition-opacity">
            <Settings className="w-[22px] h-[22px]" strokeWidth={2} />
          </button>
        </div>

        {/* === DATELE PROFILULUI === */}
        <div className="flex flex-col items-center mb-7">
          {/* Avatar - Dacă ai o imagine a ta, poți pune un tag <img /> sau <Image /> de la Next.js aici */}
          <div className="w-[110px] h-[110px] rounded-full bg-[#827299] overflow-hidden mb-4 border-2 border-transparent">
             <img 
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Greta&backgroundColor=827299" 
                alt="Avatar" 
                className="w-full h-full object-cover" 
             />
          </div>

          <h1 className="font-serif text-[32px] font-bold text-center leading-[1.15] mb-4">
            Greta<br />Bennett
          </h1>

          <button className="flex items-center justify-center gap-2 bg-[#e6e6e6] text-black px-5 py-2 rounded-full text-[14px] font-semibold hover:bg-[#d4d4d4] transition-colors mb-6">
            <Pencil className="w-[15px] h-[15px]" strokeWidth={2.5} />
            Edit profile
          </button>

          {/* Bio */}
          <div className="text-[13px] text-foreground/80 leading-[1.6] flex gap-2 w-full">
             <span className="text-foreground whitespace-nowrap">Bio:</span>
             <p>
               🌿 Plant lover | Yard Designer | Creator<br/>
               I like to connect with people and give a lot of help!
             </p>
          </div>
        </div>

        {/* Linia despărțitoare */}
        <div className="w-full h-px bg-foreground/20 mb-8" />

        {/* === BENTO GRID (Statistici) === */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          
          {/* Coloana din Stânga */}
          <div className="flex flex-col gap-4">
            
            {/* Caseta 1: Connections */}
            <div className="bg-[#fcf5c7] text-black rounded-[20px] p-5 flex flex-col items-center justify-center h-[150px]">
              <span className="font-bold text-[14px] mb-2">Connections</span>
              <span className="text-[44px] font-medium leading-none tracking-tight">45+</span>
            </div>

            {/* Caseta 2: Best at */}
            <div className="bg-[#eafa4b] text-black rounded-[20px] p-5 flex flex-col items-center justify-center h-[140px]">
              <span className="font-bold text-[14px] mb-2">Best at</span>
              <span className="text-[18px] font-medium">Gardening</span>
            </div>
            
          </div>

          {/* Coloana din Dreapta */}
          <div className="flex flex-col gap-4">
            
            {/* Caseta 3: Trust score */}
            <div className="bg-[#eafa4b] text-black rounded-[20px] p-5 flex flex-col items-center justify-center h-[110px]">
              <span className="font-bold text-[14px] mb-2">Trust score</span>
              <div className="flex gap-1">
                {/* Stele pline */}
                <Star className="w-[18px] h-[18px] fill-black stroke-black" />
                <Star className="w-[18px] h-[18px] fill-black stroke-black" />
                <Star className="w-[18px] h-[18px] fill-black stroke-black" />
                {/* Stele goale */}
                <Star className="w-[18px] h-[18px] stroke-black" strokeWidth={1.5} />
                <Star className="w-[18px] h-[18px] stroke-black" strokeWidth={1.5} />
              </div>
            </div>

            {/* Caseta 4: Skills */}
            <div className="bg-[#fcf5c7] text-black rounded-[20px] p-5 flex flex-col items-center text-center h-[180px]">
              <span className="font-bold text-[14px] mb-3 mt-1">Skills</span>
              <div className="text-[15px] leading-snug flex flex-col gap-1">
                <span>Gardening</span>
                <span>Cooking</span>
                <span>DIY</span>
              </div>
            </div>

          </div>
        </div>

        {/* Caseta 5: Botom Stats (Helped & Posts) */}
        <div className="bg-[#fcf5c7] text-black rounded-[20px] py-5 px-4 flex items-center justify-evenly w-full">
          <div className="flex flex-col items-center w-full">
            <span className="text-[14px] mb-1">Helped</span>
            <span className="text-[32px] font-medium leading-none">23</span>
          </div>
          
          {/* Linia verticală de despărțire */}
          <div className="w-[1px] h-[40px] bg-black/15" />
          
          <div className="flex flex-col items-center w-full">
            <span className="text-[14px] mb-1">Posts</span>
            <span className="text-[32px] font-medium leading-none">12</span>
          </div>
        </div>

      </div>
    </div>
  );
}
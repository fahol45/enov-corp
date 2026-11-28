import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

type ContactPayload = {name:string;email:string;phone?:string;company?:string;message:string};
const rateLimitMap = new Map<string,{count:number;resetAt:number}>();
const WINDOW=10*60*1000;
function limited(ip:string){const now=Date.now();for(const [key,value]of rateLimitMap)if(value.resetAt<=now)rateLimitMap.delete(key);const entry=rateLimitMap.get(ip);if(!entry){rateLimitMap.set(ip,{count:1,resetAt:now+WINDOW});return false;}if(entry.count>=3)return true;entry.count++;return false;}
export async function POST(request:Request){
 const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??request.headers.get("x-real-ip")??"unknown";
 if(limited(ip))return NextResponse.json({message:"Trop de demandes. Réessayez dans quelques minutes."},{status:429});
 let raw:unknown;try{raw=await request.json();}catch{return NextResponse.json({message:"Demande invalide."},{status:400});}
 if(!raw||typeof raw!=="object"||Array.isArray(raw))return NextResponse.json({message:"Demande invalide."},{status:400});
 const input=raw as Record<string,unknown>;
 for(const [field,max]of Object.entries({name:150,email:254,phone:60,company:200,message:10000})){
   const value=input[field];
   if(value!==undefined&&(typeof value!=="string"||value.length>max))return NextResponse.json({message:"Un champ est invalide ou trop long."},{status:400});
 }
 const name=typeof input.name==="string"?input.name.trim():"";const email=typeof input.email==="string"?input.email.trim():"";const message=typeof input.message==="string"?input.message.trim():"";
 if(!name||!message||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({message:"Vérifiez votre nom, votre adresse email et votre message."},{status:400});
 const payload:ContactPayload={name,email,message,phone:typeof input.phone==="string"?input.phone.trim():undefined,company:typeof input.company==="string"?input.company.trim():undefined};
 try{await sendContactNotification(payload);return NextResponse.json({success:true});}catch{return NextResponse.json({message:"L’envoi a échoué. Écrivez-nous à contact@enovcorp.com."},{status:500});}
}

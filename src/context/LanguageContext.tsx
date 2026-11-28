"use client";
import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
export type SupportedLanguage = "fr" | "en";
type LanguageContextValue={language:SupportedLanguage;setLanguage:(language:SupportedLanguage)=>void};
const LanguageContext=createContext<LanguageContextValue|undefined>(undefined);
const KEY="enov:language"; const EVENT="enov-language-change";
let memory:SupportedLanguage|null=null;
function snapshot():SupportedLanguage { if(memory)return memory;try{const value=window.localStorage.getItem(KEY);return value==="en"?"en":"fr";}catch{return "fr";} }
function subscribe(callback:()=>void){const storage=(event:StorageEvent)=>{if(event.key===KEY||event.key===null){memory=null;callback();}};window.addEventListener("storage",storage);window.addEventListener(EVENT,callback);return()=>{window.removeEventListener("storage",storage);window.removeEventListener(EVENT,callback);};}
function setLanguage(language:SupportedLanguage){memory=language;try{window.localStorage.setItem(KEY,language);}catch{/* Language remains usable when storage is blocked. */}window.dispatchEvent(new Event(EVENT));}
export function LanguageProvider({children}:{children:ReactNode}){
 const language=useSyncExternalStore(subscribe,snapshot,()=>"fr" as SupportedLanguage);
 useEffect(()=>{document.documentElement.lang=language;},[language]);
 const value=useMemo(()=>({language,setLanguage}),[language]);
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const context=useContext(LanguageContext);if(!context)throw new Error("useLanguage must be used within LanguageProvider");return context;}

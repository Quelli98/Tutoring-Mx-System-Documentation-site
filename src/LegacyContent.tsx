import { useEffect } from 'react';
import { legacyPages } from './legacy';
export default function LegacyContent({id,onReady}:{id:string;onReady:()=>void}){
 useEffect(()=>{onReady();},[id,onReady]);
 return <div className="legacy-content">{legacyPages[id]?.content}</div>;
}

import { useEffect } from 'react';
import original from './data/original-readme.json';
export default function OriginalReadme({onReady}:{onReady:()=>void}){useEffect(()=>onReady(),[onReady]);return <div className="prose" dangerouslySetInnerHTML={{__html:original.html}}/>}

export type Subject = '算数' | '国語'; export type Difficulty = 'やさしい' | '標準' | '難しい'; export type Volume = '少なめ' | '普通' | '多め';
export type Unit = { id:string; grade:number; subject:Subject; name:string; availableMonth:number; availableByObon:boolean; prerequisites:string[]; difficultyLevel:string; description:string }
export type RequestData = { id:string; createdAt:string; grade:number; subject:Subject; difficulty:Difficulty; volume:Volume; purpose:string; selectedUnits:string[]; notes:string }
export type Problem = { question:string; answer:string; explanation?:string }
export type Worksheet = { title:string; summary:string; passage?:string; problems:Problem[] }

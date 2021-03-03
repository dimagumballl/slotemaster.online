import {keys} from "lodash"
import {omit} from 'lodash'


function WorkWithReels(state, action){
    let MasKey=keys(action.paylot)
    let KeySc
    let WorkType=false
    
    
    for(let i = 0;i<keys(action.paylot).length;i++){
        if(MasKey[i]=="vID"){
            KeySc=action.paylot.vID
            break
        }
         else if(MasKey[i]=="v2"){
            KeySc=action.paylot.v2
            for(let i = 0;i<keys(action.paylot).length;i++){
                if(MasKey[i]=="ReelSize"){
                    WorkType="ReelSize"
                }
            }
        }
        
        else if(MasKey.length==1)
            KeySc=action.paylot
    }
    let scene=state.Game.SceneList[KeySc]
    let symbols = state.Game.SceneList[KeySc].Symbols
    let reels=scene.Reels
    if(WorkType=="ReelSize"){
        let Nof = action.paylot.v3
        let nValue = parseInt((action.paylot.v1+" ").replace(/\D+/g,""))
        
        if(isNaN(nValue)){
            
            reels={}
        }
        else if(keys(reels).length==0){

            for(let i = 1;i<=nValue;i++){
                
                    reels={
                
                        ...reels,
                        [i]:{
                            name:"Reel"+[i],
                            symbols:{
                                ...symbols
                            },
                            NumS:0,
                            NumW:0
                        }
                    }
                
            }
        }
        else{
           
            if(nValue<Nof){
                
                for(let i = nValue+1;i<=Nof;i++){
                    for(let a = 0;a<keys(reels).length;a++){
                    
                        reels={
                        
                            ...omit(reels, i)
                        }
                    }
                }
            }
            else if(nValue>Nof){
            
                    for(let i = Nof+1;i<=nValue;i++){
                        for(let a = 0;a<keys(reels).length;a++){
                            reels={
                        
                                ...reels,
                                [i]:{
                                    name:"Reel"+[i],
                                    symbols:{
                                        ...symbols
                                    },
                                    NumS:0,
                                    NumW:0
                                }
                            }
                        }
                    }
            } 
        }
       
    }
    else{
        for(let i = 1;i<=keys(reels).length;i++){
            
            reels={     
                ...reels,
                [i]:{
                    name:"Reel"+[i],
                    symbols:{
                        ...symbols
                    },
                    NumS:0,
                    NumW:0,
                    NumSc:0
                }
            }
        }
    }
    if(keys(symbols).length!=0){
        for(let i = 1;i<=keys(reels).length;i++){
            for(let a = 0;a<keys(symbols).length;a++){
                if(symbols[keys(symbols)[a]].Reelstrip[i]==0){
                    
                    reels={
                        ...reels,
                        [i]:{
                            ...reels[i],
                            NumS:reels[i].NumS,
                            NumW:reels[i].NumW,
                            NumSc:reels[i].NumSc
                        }
                        
                    }
                }
                else if(symbols[keys(symbols)[a]].Reelstrip[i]==""){
                    reels={
                        ...reels,
                        [i]:{
                            ...reels[i],
                            NumS:reels[i].NumS,
                            NumW:reels[i].NumW,
                            NumSc:reels[i].NumSc
                        }
                        
                    }
                }
                else if(symbols[keys(symbols)[a]].Reelstrip[i]==undefined){
                    reels={
                        ...reels,
                        [i]:{
                            ...reels[i],
                            NumS:reels[i].NumS,
                            NumW:reels[i].NumW,
                            NumSc:reels[i].NumSc
                        }
                        
                    }
                }
                else{
                   
                    reels={
                        ...reels,
                        [i]:{
                            ...reels[i],
                            NumS:reels[i].NumS+symbols[keys(symbols)[a]].Reelstrip[i],
                            NumW:symbols[keys(symbols)[a]].Special.isWild?reels[i].NumW+symbols[keys(symbols)[a]].Reelstrip[i]:reels[i].NumW,
                            NumSc:reels[i].symbols[keys(symbols)[a]].Special.isScatter?reels[i].NumSc+symbols[keys(symbols)[a]].Reelstrip[i]:reels[i].NumSc,
                        }
                        
                    }
                }
            }
        }
        
    for(let a=1;a<=keys(reels).length;a++){
        reels={
            ...reels,
            [a]:{
                ...reels[a],
                ScInReel:reels[a].NumSc*1
            }
        },
        reels={
            ...reels,
            [a]:{
                ...reels[a],
                p_Sc:reels[a].ScInReel!=0?reels[a].ScInReel/reels[a].NumS:0,
                p_no_Sc:reels[a].ScInReel!=0?1-reels[a].ScInReel/reels[a].NumS:1
            }
        }
        
        for (let i = 0; i<keys(symbols).length;i++){
                let check =reels[a].symbols[keys(symbols)[i]].Special.isWild
                let SsinReel = reels[a].NumS
                let SinReel = reels[a].symbols[keys(symbols)[i]].Reelstrip[a]+reels[a].NumW
                let reelstriP = reels[a].symbols[keys(symbols)[i]].Reelstrip[a]
                reels={
                    ...reels,
                    [a]:{
                        ...reels[a],
                        symbols:{
                            ...reels[a].symbols,
                            [keys(symbols)[i]]:{
                                ...reels[a].symbols[keys(symbols)[i]],
                                Num:reels[a].symbols[keys(symbols)[i]].Special.isWild?reels[a].symbols[keys(symbols)[i]].Reelstrip[a]+reels[a].NumW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a],
                                NumInreel:check?(SinReel!=0?SinReel/SsinReel:0):(reelstriP!=0?reelstriP/SsinReel:0),
                                NumNoreel :check?(SinReel!=0?1-(SinReel/SsinReel):1):(reelstriP!=0?1-(reelstriP/SsinReel):1),
                            }

                        }
                    }
                } 
        }

    }
    let p_Sc_win={

    }
        for(let i = 1;i<=keys(reels).length;i++){
            let ArrNoKay = [ ]
            p_Sc_win={
                ...p_Sc_win,
                [i]:1
            }
            if(i!=keys(reels).length){
                for(let a = 0;a<keys(reels).length-i;a++){
                    ArrNoKay[a]=keys(reels)[a]
                }
                let las = ArrNoKay.length-1, start = true, k=ArrNoKay.length-2
                if(ArrNoKay.length!=1&&ArrNoKay.length!=2){
                    while(start){
                        ArrNoKay[las]++;
                        
                        if(ArrNoKay[las]>keys(reels).length){
                            
                            
                            if((Number(ArrNoKay[las]-2)==Number(ArrNoKay[k]))){
                                
                                
                                let start2 = true
                                
                                
                                while(start2){
                                    if(Number(ArrNoKay[k]-1)!=Number(ArrNoKay[k-1])){
                                        
                                        ArrNoKay[k-1]=Number(ArrNoKay[k-1])+1
                                        for(let q = k, m=1;q<ArrNoKay.length;q++,m++){
                                            
                                            ArrNoKay[q]=Number(ArrNoKay[k-1])+m
                                        }
                                        k=ArrNoKay.length-2
                                        start2=!start2
                                    }
                                    else{
                                        k--
                                        if(k<0){
                                            start2=!start2
                                            start=!start
                                        }

                                    }
                                }
                                break
                            }
                            else{
                                ArrNoKay[las]=Number(ArrNoKay[k])+2
                                ArrNoKay[k]=Number(ArrNoKay[k])+1
                                
                            }
                             
                        }
                        
                    }
                }
                else if(ArrNoKay.length==1){
                    while(start){
                        ArrNoKay[las]++;
                        if(ArrNoKay[las]>keys(reels).length){
                            
                            start=!start
                        }
                    }
                    
                }
                else if(ArrNoKay.length==2){
                    while(start){
                        ArrNoKay[las]++;
                        if(ArrNoKay[las]>keys(reels).length)
                            if((Number(ArrNoKay[las]-2)==Number(ArrNoKay[k])))
                                start=!start
                            else{
                                ArrNoKay[las]=Number(ArrNoKay[k])+2
                                ArrNoKay[k]=Number(ArrNoKay[k])+1
                            }
                    }
                    
                }
                
            }
            console.log(ArrNoKay)
        }
    }
    
   
    return{
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [KeySc]:{
                   ...state.Game.SceneList[KeySc],
                   Reels:{
                       ...reels
                   } 
                }
            }
        }
    }
}
export {WorkWithReels}
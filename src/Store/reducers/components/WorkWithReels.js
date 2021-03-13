import {keys} from "lodash"
import {omit} from 'lodash'


function WorkWithReels(state, action){
    let MasKey=keys(action.paylot)
    let KeySc
    let WorkType=false
    let RTP_base = 0
    let FreeGame = 0
    let RTP = 0
    let HitRate=0
    
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
        
        else if(MasKey.length==1){
            
            KeySc=action.paylot
        }
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
        
        let wild=undefined
        for(let i=0;i<keys(symbols).length;i++){
            if(symbols[keys(symbols)[i]].Special["isWild"]){
                wild=keys(symbols)[i]
                break
            }
        }
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
                    let check=true
                    let SubArray = keys(reels[a].symbols[keys(symbols)[i]].Substiture)
                    
                    for(let o = 0;o<SubArray.length;o++){
                        
                        if(reels[a].symbols[SubArray[o]].Special["isWild"]&&reels[a].symbols[keys(symbols)[i]].Substiture[SubArray[o]].value){
                            
                            check=false
                        }
                    }
                    if(check)
                        reels={
                            ...reels,
                            [a]:{
                                ...reels[a],
                                symbols:{
                                    ...reels[a].symbols,
                                    [keys(symbols)[i]]:{
                                        ...reels[a].symbols[keys(symbols)[i]],
                                        Num:reels[a].symbols[keys(symbols)[i]].Reelstrip[a],
                                        NumInreel:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS:0,
                                        NumNoreel:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?1-(reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS):1,
                                        NumZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a],
                                        NumInreelZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS:0,
                                        NumNoreelZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?1-(reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS):1,
                                        IsWithWild:false
                                    }

                                }
                            }
                        }
                    else
                        reels={
                            ...reels,
                            [a]:{
                                ...reels[a],
                                symbols:{
                                    ...reels[a].symbols,
                                    [keys(symbols)[i]]:{
                                        ...reels[a].symbols[keys(symbols)[i]],
                                        Num:reels[a].symbols[keys(symbols)[i]].Reelstrip[a],
                                        NumInreel:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS:0,
                                        NumNoreel:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?1-(reels[a].symbols[keys(symbols)[i]].Reelstrip[a]/reels[a].NumS):1,
                                        NumZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]+reels[a].NumW,
                                        NumInreelZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?(reels[a].symbols[keys(symbols)[i]].Reelstrip[a]+reels[a].NumW)/reels[a].NumS:0,
                                        NumNoreelZW:reels[a].symbols[keys(symbols)[i]].Reelstrip[a]!=0?1-((reels[a].symbols[keys(symbols)[i]].Reelstrip[a]+reels[a].NumW)/reels[a].NumS):1,
                                        IsWithWild:true
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
            
            if(i!=keys(reels).length){
                for(let a = 0;a<keys(reels).length-i;a++){
                    ArrNoKay[a]=Number(keys(reels)[a])
                }
                p_Sc_win={
                    ...p_Sc_win,
                    [i]:0
                }
                let las = ArrNoKay.length-1, start = true, k=ArrNoKay.length-2, mul
                if(ArrNoKay.length!=1&&ArrNoKay.length!=2){
                    while(start){
                        
                        mul=1
                        for(let c = 0;c<keys(reels).length;c++){
                            let check1=true
                            for(let v = 0;v<ArrNoKay.length;v++){
                                if(keys(reels)[c]==ArrNoKay[v])
                                    check1=false
                            }
                            if(check1){
                                mul=mul*reels[(keys(reels)[c])].p_Sc
                                
                            }
                            else{
                                mul=mul*reels[(keys(reels)[c])].p_no_Sc
                                
                            }
                            
                        }
                        
                        p_Sc_win={
                            ...p_Sc_win,
                            [i]:p_Sc_win[i]+mul
                                
                            
                        }
                       
                        
                        ArrNoKay[las]++;
                        if(ArrNoKay[las]>keys(reels).length){
                            if((Number(ArrNoKay[las]-2)==Number(ArrNoKay[k]))){
                                let start2 = true
                                while(start2){
                                    if(ArrNoKay[k-1]!=undefined){
                                        if(Number(ArrNoKay[k]-1)!=Number(ArrNoKay[k-1])){
                                            let temp = Number(ArrNoKay[k-1])
                                            
                                            for(let q = k-1, m=1;q<ArrNoKay.length;q++,m++){
                                                
                                                ArrNoKay[q]=temp+m
                                            }
                                            k=ArrNoKay.length-2
                                            start2=!start2
                                        }
                                        else{
                                            k--
                                        }
                                    }
                                    else{
                                        start2=!start2
                                        start=!start
                                          
                                        mul=1
                                        for(let c = 0;c<keys(reels).length;c++){
                                        let check1=true
                                        for(let v = 0;v<ArrNoKay.length;v++){
                                            if(keys(reels)[c]==ArrNoKay[v])
                                                check1=false
                                        }
                                        if(check1)
                                            mul=mul*reels[(keys(reels)[c])].p_Sc
                                        else
                                            mul=mul*reels[(keys(reels)[c])].p_no_Sc
                                        }
                                        p_Sc_win={
                                            ...p_Sc_win,
                                            [i]:p_Sc_win[i]+mul
                                        }
                                        
                                    }
                                }
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
                        mul=1
                        for(let c = 0;c<keys(reels).length;c++){
                        let check1=true
                        for(let v = 0;v<ArrNoKay.length;v++){
                            if(keys(reels)[c]==ArrNoKay[v])
                                check1=false
                        }
                        if(check1)
                            mul=mul*reels[(keys(reels)[c])].p_Sc
                        else
                            mul=mul*reels[(keys(reels)[c])].p_no_Sc
                        }
                        p_Sc_win={
                            ...p_Sc_win,
                            [i]:p_Sc_win[i]+mul
                        }
                        
                        ArrNoKay[las]++;
                        if(ArrNoKay[las]>keys(reels).length){
                            
                            
                            start=!start
                        }
                    }
                }
                else if(ArrNoKay.length==2){
                    while(start){
                        mul=1
                        for(let c = 0;c<keys(reels).length;c++){
                        let check1=true
                        for(let v = 0;v<ArrNoKay.length;v++){
                            if(keys(reels)[c]==ArrNoKay[v])
                                check1=false
                        }
                        if(check1)
                            mul=mul*reels[(keys(reels)[c])].p_Sc
                        else
                            mul=mul*reels[(keys(reels)[c])].p_no_Sc
                        }
                        p_Sc_win={
                            ...p_Sc_win,
                            [i]:p_Sc_win[i]+mul
                        }
                        
                        ArrNoKay[las]++;
                        if(ArrNoKay[las]>keys(reels).length)
                            if((Number(ArrNoKay[las]-2)==Number(ArrNoKay[k]))){
                                
                                start=!start
                            }
                            else{
                                ArrNoKay[las]=Number(ArrNoKay[k])+2
                                ArrNoKay[k]=Number(ArrNoKay[k])+1
                            }
                    }
                } 
            }
            else if(i==keys(reels).length){
                p_Sc_win={
                    ...p_Sc_win,
                    [i]:1
                }
                for(let c = 0;c<keys(reels).length;c++){
                    p_Sc_win={
                        ...p_Sc_win,
                        [i]:p_Sc_win[i]*reels[keys(reels)[c]].p_Sc
                    }
                    
                }
                
            }
            reels={
                ...reels,
                [i]:{
                    ...reels[i],
                    p_Sc_win:p_Sc_win[i]
                }
                

            }
        }
        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////
        let TheBigestValues={}
        
        for(let i = 1;i<=keys(reels).length;i++){
            let temp=symbols[keys(symbols)[0]].Paytable[i]
            let index
            for(let a = 0;a<keys(symbols).length;a++){
                if(reels[i].symbols[keys(symbols)[a]].IsWithWild)
                    if(temp<=symbols[keys(symbols)[a]].Paytable[i]){
                        temp=symbols[keys(symbols)[a]].Paytable[i]
                        index=keys(symbols)[a]
                    }
            }
            TheBigestValues={
                ...TheBigestValues,
                [i]:index
            }
           
        }
        
        for(let i = 1;i<=keys(reels).length;i++){
            for(let a = 0;a<keys(symbols).length;a++){
                let p_sym_win={}
                reels={
                    ...reels,
                    [i]:{
                        ...reels[i],
                        symbols:{
                            ...reels[i].symbols,
                            [keys(symbols)[a]]:{
                                ...reels[i].symbols[keys(symbols)[a]],
                                p_sym_win:{} 
                            }  
                        }
                    }
                }
                
                for(let l=1;l<=keys(reels).length;l++){
                    
                    if(l==keys(reels).length){
                        
                        p_sym_win={
                            ...p_sym_win,
                            [l]:1
                        }
                        for(let o = 1;o<=keys(reels).length;o++){
                            p_sym_win={
                                ...p_sym_win,
                                [l]:p_sym_win[l]*reels[o].symbols[keys(symbols)[a]].NumInreelZW
                            }
                        }
                        
                        let add=1
                        if(reels[i].symbols[keys(symbols)[a]].IsWithWild){
                            if(wild!=undefined){
                                if(keys(symbols)[a]!=TheBigestValues[i]){
                                    for(let o = 1;o<=keys(reels).length;o++){
                                        add=add*reels[o].symbols[wild].NumInreel
                                        
                                    }
                                    
                                    p_sym_win={
                                        ...p_sym_win,
                                        [l]:p_sym_win[l]-add
                                    }
                                }
                            }
                        }
                    }
                    else{
                        let tick=l+1
                        p_sym_win={
                            ...p_sym_win,
                            [l]:1
                        }
                        for(let o = 1;o<=tick;o++){
                            if(o==tick){
                                p_sym_win={
                                    ...p_sym_win,
                                    [l]:p_sym_win[l]*reels[o].symbols[keys(symbols)[a]].NumNoreelZW
                                }
                            }
                            else{
                                p_sym_win={
                                    ...p_sym_win,
                                    [l]:p_sym_win[l]*reels[o].symbols[keys(symbols)[a]].NumInreelZW
                                }
                            }
                        }
                        
                        let add=1
                        if(reels[i].symbols[keys(symbols)[a]].IsWithWild)
                            if(wild!=undefined){
                                for(let o = 1;o<=tick;o++){
                                    if(o==tick){
                                        add=add*reels[o].symbols[keys(symbols)[a]].NumNoreelZW
                                    }
                                    else{
                                        add=add*reels[o].symbols[wild].NumInreel
                                    }
                                }
                                
                                p_sym_win={
                                    ...p_sym_win,
                                    [l]:p_sym_win[l]-add
                                }
                                
                                if(keys(symbols)[a]==TheBigestValues[i]){
                                    add=1
                                    for(let o = 1;o<=keys(reels).length;o++){
                                        if(o==tick){
                                            add=add*reels[o].symbols[keys(symbols)[a]].NumNoreelZW
                                        }
                                        else{
                                            add=add*reels[o].p_Sc
                                        }
                                    }
                                    
                                    p_sym_win={
                                        ...p_sym_win,
                                        [l]:p_sym_win[l]+add
                                    }
                                }
                            }
                    }
                    
                }
                reels={
                    ...reels,
                    [i]:{
                        ...reels[i],
                        symbols:{
                            ...reels[i].symbols,
                            [keys(symbols)[a]]:{
                                ...reels[i].symbols[keys(symbols)[a]],
                                p_sym_win:{
                                    ...reels[i].symbols[keys(symbols)[a]].p_sym_win,
                                    ...p_sym_win 
                                } 
                            }  
                        }
                    }
                }
            }
        }
        RTP_base=0
        for(let i = 1;i<=keys(reels).length;i++){
            for(let a = 0;a<keys(symbols).length;a++){
                for(let l = 1;l<=keys(reels).length;l++){
                    reels={
                        ...reels,
                        [i]:{
                            ...reels[i],
                            symbols:{
                                ...reels[i].symbols,
                                [keys(symbols)[a]]:{
                                    ...reels[i].symbols[keys(symbols)[a]],
                                    RTP:{
                                        ...reels[i].symbols[keys(symbols)[a]].RTP,
                                        [l]:reels[i].symbols[keys(symbols)[a]].Paytable[l]*reels[i].symbols[keys(symbols)[a]].p_sym_win[l]
                                    }
                                }
                            }
                        }
                    }
                    RTP_base=RTP_base+reels[i].symbols[keys(symbols)[a]].Paytable[l]*reels[i].symbols[keys(symbols)[a]].p_sym_win[l]
                }
                
            }
        }
        
        if(KeySc==state.Game.SceneList[KeySc].FreespinGame){
            FreeGame=0
        }
        else{
            let keyFS=state.Game.SceneList[KeySc].FreespinGame
            for(let i = 1;i<=keys(reels).length;i++){
                FreeGame=FreeGame+(state.Game.SceneList[keyFS].BaseGameRTP*state.Game.SceneList[KeySc].NumberIfFreespin[i]*reels[i].p_Sc_win)
            }
        }
        
        
        RTP=RTP_base+FreeGame
        
        //HitRate

        HitRate=0

        if(keys(reels).length!=0){
            for(let i = 1;i<=keys(reels).length;i++){
                HitRate=0
                for(let a = 0;a<keys(reels[i].symbols).length;a++){
                    for(let l = 1;l<=keys(reels).length;l++){
                        reels={
                            ...reels,
                            [i]:{
                                ...reels[i],
                                symbols:{
                                  ...reels[i].symbols,
                                    [keys(symbols)[a]]:{
                                        ...reels[i].symbols[keys(symbols)[a]],
                                        Rate:{
                                            ...reels[i].symbols[keys(symbols)[a]].Rate,
                                            [l]:reels[i].symbols[keys(symbols)[a]].p_sym_win[l]!=0?1/reels[i].symbols[keys(symbols)[a]].p_sym_win[l]:0
                                        }
                                    }
                                }
                            }
                        }
                        HitRate=HitRate+reels[i].symbols[keys(symbols)[a]].p_sym_win[l]
                    }
                    
                }
                if(HitRate!=0)
                    HitRate=1/HitRate 
                else 
                    HitRate=0
            }
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
                   },
                   BaseGameRTP:RTP_base ,
                   TotalRTP:RTP,
                   FreespinsRTP:FreeGame,
                   BasegameHitRate:HitRate
                }
            }
        }
    }
}
export {WorkWithReels}
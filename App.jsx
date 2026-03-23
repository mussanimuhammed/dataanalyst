import { useState, useEffect } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine,
  ComposedChart, PieChart, Pie, Cell
} from "recharts";
import {
  Droplets, LayoutDashboard, CheckCircle, Clock, ChevronRight, Activity,
  FlaskConical, Wind, Waves, FileText, Shield, TrendingUp, AlertOctagon,
  LogOut, ArrowLeft, ArrowRight, Bell, User, Database, BarChart2, Leaf,
  RotateCcw, Siren, CircleAlert, Info, Factory, BadgeCheck, TriangleAlert,
  Flame, MapPin, Zap, Building2, ChevronDown, Eye, Calendar, Award,
  TrendingDown, Minus, RefreshCw, Settings, Download, ExternalLink,
  AlertTriangle, CheckSquare, XCircle, Menu, X
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES — "Aqua Command" theme
   Deep obsidian + electric cyan + neon green + amber gold
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{font-size:14px;}
body{font-family:'DM Sans',sans-serif;background:#EEF4FA;color:#1A3348;min-height:100vh;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:#E2EDF5;}
::-webkit-scrollbar-thumb{background:#B0CADE;border-radius:4px;}
::-webkit-scrollbar-thumb:hover{background:#85ABCA;}
.display{font-family:'Outfit',sans-serif;}
.mono{font-family:'JetBrains Mono',monospace;}
button,input,select,textarea{font-family:'DM Sans',sans-serif;}

@keyframes glow-pulse{0%,100%{box-shadow:0 0 8px currentColor;}50%{box-shadow:0 0 18px currentColor;}}
@keyframes dot-pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.7);}}
@keyframes rise-in{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
@keyframes fade-in{from{opacity:0;}to{opacity:1;}}
@keyframes slide-left{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
@keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
@keyframes sweep{from{transform:scaleX(0);}to{transform:scaleX(1);}}
@keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

.ri{animation:rise-in .4s ease both;}
.fi{animation:fade-in .3s ease both;}
.sl{animation:slide-left .35s ease both;}
.lift{transition:transform .2s ease,box-shadow .2s ease;cursor:pointer;}
.lift:hover{transform:translateY(-3px);box-shadow:0 8px 24px #1A334815;}
.tap{transition:all .15s ease;cursor:pointer;}
.tap:hover{filter:brightness(.95);}

/* Card with subtle border */
.gcard{position:relative;border-radius:14px;background:#FFFFFF;}
.gcard::before{content:'';position:absolute;inset:-1px;border-radius:15px;
  background:linear-gradient(135deg,#C8DFF0 0%,#E8F2F9 50%,#C8DFF0 100%);
  z-index:-1;}

/* Stat value accent colors — no glow on light bg */
.glow-cyan{color:#0284C7;}
.glow-green{color:#059669;}
.glow-amber{color:#B45309;}
.glow-red{color:#DC2626;}

/* Animated gradient text */
.grad-text{background:linear-gradient(90deg,#0369A1,#0284C7,#0369A1);
  background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;animation:shimmer 4s linear infinite;}

/* Table row hover */
.trow{transition:background .15s;}
.trow:hover{background:#EEF4FA!important;}

/* Pill badges */
.badge{display:inline-flex;align-items:center;gap:4px;border-radius:20px;
  font-weight:700;letter-spacing:.05em;white-space:nowrap;}

/* Input focus */
input:focus,select:focus{outline:none;border-color:#0284C780!important;
  box-shadow:0 0 0 3px #0284C715!important;}
`;

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════ */
const C = {
  bg:"#EEF4FA", s1:"#FFFFFF", s2:"#F4F8FC", s3:"#EBF2F8",
  card:"#FFFFFF", cardHi:"#F7FBFE",
  b1:"#D4E5F2", b2:"#BBCFDF", b3:"#8AAFC8",
  cyan:"#0284C7", cyan2:"#0369A1", cyanDim:"#0284C715",
  green:"#059669", green2:"#047857", greenDim:"#05966915",
  amber:"#B45309", amberDim:"#B4530915",
  red:"#DC2626", redDim:"#DC262615",
  purple:"#7C3AED", purpleDim:"#7C3AED15",
  pink:"#DB2777", pinkDim:"#DB277715",
  orange:"#C2410C",
  text:"#1A3348", text2:"#2E5575", text3:"#5A7A95",
  muted:"#7A9AB2",
};

/* ═══════════════════════════════════════════════════════════
   LWMR 2024 ACCURATE DATA
═══════════════════════════════════════════════════════════ */
const D14 = ["10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

const PLANTS = [
  {
    id:0, name:"Pirana STP", short:"PIR", loc:"South Ahmedabad", capacity:200,
    reg:"Form 2(A) — Registered", scada:true, iot:true, status:"online",
    sync:"2 min", discharge:"Sabarmati River",
    cto:"CTO/GJ/STP/001", ctoValid:"Dec 2026",
    inflow:178.4, treated:172.6, recovered:91.1, discharged:81.5, recovery:51.2,
    eurCrL:17.84, eurRevDay:17840, eurRevAnnualCr:6.1,
    sludge:142.8, manure:38.2, biogas:12.4, biodiesel:4.1,
    submission:"complete", annualPct:68,
    sensors:{
      bod:{v:8.2,  u:"mg/L",      lim:10,   limTxt:"≤10",  ok:true},
      cod:{v:42.5, u:"mg/L",      lim:250,  limTxt:"≤250", ok:true},
      ph: {v:7.3,  u:"pH",        lim:null, limTxt:"6.5–8.5",ok:true},
      tss:{v:14.8, u:"mg/L",      lim:30,   limTxt:"≤30",  ok:true},
      ecoli:{v:100,u:"MPN/100mL", lim:1000, limTxt:"≤1000",ok:true},
      turb:{v:3.2, u:"NTU",       lim:10,   limTxt:"≤10",  ok:true},
      flow:{v:7.43,u:"m³/s",      lim:null, limTxt:"Live", ok:true},
    },
    trend:D14.map((d,i)=>({d,
      inflow:[172,175,174,179,180,177,176,181,178,182,179,177,180,178][i],
      treated:[166,169,168,173,174,171,170,175,172,176,173,171,174,173][i],
      recovery:[50.1,50.8,50.4,51.2,51.5,50.9,50.6,51.8,51.1,52.0,51.3,50.9,51.4,51.2][i],
      bod:[9.1,8.8,9.4,8.5,8.3,9.0,8.7,8.4,8.1,8.6,8.3,8.0,8.4,8.2][i],
      cod:[47,45,48,43,42,46,44,42,41,43,42,41,43,42][i],
    })),
    compliance:[
      {l:"CPCB Monthly Data",s:"complete"},{l:"Water Quality (CPCB Std)",s:"compliant"},
      {l:"Recovery Rate Target",s:"monitoring"},{l:"Sludge Quality Report",s:"pending"},
      {l:"Sabarmati Discharge",s:"compliant"},{l:"CTO Validity",s:"valid"},
    ],
    alerts:[
      {t:"info",m:"Sludge monthly quality test due 25 Mar 2026",tm:"2 days"},
      {t:"info",m:"Annual return (GPCB) data entry at 68% — due 30 Jun",tm:"99 days"},
    ],
  },
  {
    id:1, name:"Vadaj STP", short:"VAD", loc:"North Ahmedabad", capacity:50,
    reg:"Form 2(A) — Registered", scada:false, iot:true, status:"critical",
    sync:"18 min", discharge:"Sabarmati Canal",
    cto:"CTO/GJ/STP/004", ctoValid:"Mar 2026 ⚠",
    inflow:46.8, treated:43.1, recovered:20.9, discharged:22.2, recovery:48.6,
    eurCrL:4.68, eurRevDay:4680, eurRevAnnualCr:1.7,
    sludge:38.4, manure:9.8, biogas:3.1, biodiesel:0.8,
    submission:"incomplete", annualPct:31,
    sensors:{
      bod:{v:18.7,u:"mg/L",      lim:10,  limTxt:"≤10",  ok:false},
      cod:{v:89.2,u:"mg/L",      lim:250, limTxt:"≤250", ok:true},
      ph: {v:8.9, u:"pH",        lim:null,limTxt:"6.5–8.5",ok:false},
      tss:{v:42.3,u:"mg/L",      lim:30,  limTxt:"≤30",  ok:false},
      ecoli:{v:2400,u:"MPN/100mL",lim:1000,limTxt:"≤1000",ok:false},
      turb:{v:7.8, u:"NTU",      lim:10,  limTxt:"≤10",  ok:true},
      flow:{v:1.95,u:"m³/s",     lim:null,limTxt:"Live", ok:true},
    },
    trend:D14.map((d,i)=>({d,
      inflow:[45,47,46,48,47,45,46,49,47,46,48,47,46,47][i],
      treated:[41,43,42,44,43,41,42,45,43,43,44,43,42,43][i],
      recovery:[47.2,48.1,47.5,48.8,48.3,47.0,47.8,49.2,48.0,47.9,48.6,48.0,47.5,48.6][i],
      bod:[12.0,13.5,15.2,14.8,16.1,15.5,17.2,16.8,18.0,17.5,18.2,19.0,18.5,18.7][i],
      cod:[58,65,72,70,78,75,83,81,86,84,87,91,88,89][i],
    })),
    compliance:[
      {l:"CPCB Monthly Data",s:"at-risk"},{l:"Water Quality (CPCB Std)",s:"breach"},
      {l:"Recovery Rate Target",s:"monitoring"},{l:"Sludge Quality Report",s:"pending"},
      {l:"Canal Discharge Monitoring",s:"breach"},{l:"CTO Validity",s:"expiring"},
    ],
    alerts:[
      {t:"critical",m:"BOD 18.7 mg/L — CPCB limit ≤10 mg/L (EPA §15 criminal liability)",tm:"18 min ago"},
      {t:"critical",m:"E.coli 2400 MPN/100mL — CPCB limit ≤1000 (water body contamination risk)",tm:"18 min ago"},
      {t:"critical",m:"pH 8.9 — Outside permissible range 6.5–8.5",tm:"18 min ago"},
      {t:"warning", m:"TSS 42.3 mg/L — CPCB limit ≤30 mg/L",tm:"1 hr ago"},
      {t:"warning", m:"CTO expiring Mar 2026 — plant registration at risk",tm:"URGENT"},
      {t:"warning", m:"CPCB monthly data incomplete — Apr 7 deadline at risk",tm:"15 days"},
    ],
  },
  {
    id:2, name:"Odhav STP", short:"ODH", loc:"East Ahmedabad", capacity:30,
    reg:"Form 2(A) — Registered", scada:true, iot:true, status:"online",
    sync:"5 min", discharge:"Kharicut Canal",
    cto:"CTO/GJ/STP/007", ctoValid:"Aug 2026",
    inflow:27.2, treated:26.4, recovered:13.9, discharged:12.5, recovery:52.8,
    eurCrL:2.72, eurRevDay:2720, eurRevAnnualCr:0.99,
    sludge:21.3, manure:5.9, biogas:1.8, biodiesel:0.5,
    submission:"complete", annualPct:55,
    sensors:{
      bod:{v:9.4, u:"mg/L",       lim:10,   limTxt:"≤10",  ok:true},
      cod:{v:48.1,u:"mg/L",       lim:250,  limTxt:"≤250", ok:true},
      ph: {v:7.1, u:"pH",         lim:null, limTxt:"6.5–8.5",ok:true},
      tss:{v:16.2,u:"mg/L",       lim:30,   limTxt:"≤30",  ok:true},
      ecoli:{v:320,u:"MPN/100mL", lim:1000, limTxt:"≤1000",ok:true},
      turb:{v:4.1, u:"NTU",       lim:10,   limTxt:"≤10",  ok:true},
      flow:{v:1.13,u:"m³/s",      lim:null, limTxt:"Live", ok:true},
    },
    trend:D14.map((d,i)=>({d,
      inflow:[26,27,27,28,27,26,27,28,27,28,27,27,28,27][i],
      treated:[25,26,26,27,26,25,26,27,26,27,26,26,27,26][i],
      recovery:[51.2,52.0,51.5,52.8,52.1,51.0,51.8,53.2,52.0,53.5,52.4,51.9,52.5,52.8][i],
      bod:[10.1,9.8,10.3,9.5,9.3,9.8,9.6,9.4,9.1,9.5,9.2,9.0,9.3,9.4][i],
      cod:[51,49,52,48,47,50,49,48,46,48,47,46,47,48][i],
    })),
    compliance:[
      {l:"CPCB Monthly Data",s:"complete"},{l:"Water Quality (CPCB Std)",s:"compliant"},
      {l:"Recovery Rate Target",s:"monitoring"},{l:"Sludge Quality Report",s:"complete"},
      {l:"Kharicut Canal Monitoring",s:"compliant"},{l:"CTO Validity",s:"valid"},
    ],
    alerts:[],
  },
];

/* ═══════════════════════════════════════════════════════════
   STATUS CONFIG
═══════════════════════════════════════════════════════════ */
const ST = {
  online:    {bg:"#ECFDF5",tx:"#059669", br:"#05966930",dot:"#059669",  lbl:"Online"},
  critical:  {bg:"#FEF2F2",tx:"#DC2626", br:"#DC262630",dot:"#DC2626",  lbl:"Critical"},
  warning:   {bg:"#FFFBEB",tx:"#B45309", br:"#B4530930",dot:"#B45309",  lbl:"Warning"},
  offline:   {bg:"#FEF2F2",tx:"#EF4444", br:"#EF444430",dot:"#EF4444",  lbl:"Offline"},
  complete:  {bg:"#ECFDF5",tx:"#059669", br:"#05966930",dot:"#059669",  lbl:"Complete"},
  compliant: {bg:"#ECFDF5",tx:"#059669", br:"#05966930",dot:"#059669",  lbl:"Compliant"},
  valid:     {bg:"#ECFDF5",tx:"#059669", br:"#05966930",dot:"#059669",  lbl:"Valid"},
  "at-risk": {bg:"#FFFBEB",tx:"#B45309", br:"#B4530930",dot:"#B45309",  lbl:"At Risk"},
  incomplete:{bg:"#FFFBEB",tx:"#B45309", br:"#B4530930",dot:"#B45309",  lbl:"Incomplete"},
  monitoring:{bg:"#EFF6FF",tx:"#0284C7", br:"#0284C730",dot:"#0284C7", lbl:"Monitoring"},
  pending:   {bg:"#F8FAFC",tx:"#5A7A95", br:"#5A7A9530",dot:"#5A7A95", lbl:"Pending"},
  breach:    {bg:"#FEF2F2",tx:"#DC2626", br:"#DC262630",dot:"#DC2626",  lbl:"Breach"},
  expiring:  {bg:"#FFF7ED",tx:"#C2410C", br:"#C2410C30",dot:"#C2410C", lbl:"Expiring"},
};

/* ═══════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════ */
function Pill({s,sm}){
  const c=ST[s]||ST.pending;
  return(
    <span className="badge" style={{background:c.bg,color:c.tx,border:`1px solid ${c.br}`,
      padding:sm?"1px 7px":"2px 10px",fontSize:sm?9:10}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:c.dot,
        animation:s==="online"?"dot-pulse 2s infinite":"none"}}/>
      {c.lbl}
    </span>
  );
}

function KCard({label,val,unit,sub,acc,Icon,note,pct,delay=0,onClick}){
  return(
    <div className="ri lift gcard" onClick={onClick}
      style={{padding:"16px 18px",animationDelay:`${delay}s`,
        background:`linear-gradient(135deg,${acc}08 0%,${C.s2} 100%)`,
        border:`1px solid ${acc}20`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <span style={{fontSize:9,color:C.text3,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>{label}</span>
        {Icon&&<div style={{width:28,height:28,borderRadius:8,background:`${acc}18`,
          display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${acc}30`}}>
          <Icon size={13} color={acc}/>
        </div>}
      </div>
      <div className="mono display" style={{fontSize:26,fontWeight:700,color:acc,lineHeight:1}}>
        {val}<span style={{fontSize:12,color:C.text3,fontWeight:400,marginLeft:4}}>{unit}</span>
      </div>
      {sub&&<div style={{fontSize:10,color:C.text3,marginTop:5}}>{sub}</div>}
      {note&&<div style={{fontSize:9,color:acc,marginTop:3,opacity:.7}}>{note}</div>}
      {pct!==undefined&&(
        <div style={{marginTop:10}}>
          <div style={{height:3,background:C.b1,borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:acc,borderRadius:2,
              boxShadow:`0 0 8px ${acc}`}}/>
          </div>
          <div style={{fontSize:8,color:C.text3,marginTop:3}}>{pct}% capacity utilisation</div>
        </div>
      )}
    </div>
  );
}

function SLabel({children,mt,action}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
      marginBottom:10,marginTop:mt||0,paddingBottom:8,borderBottom:`1px solid ${C.b1}`}}>
      <span style={{fontSize:9,fontWeight:800,color:C.text3,letterSpacing:".14em",textTransform:"uppercase"}}>{children}</span>
      {action}
    </div>
  );
}

function Topbar({title,role,rc,sub,onBack,onLogout,children}){
  return(
    <div style={{background:C.s1,borderBottom:`1px solid ${C.b1}`,height:52,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 22px",position:"sticky",top:0,zIndex:100,
      backdropFilter:"blur(10px)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {onBack&&(
          <button onClick={onBack} className="tap"
            style={{background:"none",border:`1px solid ${C.b2}`,borderRadius:8,
              cursor:"pointer",color:C.text3,display:"flex",alignItems:"center",
              gap:5,fontSize:11,padding:"4px 10px"}}>
            <ArrowLeft size={12}/>Back
          </button>
        )}
        <div style={{width:1,height:20,background:C.b1}}/>
        <div>
          <span className="display" style={{fontWeight:700,fontSize:13,color:C.text,letterSpacing:"-.2px"}}>{title}</span>
          {sub&&<span style={{fontSize:10,color:C.text3,marginLeft:8}}>{sub}</span>}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {children}
        <div style={{background:`${rc||C.cyan}15`,border:`1px solid ${rc||C.cyan}30`,
          borderRadius:20,padding:"3px 10px",fontSize:10,color:rc||C.cyan,
          display:"flex",alignItems:"center",gap:5}}>
          <User size={10}/>{role}
        </div>
        <button onClick={onLogout} className="tap"
          style={{background:"none",border:"none",cursor:"pointer",
            color:C.text3,display:"flex",alignItems:"center",gap:4,fontSize:10}}>
          <LogOut size={12}/>Exit
        </button>
      </div>
    </div>
  );
}

function DeadlineBanner(){
  return(
    <div style={{background:`linear-gradient(90deg,${C.amber}12,${C.amber}08,${C.amber}12)`,
      borderBottom:`1px solid ${C.amber}20`,padding:"7px 22px",
      display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Siren size={13} color={C.amber} style={{animation:"dot-pulse 1.5s infinite"}}/>
        <span style={{color:C.amber,fontWeight:700,fontSize:11}}>CPCB Monthly Deadline</span>
        <span style={{color:"#FDE68A",fontSize:11}}>— 7 April 2026</span>
        <span className="mono" style={{background:C.amber,color:"#000",fontSize:9,
          padding:"2px 8px",borderRadius:4,fontWeight:800}}>15 DAYS</span>
      </div>
      <div style={{display:"flex",gap:18}}>
        {PLANTS.map(p=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:10}}>
            <span style={{color:C.text3}}>{p.short}:</span>
            <Pill s={p.submission} sm/>
          </div>
        ))}
      </div>
    </div>
  );
}

function ARow({t,m,tm}){
  const cfg={
    critical:{bg:`${C.red}10`,br:C.red,ic:<AlertOctagon size={12} color={C.red}/>,tx:C.red},
    warning: {bg:`${C.amber}10`,br:C.amber,ic:<TriangleAlert size={12} color={C.amber}/>,tx:C.amber},
    info:    {bg:`${C.cyan}08`,br:C.cyan,ic:<Info size={12} color={C.cyan}/>,tx:C.cyan},
  }[t]||{bg:`${C.cyan}08`,br:C.cyan,ic:<Info size={12} color={C.cyan}/>,tx:C.cyan};
  return(
    <div style={{background:cfg.bg,borderLeft:`2px solid ${cfg.br}`,
      borderRadius:"0 8px 8px 0",padding:"8px 12px",marginBottom:5,
      display:"flex",alignItems:"flex-start",gap:8}}>
      <span style={{flexShrink:0,marginTop:1}}>{cfg.ic}</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:11,color:cfg.tx,fontWeight:600,lineHeight:1.4}}>{m}</div>
        <div style={{fontSize:9,color:C.text3,marginTop:2}}>{tm}</div>
      </div>
    </div>
  );
}

const TT=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return(
    <div style={{background:"#FFFFFF",border:`1px solid ${C.b1}`,borderRadius:10,
      padding:"10px 14px",boxShadow:"0 8px 24px #1A334818"}}>
      <div style={{color:C.text3,fontSize:10,marginBottom:6,fontWeight:600}}>Mar {label}</div>
      {payload.map(p=>(
        <div key={p.name} style={{color:p.color,fontSize:11,display:"flex",
          justifyContent:"space-between",gap:16,marginBottom:2}}>
          <span style={{color:C.text3}}>{p.name}</span>
          <span className="mono" style={{fontWeight:600,color:p.color}}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

function CChart({title,legend,h=155,children}){
  return(
    <div className="gcard" style={{padding:"14px 16px",background:C.card,border:`1px solid ${C.b1}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:11,fontWeight:600,color:C.text2}}>{title}</span>
        {legend&&<div style={{display:"flex",gap:12}}>
          {legend.map(l=>(
            <span key={l.l} style={{fontSize:9,color:C.text3,display:"flex",alignItems:"center",gap:4}}>
              <span style={{width:7,height:2,borderRadius:2,background:l.c,display:"inline-block"}}/>
              {l.l}
            </span>
          ))}
        </div>}
      </div>
      <ResponsiveContainer width="100%" height={h}>{children}</ResponsiveContainer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SENSOR CARD — radial gauge style
═══════════════════════════════════════════════════════════ */
const SMETA={
  bod:{l:"BOD",I:FlaskConical},cod:{l:"COD",I:Activity},
  ph:{l:"pH",I:Droplets},tss:{l:"TSS",I:Wind},
  ecoli:{l:"E. coli",I:CircleAlert},turb:{l:"Turbidity",I:Waves},
  flow:{l:"Flow Rate",I:BarChart2},
};

function SensorCard({k,s}){
  const m=SMETA[k];const I=m.I;
  const isFlow=k==="flow";
  const c=isFlow?C.cyan:(s.ok?C.green:C.red);
  const pctFill=s.lim&&s.lim>0?Math.min((s.v/s.lim)*100,120):null;
  return(
    <div className="gcard lift" style={{padding:"12px 14px",
      background:s.ok?`${C.green}06`:`${C.red}08`,
      border:`1px solid ${s.ok?C.b1:C.red+"30"}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,alignItems:"center"}}>
        <span style={{fontSize:9,color:C.text3,display:"flex",alignItems:"center",gap:4}}>
          <I size={10} color={c}/>{m.l}
        </span>
        {!isFlow&&(
          <span style={{fontSize:8,padding:"1px 5px",borderRadius:3,
            background:s.ok?`${C.green}20`:`${C.red}20`,
            color:s.ok?C.green:C.red,fontWeight:700}}>
            {s.ok?"PASS":"FAIL"}
          </span>
        )}
      </div>
      <div className="mono" style={{fontSize:22,fontWeight:700,color:c,lineHeight:1}}>
        {s.v}
        <span style={{fontSize:9,color:C.text3,marginLeft:3,fontWeight:400}}>{s.u}</span>
      </div>
      <div style={{fontSize:8,color:C.text3,marginTop:5}}>
        Limit: {s.limTxt} · CPCB STP Std
      </div>
      {pctFill!==null&&(
        <div style={{marginTop:8,height:3,background:C.b1,borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${Math.min(pctFill,100)}%`,
            background:pctFill>100?C.red:pctFill>80?C.amber:c,
            borderRadius:2,transition:"width .6s ease"}}/>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PLANT DETAIL — shared by operator & officer drill
═══════════════════════════════════════════════════════════ */
function PlantDetailView({p}){
  const violations=Object.entries(p.sensors).filter(([,s])=>!s.ok).length;
  return(
    <div className="fi">
      {/* Header KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:16}}>
        <KCard label="Inflow Today"    val={p.inflow}    unit="MLD"    acc={C.cyan}   Icon={Droplets}   delay={0}/>
        <KCard label="Treated Today"   val={p.treated}   unit="MLD"    acc={C.green}  Icon={CheckCircle} delay={.03}/>
        <KCard label="Recovered"       val={p.recovered} unit="MLD"    acc="#00B4D8"  Icon={RotateCcw}  delay={.06}/>
        <KCard label="Discharged"      val={p.discharged}unit="MLD"    acc={C.text3}  Icon={Waves}      delay={.09}/>
        <KCard label="Recovery Rate"   val={p.recovery}  unit="%"
          acc={p.recovery>=50?C.green:C.amber} Icon={TrendingUp}
          note="Target: 55% (2027-28)" delay={.12}/>
        <KCard label="EUR Eligible"    val={p.eurCrL}    unit="Cr L/day"
          acc={C.purple} Icon={BadgeCheck}
          note={`₹${p.eurRevAnnualCr} Cr/yr`} delay={.15}/>
      </div>

      {/* Sensors */}
      <SLabel mt={4}>Live Sensor Readings — CPCB STP Standards
        {violations>0&&<span style={{fontSize:9,background:C.red,color:"#fff",
          padding:"2px 8px",borderRadius:10,fontWeight:700}}>{violations} BREACH{violations>1?"ES":""}</span>}
      </SLabel>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:7,marginBottom:16}}>
        {Object.entries(p.sensors).map(([k,s])=><SensorCard key={k} k={k} s={s}/>)}
      </div>

      {/* Charts row 1 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <CChart title="Inflow vs Treated — 14 Days (MLD)"
          legend={[{l:"Inflow",c:C.cyan},{l:"Treated",c:C.green}]}>
          <AreaChart data={p.trend}>
            <defs>
              <linearGradient id={`ai${p.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.cyan} stopOpacity={.3}/>
                <stop offset="100%" stopColor={C.cyan} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id={`at${p.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.green} stopOpacity={.25}/>
                <stop offset="100%" stopColor={C.green} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke={C.b1}/>
            <XAxis dataKey="d" tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <Area type="monotone" dataKey="inflow"  stroke={C.cyan}  fill={`url(#ai${p.id})`} strokeWidth={2} dot={false} name="Inflow"/>
            <Area type="monotone" dataKey="treated" stroke={C.green} fill={`url(#at${p.id})`} strokeWidth={2} dot={false} name="Treated"/>
          </AreaChart>
        </CChart>

        <CChart title="BOD & COD Trend — 14 Days (mg/L)"
          legend={[{l:"BOD",c:C.purple},{l:"COD",c:C.amber},{l:"BOD Limit 10",c:C.red}]}>
          <ComposedChart data={p.trend}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.b1}/>
            <XAxis dataKey="d" tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <ReferenceLine y={10} stroke={C.red} strokeDasharray="4 2" strokeWidth={1}
              label={{value:"BOD Limit",fill:C.red,fontSize:8,position:"insideTopRight"}}/>
            <Line type="monotone" dataKey="bod" stroke={C.purple} dot={false} strokeWidth={2} name="BOD"/>
            <Line type="monotone" dataKey="cod" stroke={C.amber}  dot={false} strokeWidth={2} name="COD"/>
          </ComposedChart>
        </CChart>
      </div>

      {/* Charts row 2 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <CChart title="Recovery Rate % — 14 Days vs LWMR 2024 Targets"
          legend={[{l:"Recovery %",c:C.cyan},{l:"2027-28 Target 55%",c:C.red}]}>
          <AreaChart data={p.trend}>
            <defs>
              <linearGradient id={`ar${p.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.cyan} stopOpacity={.25}/>
                <stop offset="100%" stopColor={C.cyan} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke={C.b1}/>
            <XAxis dataKey="d" tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <YAxis domain={[44,58]} tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <ReferenceLine y={55} stroke={C.red} strokeDasharray="4 2" strokeWidth={1}/>
            <Area type="monotone" dataKey="recovery" stroke={C.cyan}
              fill={`url(#ar${p.id})`} strokeWidth={2} dot={false} name="Recovery %"/>
          </AreaChart>
        </CChart>

        {/* Sludge & By-products */}
        <div className="gcard" style={{padding:"14px 16px",background:C.card,border:`1px solid ${C.b1}`}}>
          <div style={{fontSize:11,fontWeight:600,color:C.text2,marginBottom:14}}>Sludge &amp; By-Product Summary (MTD)</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {[
              {l:"Sludge Generated",   v:p.sludge,  u:"T",    c:C.text3,  I:Database},
              {l:"Organic Manure",     v:p.manure,  u:"T",    c:C.green,  I:Leaf},
              {l:"Biogas Produced",    v:p.biogas,  u:"T",    c:C.amber,  I:Flame},
              {l:"EUR Vol Eligible",   v:p.eurCrL,  u:"Cr L", c:C.purple, I:BadgeCheck},
              {l:"EUR Revenue/Day",    v:`₹${p.eurRevDay.toLocaleString('en-IN')}`,u:"",c:C.cyan,I:TrendingUp},
              {l:"Annual EUR Rev.",    v:`₹${p.eurRevAnnualCr}`,u:"Cr",  c:C.cyan,  I:Award},
            ].map(r=>{
              const Ic=r.I;
              return(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"6px 10px",background:`${r.c}08`,
                  borderRadius:8,border:`1px solid ${r.c}18`}}>
                  <span style={{fontSize:10,color:C.text3,display:"flex",alignItems:"center",gap:6}}>
                    <Ic size={11} color={r.c}/>{r.l}
                  </span>
                  <span className="mono" style={{fontSize:13,fontWeight:600,color:r.c}}>
                    {r.v}<span style={{fontSize:9,color:C.text3,marginLeft:2}}>{r.u}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:10,fontSize:9,color:C.text3,padding:"6px 10px",
            background:C.b1,borderRadius:6,lineHeight:1.5}}>
            EUR formula (LWMR 2024): 1L inflow = 1 EUR certificate.
            ₹0.001/L est. rate. Pirana: largest EUR source in Ahmedabad.
          </div>
        </div>
      </div>

      {/* Compliance Scorecard */}
      <SLabel>LWMR 2024 Plant Compliance Scorecard</SLabel>
      <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,
        padding:"14px 16px",marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12}}>
          {p.compliance.map(c=>(
            <div key={c.l} style={{background:`${ST[c.s]?.bg||C.s2}`,
              border:`1px solid ${ST[c.s]?.br||C.b1}`,borderRadius:9,
              padding:"9px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,color:C.text2,fontWeight:500}}>{c.l}</span>
              <Pill s={c.s} sm/>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{background:C.s2,borderRadius:8,padding:"8px 12px",fontSize:10}}>
            <span style={{color:C.text3}}>Discharge Point: </span>
            <strong style={{color:C.text}}>{p.discharge}</strong>
          </div>
          <div style={{background:C.s2,borderRadius:8,padding:"8px 12px",fontSize:10}}>
            <span style={{color:C.text3}}>CTO: </span>
            <strong style={{color:C.text,fontSize:9}}>{p.cto} — Valid {p.ctoValid}</strong>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {p.alerts.length>0?(
        <>
          <SLabel>Plant Alerts ({p.alerts.length})</SLabel>
          {p.alerts.map((a,i)=><ARow key={i} {...a}/>)}
        </>
      ):(
        <div style={{background:`${C.green}10`,border:`1px solid ${C.green}25`,
          borderRadius:10,padding:"10px 14px",display:"flex",gap:8,alignItems:"center"}}>
          <CheckCircle size={14} color={C.green}/>
          <span style={{fontSize:11,color:C.green}}>All CPCB parameters within limits. No active alerts.</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
function HomePage({onSelect}){
  const ROLES=[
    {id:"manager",Icon:LayoutDashboard,c:C.cyan,badge:"MANAGEMENT",
     title:"Operations Manager",
     desc:"Portfolio-wide command centre. Multi-plant KPIs, EUR revenue tracking, recovery rate monitoring, CPCB deadline management, and aggregated alerts across all 3 plants.",
     feats:["Portfolio KPIs","EUR Revenue Monitor","Recovery Tracker","Deadline Management","Multi-Plant Alerts","Plant Drill-Down"]},
    {id:"operator",Icon:Factory,c:C.green,badge:"PLANT OPERATIONS",
     title:"Plant Operator",
     desc:"Per-plant operations dashboard. Live SCADA/IoT sensor readings with CPCB limit monitoring, inflow/treated/recovery charts, sludge tracking, and manual data entry.",
     feats:["Live SCADA / IoT Feeds","7 Sensor Parameters","BOD · COD · pH · TSS · E.coli","Inflow & Recovery Charts","Manual Entry Form","LWMR Compliance Card"]},
    {id:"officer",Icon:Shield,c:C.amber,badge:"REGULATORY",
     title:"Govt. Officer (GPCB/CPCB)",
     desc:"Read-only regulatory inspection view. CPCB submission history, water quality violation register, annual return tracking, Environmental Compensation ledger, and per-plant audit readiness.",
     feats:["Submission History","Violation Register","GPCB Annual Returns","Env. Comp. Ledger","Inspection Readiness","CTO Tracker"]},
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,overflow:"hidden"}}>
      {/* Ambient glow bg */}
      <div style={{position:"fixed",top:-200,left:-200,width:600,height:600,borderRadius:"50%",
        background:`radial-gradient(${C.cyan}10,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:-200,right:-100,width:500,height:500,borderRadius:"50%",
        background:`radial-gradient(${C.green}08,transparent 70%)`,pointerEvents:"none"}}/>

      {/* Topnav */}
      <div style={{background:`${C.s1}CC`,borderBottom:`1px solid ${C.b1}`,
        padding:"0 32px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",
        backdropFilter:"blur(10px)",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,borderRadius:12,
            background:`linear-gradient(135deg,${C.cyan},${C.green})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:`0 4px 16px ${C.cyan}40`}}>
            <Droplets size={20} color="#fff" strokeWidth={2.5}/>
          </div>
          <div>
            <div className="display" style={{fontWeight:900,fontSize:18,
              letterSpacing:"-0.5px",lineHeight:1}}>
              <span className="grad-text">AquaComply</span>
            </div>
            <div style={{fontSize:9,color:C.text3,letterSpacing:".1em",marginTop:1}}>
              MULTI-PLANT LWMR 2024 COMPLIANCE PLATFORM
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,fontSize:10,color:C.text3}}>
          <span>Logicrest Technologies · Awatech Solutions / DNP</span>
          <span style={{background:C.b1,padding:"2px 8px",borderRadius:4,fontSize:9,
            color:C.cyan,fontWeight:700}}>PHASE 1 · BETA</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{textAlign:"center",padding:"60px 24px 44px",position:"relative"}}>
        <div className="ri" style={{display:"inline-flex",alignItems:"center",gap:8,
          background:`${C.green}12`,border:`1px solid ${C.green}30`,
          borderRadius:20,padding:"5px 16px",marginBottom:24,fontSize:10,color:C.green}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.green,
            display:"inline-block",animation:"dot-pulse 2s infinite"}}/>
          3 Plants Active · 252.4 MLD Treated Today · ₹8.79 Cr EUR Revenue/Year
        </div>
        <h1 className="display ri" style={{fontWeight:900,fontSize:46,color:C.text,
          letterSpacing:"-1.5px",lineHeight:1.05,marginBottom:16,animationDelay:".05s"}}>
          Multi-Plant Compliance &<br/>
          <span className="grad-text">Operations Command Centre</span>
        </h1>
        <p className="ri" style={{fontSize:13,color:C.text3,maxWidth:560,margin:"0 auto 8px",
          lineHeight:1.75,animationDelay:".1s"}}>
          Purpose-built for STP operators under <strong style={{color:C.text}}>LWMR 2024</strong>
          &nbsp;(Gazette No. 3982 · Oct 7, 2024 · Effective Oct 1, 2025).
          SCADA + IoT + Manual data in one unified platform.
        </p>

        {/* Live stats ticker */}
        <div className="ri" style={{display:"flex",justifyContent:"center",gap:0,
          marginTop:32,marginBottom:4,animationDelay:".15s"}}>
          {[
            {l:"Total Inflow",v:"252.4",u:"MLD",c:C.cyan},
            {l:"Total Treated",v:"242.1",u:"MLD",c:C.green},
            {l:"EUR Revenue",v:"₹8.79",u:"Cr/yr",c:C.purple},
            {l:"Compliance",v:"67",u:"%",c:C.amber},
            {l:"Active Alerts",v:"6",u:"",c:C.red},
          ].map((s,i)=>(
            <div key={s.l} style={{padding:"14px 28px",borderRight:i<4?`1px solid ${C.b1}`:"none",
              textAlign:"center",background:i%2===0?`${C.s2}80`:"transparent"}}>
              <div className="mono" style={{fontSize:22,fontWeight:700,color:s.c}}>
                {s.v}<span style={{fontSize:11,color:C.text3,marginLeft:3}}>{s.u}</span>
              </div>
              <div style={{fontSize:9,color:C.text3,marginTop:3,letterSpacing:".06em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,
        maxWidth:1020,margin:"0 auto",padding:"0 28px 60px"}}>
        {ROLES.map((r,i)=>{
          const Icon=r.Icon;
          return(
            <div key={r.id} className="ri lift"
              onClick={()=>onSelect(r.id)}
              style={{background:`linear-gradient(135deg,${r.c}10 0%,${C.s2} 100%)`,
                border:`1px solid ${r.c}25`,borderRadius:16,padding:26,cursor:"pointer",
                animationDelay:`${i*.08+.2}s`,position:"relative",overflow:"hidden"}}>
              {/* BG accent circle */}
              <div style={{position:"absolute",bottom:-50,right:-50,width:150,height:150,
                borderRadius:"50%",background:`${r.c}06`,pointerEvents:"none"}}/>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div style={{width:46,height:46,borderRadius:13,
                  background:`${r.c}18`,border:`1px solid ${r.c}35`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  boxShadow:`0 0 20px ${r.c}20`}}>
                  <Icon size={22} color={r.c}/>
                </div>
                <span style={{fontSize:8,background:`${r.c}20`,color:r.c,
                  padding:"3px 9px",borderRadius:4,fontWeight:800,letterSpacing:".1em"}}>{r.badge}</span>
              </div>

              <div className="display" style={{fontWeight:800,fontSize:16,color:C.text,marginBottom:8}}>{r.title}</div>
              <p style={{fontSize:11,color:C.text3,lineHeight:1.7,marginBottom:18}}>{r.desc}</p>

              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:20}}>
                {r.feats.map(f=>(
                  <span key={f} style={{fontSize:9,color:r.c,background:`${r.c}12`,
                    padding:"2px 8px",borderRadius:4,fontWeight:600,border:`1px solid ${r.c}20`}}>
                    {f}
                  </span>
                ))}
              </div>

              <div style={{display:"flex",alignItems:"center",gap:6,color:r.c,fontWeight:700,fontSize:12,
                borderTop:`1px solid ${r.c}20`,paddingTop:14}}>
                <span>Enter Dashboard</span>
                <ArrowRight size={14}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{borderTop:`1px solid ${C.b1}`,padding:"10px 32px",
        display:"flex",justifyContent:"space-between",fontSize:9,color:C.text3}}>
        <span>Regulatory framework: LWMR 2024 · Gazette No. 3982 · MoEFCC, Government of India</span>
        <span>AquaComply v1.0 · CONFIDENTIAL — Logicrest Technologies Pvt. Ltd.</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MANAGER DASHBOARD
═══════════════════════════════════════════════════════════ */
function ManagerDash({onBack,onDrill}){
  const allAlerts=PLANTS.flatMap(p=>p.alerts.map(a=>({...a,sh:p.short,pid:p.id})));
  const portTrend=D14.map((_,i)=>({
    d:D14[i],
    pirana:PLANTS[0].trend[i].inflow,
    vadaj:PLANTS[1].trend[i].inflow,
    odhav:PLANTS[2].trend[i].inflow,
  }));
  const recBar=[
    {n:"Pirana",v:51.2,fill:C.cyan},
    {n:"Vadaj",v:48.6,fill:C.amber},
    {n:"Odhav",v:52.8,fill:C.green},
  ];
  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <Topbar title="Operations Manager Dashboard" role="Manager" rc={C.cyan}
        onBack={onBack} onLogout={onBack}
        sub="Awatech / DNP · Ahmedabad Portfolio"/>
      <DeadlineBanner/>
      <div style={{padding:"18px 22px 28px",maxWidth:1440}}>
        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:9,marginBottom:18}}>
          <KCard label="Total Inflow Today"    val="252.4"  unit="MLD"    acc={C.cyan}   Icon={Droplets}  sub="3 plants combined" delay={0}/>
          <KCard label="Total Treated Today"   val="242.1"  unit="MLD"    acc={C.green}  Icon={CheckCircle} sub="Across all plants" delay={.04}/>
          <KCard label="EUR Certs Eligible"    val="25.24"  unit="Cr L/day" acc={C.purple} Icon={BadgeCheck} sub="₹25,240/day est." note="@₹0.001/litre (LWMR 2024)" delay={.08}/>
          <KCard label="Annual EUR Revenue"    val="₹8.79"  unit="Cr/yr"  acc={C.cyan}   Icon={Award}     sub="Combined portfolio" delay={.12}/>
          <KCard label="Sludge Generated MTD"  val="202.5"  unit="T"      acc={C.amber}  Icon={Leaf}      sub="Manure + biogas + disposed" delay={.16}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"400px 1fr",gap:14}}>
          {/* Left — Plant cards */}
          <div>
            <SLabel>Plant Portfolio — Live Status</SLabel>
            {PLANTS.map(p=>(
              <div key={p.id} className="gcard lift fi"
                onClick={()=>onDrill(p.id)}
                style={{marginBottom:10,padding:16,cursor:"pointer",
                  background:`linear-gradient(135deg,${ST[p.status]?.bg||C.s2} 0%,${C.card} 100%)`,
                  border:`1px solid ${ST[p.status]?.br||C.b1}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div className="display" style={{fontWeight:800,fontSize:14,color:C.text}}>{p.name}</div>
                    <div style={{fontSize:9,color:C.text3,marginTop:2}}>
                      {p.loc} · {p.capacity} MLD · {p.discharge}
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <Pill s={p.status}/><br/>
                    <span className="mono" style={{fontSize:8,color:C.text3}}>sync {p.sync}</span>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
                  {[
                    {l:"Inflow",v:p.inflow,u:"MLD",c:C.cyan},
                    {l:"Treated",v:p.treated,u:"MLD",c:C.green},
                    {l:"Recovery",v:p.recovery,u:"%",c:p.recovery>=50?C.green:C.amber},
                    {l:"EUR",v:p.eurCrL,u:"Cr L",c:C.purple},
                  ].map(m=>(
                    <div key={m.l} style={{background:`${C.bg}80`,borderRadius:7,padding:"7px 9px",
                      border:`1px solid ${m.c}15`}}>
                      <div style={{fontSize:8,color:C.text3,marginBottom:3}}>{m.l}</div>
                      <div className="mono" style={{fontSize:14,fontWeight:700,color:m.c}}>
                        {m.v}<span style={{fontSize:8,color:C.text3,marginLeft:2}}>{m.u}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:5}}>
                    {[
                      {l:"SCADA",v:p.scada},{l:"IoT",v:p.iot},{l:"FORM 2A",v:true},
                    ].map(t=>(
                      <span key={t.l} style={{fontSize:8,padding:"2px 6px",borderRadius:3,
                        background:t.v?`${C.green}15`:C.b1,
                        color:t.v?C.green:C.text3,fontWeight:600}}>
                        {t.l} {t.v?"✓":"✗"}
                      </span>
                    ))}
                  </div>
                  <span style={{fontSize:10,color:C.cyan,fontWeight:700,
                    display:"flex",alignItems:"center",gap:3}}>
                    Drill Down <ChevronRight size={11}/>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right — charts + alerts */}
          <div>
            <CChart title="Plant-wise Daily Inflow — March 2026 (MLD)"
              legend={[{l:"Pirana 200MLD",c:C.cyan},{l:"Vadaj 50MLD",c:C.amber},{l:"Odhav 30MLD",c:C.green}]}
              h={165}>
              <LineChart data={portTrend}>
                <CartesianGrid strokeDasharray="2 4" stroke={C.b1}/>
                <XAxis dataKey="d" tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.text3,fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip content={<TT/>}/>
                <Line type="monotone" dataKey="pirana" stroke={C.cyan}  dot={false} strokeWidth={2.5} name="Pirana"/>
                <Line type="monotone" dataKey="vadaj"  stroke={C.amber} dot={false} strokeWidth={2}   name="Vadaj"/>
                <Line type="monotone" dataKey="odhav"  stroke={C.green} dot={false} strokeWidth={2}   name="Odhav"/>
              </LineChart>
            </CChart>

            <div style={{height:10}}/>

            {/* Recovery bars */}
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:600,color:C.text2,marginBottom:14}}>
                Recovery Rate vs LWMR 2024 Table 3 — Current vs Targets
              </div>
              {recBar.map(r=>(
                <div key={r.n} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:11,color:C.text,fontWeight:600}}>{r.n} STP</span>
                    <div style={{display:"flex",gap:12}}>
                      {[{y:"Now",v:r.v,c:r.fill},{y:"2027-28",v:55,c:"#EF444460"},{y:"2029-30",v:65,c:"#EF444440"}].map(t=>(
                        <span key={t.y} className="mono" style={{fontSize:10,color:t.c}}>
                          {t.y}: {t.v}%
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{position:"relative",height:8,background:C.b1,borderRadius:4,overflow:"visible"}}>
                    <div style={{height:"100%",width:`${(r.v/70)*100}%`,background:r.fill,
                      borderRadius:4,boxShadow:`0 0 10px ${r.fill}`,transition:"width .7s ease"}}/>
                    {/* Target markers */}
                    {[55,60,65].map((tgt,ti)=>(
                      <div key={tgt} style={{position:"absolute",top:-2,
                        left:`${(tgt/70)*100}%`,width:2,height:12,
                        background:["#FF4545","#FF7070","#FFA0A0"][ti],borderRadius:1}}/>
                    ))}
                  </div>
                  <div style={{fontSize:8,color:C.text3,marginTop:4}}>
                    55% (2027-28) → 60% (2028-29) → 65% (2029-30 onwards) — LWMR 2024 Table 3
                  </div>
                </div>
              ))}
            </div>

            <SLabel action={
              <span className="mono" style={{fontSize:9,color:C.red,fontWeight:700}}>
                {allAlerts.filter(a=>a.t==="critical").length} CRITICAL
              </span>
            }>Active Alerts ({allAlerts.length})</SLabel>
            <div style={{maxHeight:220,overflowY:"auto"}}>
              {allAlerts.slice(0,7).map((a,i)=>(
                <ARow key={i} t={a.t} m={`[${a.sh}] ${a.m}`} tm={a.tm}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   OPERATOR DASHBOARD
═══════════════════════════════════════════════════════════ */
function OperatorDash({onBack,initPlant=0}){
  const [pid,setPid]=useState(initPlant);
  const p=PLANTS[pid];
  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <Topbar title="Plant Operator Dashboard" role="Operator" rc={C.green}
        onBack={onBack} onLogout={onBack} sub={p.name}/>
      <DeadlineBanner/>

      {/* Plant switcher */}
      <div style={{background:`${C.s1}CC`,borderBottom:`1px solid ${C.b1}`,
        padding:"0 22px",display:"flex",gap:2,backdropFilter:"blur(8px)"}}>
        {PLANTS.map(pl=>{
          const active=pid===pl.id;
          return(
            <button key={pl.id} onClick={()=>setPid(pl.id)}
              style={{padding:"10px 18px",background:active?`${C.green}12`:"none",
                border:"none",borderBottom:active?`2px solid ${C.green}`:"2px solid transparent",
                color:active?C.green:C.text3,fontSize:11,fontWeight:active?700:400,
                cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",
                gap:7,transition:"all .15s",letterSpacing:"-.1px"}}>
              <span style={{width:7,height:7,borderRadius:"50%",
                background:ST[pl.status]?.dot||C.text3,display:"inline-block",
                animation:pl.status==="online"?"dot-pulse 2s infinite":"none"}}/>
              {pl.name}
              <span style={{fontSize:9,opacity:.6,fontWeight:400}}>{pl.capacity}MLD</span>
              {pl.alerts.some(a=>a.t==="critical")&&(
                <span style={{width:6,height:6,borderRadius:"50%",background:C.red,
                  display:"inline-block",boxShadow:`0 0 8px ${C.red}`}}/>
              )}
            </button>
          );
        })}
      </div>

      <div style={{padding:"18px 22px 30px",maxWidth:1440}}>
        {/* Plant identity bar */}
        <div className="fi" style={{display:"flex",justifyContent:"space-between",
          alignItems:"center",marginBottom:16,padding:"12px 16px",
          background:C.card,border:`1px solid ${C.b1}`,borderRadius:12}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="display" style={{fontWeight:900,fontSize:20,color:C.text,letterSpacing:"-.4px"}}>{p.name}</div>
              <Pill s={p.status}/>
            </div>
            <div style={{fontSize:10,color:C.text3,marginTop:3}}>
              {p.loc} · Design Capacity: <strong style={{color:C.text}}>{p.capacity} MLD</strong>
              · Discharge: <strong style={{color:C.text}}>{p.discharge}</strong>
              · <strong style={{color:C.text}}>{p.cto}</strong> valid till {p.ctoValid}
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {[
              {l:"SCADA",v:p.scada,c:C.green},
              {l:"IoT",v:p.iot,c:C.green},
              {l:"FORM 2(A)",v:true,c:C.cyan},
              {l:`Sync: ${p.sync}`,v:true,c:C.text3},
            ].map(t=>(
              <span key={t.l} style={{fontSize:9,padding:"3px 9px",borderRadius:5,fontWeight:700,
                background:t.v?`${t.c}18`:C.b1,color:t.v?t.c:C.text3,
                border:`1px solid ${t.v?t.c+"25":C.b1}`}}>
                {t.l}
              </span>
            ))}
          </div>
        </div>

        <PlantDetailView p={p}/>

        {/* Manual Entry */}
        <div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 360px",gap:12}}>
          <div/>
          <div>
            <SLabel>Manual Data Entry (LWMR 2024 §5.4)</SLabel>
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,padding:16}}>
              <div style={{fontSize:10,color:C.text3,marginBottom:14,lineHeight:1.65,
                padding:"8px 10px",background:C.s2,borderRadius:8}}>
                For parameters not covered by SCADA/IoT. All entries timestamped, 
                operator-tagged, and immutable once submitted. Required for CPCB monthly report.
              </div>
              {[
                {l:"Wastewater Treated (MLD)",p:`e.g. ${p.treated}`},
                {l:"Recovered / Reused Volume (MLD)",p:`e.g. ${p.recovered}`},
                {l:"Sludge Generated (Tonnes)",p:`e.g. ${p.sludge}`},
                {l:"Organic Manure Produced (T)",p:`e.g. ${p.manure}`},
                {l:"Biogas Produced (T)",p:`e.g. ${p.biogas}`},
                {l:"Date of Reading",p:"23/03/2026",type:"date"},
              ].map(f=>(
                <div key={f.l} style={{marginBottom:10}}>
                  <label style={{fontSize:9,color:C.text3,fontWeight:700,display:"block",
                    marginBottom:4,letterSpacing:".05em"}}>{f.l}</label>
                  <input type={f.type||"text"} placeholder={f.p}
                    style={{width:"100%",background:C.s2,border:`1px solid ${C.b2}`,
                      borderRadius:8,padding:"8px 11px",color:C.text,fontSize:11}}/>
                </div>
              ))}
              <button style={{width:"100%",background:`linear-gradient(135deg,${C.green},#047857)`,
                color:"#fff",border:"none",borderRadius:9,padding:"11px",fontSize:12,
                fontWeight:800,cursor:"pointer",marginTop:4,letterSpacing:".02em",
                boxShadow:`0 4px 16px ${C.green}30`}}>
                ✓ Submit to CPCB Monthly Report
              </button>
              <div style={{marginTop:8,fontSize:9,color:C.text3,textAlign:"center"}}>
                Logged with operator ID + plant ID + UTC timestamp. Immutable post-submit.
              </div>
            </div>

            {/* Reporting period tracker */}
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,
              padding:16,marginTop:10}}>
              <SLabel>Reporting Deadlines</SLabel>
              {[
                {l:"CPCB Monthly (7 Apr 2026)",v:"15 days",c:C.amber,st:p.submission},
                {l:"GPCB Annual Return (30 Jun 2026)",v:"99 days",c:C.cyan,st:null},
                {l:"GPCB Audit (30 Sep 2026)",v:"191 days",c:C.text3,st:null},
              ].map((r,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"8px 11px",
                  background:`${r.c}08`,border:`1px solid ${r.c}18`,
                  borderRadius:8,marginBottom:6}}>
                  <span style={{fontSize:10,color:C.text2}}>{r.l}</span>
                  {r.st?<Pill s={r.st} sm/>:
                    <span className="mono" style={{fontSize:12,fontWeight:700,color:r.c}}>{r.v}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   OFFICER DASHBOARD
═══════════════════════════════════════════════════════════ */
function OfficerDash({onBack}){
  const [tab,setTab]=useState("overview");
  const [drillPid,setDrillPid]=useState(null);

  const TABS=[
    {id:"overview",l:"Overview",I:LayoutDashboard},
    {id:"submissions",l:"CPCB Submissions",I:FileText},
    {id:"violations",l:"Violations",I:AlertOctagon},
    {id:"returns",l:"Annual Returns",I:Calendar},
    {id:"plants",l:"Plant Profiles",I:Factory},
  ];

  const history=[
    {m:"Feb 2026",p:"✓ Feb 6",v:"✓ Feb 7",o:"✓ Feb 5",ok:2},
    {m:"Jan 2026",p:"✓ Jan 7",v:"⚠ Late (Jan 9) — Env.Comp. ₹1L",o:"✓ Jan 6",ok:1},
    {m:"Dec 2025",p:"✓ Dec 6",v:"✓ Dec 7",o:"✓ Dec 7",ok:2},
    {m:"Nov 2025",p:"✓ Nov 6",v:"✓ Nov 7",o:"✓ Nov 6",ok:2},
    {m:"Oct 2025",p:"✓ Oct 7",v:"✗ MISSED — Env.Comp. ₹1.2L",o:"✓ Oct 6",ok:0},
  ];

  const violations=[
    {dt:"23 Mar 2026",pl:"Vadaj",param:"BOD",     r:"18.7 mg/L",  lim:"≤10 mg/L",   sev:"critical",action:"Pending",  sec:"EPA §15"},
    {dt:"23 Mar 2026",pl:"Vadaj",param:"E.coli",  r:"2400 MPN",   lim:"≤1000 MPN",  sev:"critical",action:"Pending",  sec:"EPA §15"},
    {dt:"23 Mar 2026",pl:"Vadaj",param:"pH",       r:"8.9",        lim:"6.5–8.5",    sev:"critical",action:"Pending",  sec:"LWMR 2024"},
    {dt:"23 Mar 2026",pl:"Vadaj",param:"TSS",      r:"42.3 mg/L",  lim:"≤30 mg/L",   sev:"warning", action:"Monitoring",sec:"LWMR 2024"},
    {dt:"15 Jan 2026",pl:"Vadaj",param:"BOD",      r:"14.2 mg/L",  lim:"≤10 mg/L",   sev:"warning", action:"Resolved",  sec:"EPA §15"},
    {dt:"09 Jan 2026",pl:"Vadaj",param:"Submission",r:"Late 2 days",lim:"By 7th",    sev:"warning", action:"₹1L Env.Comp",sec:"LWMR §3"},
    {dt:"07 Oct 2025",pl:"Vadaj",param:"Submission",r:"Not filed",  lim:"By 7th",    sev:"critical",action:"₹1.2L Penalty",sec:"Polluter Pays"},
  ];

  if(drillPid!==null){
    const p=PLANTS[drillPid];
    return(
      <div style={{minHeight:"100vh",background:C.bg}}>
        <Topbar title={`GPCB Inspection View — ${p.name}`} role="Gov. Officer" rc={C.amber}
          onBack={()=>setDrillPid(null)} onLogout={onBack}/>
        <DeadlineBanner/>
        <div style={{padding:"18px 22px 30px",maxWidth:1440}}>
          <div className="fi" style={{display:"flex",justifyContent:"space-between",
            alignItems:"center",marginBottom:16,padding:"12px 16px",
            background:`${C.amber}08`,border:`1px solid ${C.amber}20`,borderRadius:12}}>
            <div>
              <div className="display" style={{fontWeight:800,fontSize:18,color:C.text}}>{p.name}</div>
              <div style={{fontSize:10,color:C.text3,marginTop:2}}>
                {p.loc} · {p.capacity} MLD · {p.discharge} · {p.cto} valid {p.ctoValid}
              </div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Pill s={p.status}/>
              <span style={{fontSize:10,color:C.amber,fontWeight:600}}>READ-ONLY VIEW</span>
            </div>
          </div>
          <PlantDetailView p={p}/>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <Topbar title="Government Officer — GPCB / CPCB" role="Gov. Officer" rc={C.amber}
        onBack={onBack} onLogout={onBack}/>
      <DeadlineBanner/>

      {/* Tabs */}
      <div style={{background:`${C.s1}CC`,borderBottom:`1px solid ${C.b1}`,
        padding:"0 22px",display:"flex",gap:2,backdropFilter:"blur(8px)"}}>
        {TABS.map(t=>{
          const active=tab===t.id;const I=t.I;
          return(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:"10px 16px",background:active?`${C.amber}10`:"none",
                border:"none",borderBottom:active?`2px solid ${C.amber}`:"2px solid transparent",
                color:active?C.amber:C.text3,fontSize:11,fontWeight:active?700:400,
                cursor:"pointer",whiteSpace:"nowrap",display:"flex",
                alignItems:"center",gap:5,transition:"all .15s"}}>
              <I size={12}/>{t.l}
            </button>
          );
        })}
      </div>

      <div style={{padding:"18px 22px 30px",maxWidth:1440}}>

        {/* ─── OVERVIEW ─── */}
        {tab==="overview"&&(
          <div className="fi">
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:9,marginBottom:18}}>
              <KCard label="Plants Under Review"  val={3}     unit=""  acc={C.cyan}  Icon={Factory}     sub="Ahmedabad portfolio" delay={0}/>
              <KCard label="Active Violations"    val={4}     unit=""  acc={C.red}   Icon={AlertOctagon} sub="Vadaj STP — 4 params" delay={.04}/>
              <KCard label="Pending Submissions"  val={1}     unit=""  acc={C.amber} Icon={Clock}        sub="Vadaj — 15 days left" delay={.08}/>
              <KCard label="CTO Expiring"         val={1}     unit=""  acc={C.orange}Icon={Siren}        sub="Vadaj CTO — Mar 2026" delay={.12}/>
              <KCard label="Portfolio Compliance" val="67"    unit="%" acc={C.green} Icon={Shield}       sub="2 of 3 plants compliant" delay={.16}/>
            </div>

            <SLabel>Plant Compliance Matrix — LWMR 2024</SLabel>
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,overflow:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.b1}`}}>
                    {["Plant","Capacity","Status","CPCB Submission","Water Quality","Recovery","EUR Volume","CTO","Violations"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:9,
                        color:C.text3,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",
                        background:C.s2}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLANTS.map((p,i)=>(
                    <tr key={p.id} className="trow"
                      style={{borderBottom:i<PLANTS.length-1?`1px solid ${C.b1}`:"none"}}>
                      <td style={{padding:"11px 14px"}}>
                        <div className="display" style={{fontWeight:800,fontSize:12,color:C.text}}>{p.name}</div>
                        <div style={{fontSize:9,color:C.text3}}>{p.loc}</div>
                      </td>
                      <td style={{padding:"11px 14px"}}><span className="mono" style={{fontSize:11,color:C.text3}}>{p.capacity} MLD</span></td>
                      <td style={{padding:"11px 14px"}}><Pill s={p.status} sm/></td>
                      <td style={{padding:"11px 14px"}}><Pill s={p.submission} sm/></td>
                      <td style={{padding:"11px 14px"}}>
                        <Pill s={p.compliance.find(c=>c.l.includes("Water"))?.s||"pending"} sm/>
                      </td>
                      <td style={{padding:"11px 14px"}}>
                        <span className="mono" style={{fontSize:11,color:p.recovery>=50?C.green:C.amber}}>
                          {p.recovery}%
                        </span>
                      </td>
                      <td style={{padding:"11px 14px"}}>
                        <span className="mono" style={{fontSize:11,color:C.purple}}>{p.eurCrL} Cr L</span>
                      </td>
                      <td style={{padding:"11px 14px"}}>
                        <Pill s={p.compliance.find(c=>c.l.includes("CTO"))?.s||"valid"} sm/>
                      </td>
                      <td style={{padding:"11px 14px"}}>
                        <span className="mono" style={{color:p.alerts.filter(a=>a.t==="critical").length>0?C.red:C.green,fontWeight:700,fontSize:11}}>
                          {p.alerts.filter(a=>a.t==="critical").length} critical
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Risk box */}
            <div style={{background:`${C.red}08`,border:`1px solid ${C.red}30`,
              borderRadius:12,padding:"16px 18px",
              boxShadow:`0 0 30px ${C.red}08`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${C.red}20`,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <AlertOctagon size={20} color={C.red}/>
                </div>
                <div>
                  <div className="display" style={{fontSize:13,fontWeight:800,color:C.red,marginBottom:6}}>
                    ⚠ REGULATORY RISK NOTICE — VADAJ STP
                  </div>
                  <div style={{fontSize:11,color:"#FCA5A5",lineHeight:1.85}}>
                    <strong>4 active CPCB standard breaches</strong> detected in real time:
                    BOD 18.7 mg/L (limit ≤10), E.coli 2400 MPN (limit ≤1000), pH 8.9 (range 6.5–8.5), TSS 42.3 mg/L (limit ≤30).
                    Under <strong>EPA 1986 §15–15F</strong>, water quality violations at a discharge point attract
                    <strong> criminal liability</strong>. CPCB monthly data is incomplete — failure to submit
                    by April 7 will invoke <strong>Environmental Compensation under the Polluter Pays principle</strong>.
                    CTO is expiring March 2026 — without renewal, the plant risks
                    <strong> registration suspension and loss of EUR certificate issuance rights</strong>,
                    directly impacting revenue.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── SUBMISSIONS ─── */}
        {tab==="submissions"&&(
          <div className="fi">
            <SLabel>Monthly CPCB Portal Submissions — Due by 7th of Each Month (LWMR 2024 §3)</SLabel>
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,overflow:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:680}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.b1}`}}>
                    {["Month","Pirana STP","Vadaj STP","Odhav STP","Portfolio"].map(h=>(
                      <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:9,
                        color:C.text3,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",
                        background:C.s2}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((r,i)=>(
                    <tr key={i} className="trow"
                      style={{borderBottom:i<history.length-1?`1px solid ${C.b1}`:"none",
                        background:r.ok===0?`${C.red}06`:r.ok===1?`${C.amber}05`:"transparent"}}>
                      <td style={{padding:"11px 16px"}}>
                        <span className="mono" style={{fontSize:12,fontWeight:700,color:C.text}}>{r.m}</span>
                      </td>
                      <td style={{padding:"11px 16px",fontSize:11,color:C.green}}>{r.p}</td>
                      <td style={{padding:"11px 16px",fontSize:11,
                        color:r.v.startsWith("✓")?C.green:r.v.startsWith("⚠")?C.amber:C.red}}>{r.v}</td>
                      <td style={{padding:"11px 16px",fontSize:11,color:C.green}}>{r.o}</td>
                      <td style={{padding:"11px 16px"}}>
                        <Pill s={r.ok===2?"compliant":r.ok===1?"at-risk":"breach"} sm/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:12,padding:"14px 16px"}}>
                <div style={{fontSize:9,color:C.text3,fontWeight:800,marginBottom:10,letterSpacing:".1em"}}>REQUIRED DATA ELEMENTS</div>
                {["Wastewater treated (MLD)","Reuse of treated wastewater","Treated water discharged","Sludge / manure / biogas generated","Treated water quality parameters","Receiving water body quality"].map(e=>(
                  <div key={e} style={{fontSize:10,color:C.text3,padding:"5px 0",
                    borderBottom:`1px solid ${C.b1}`,display:"flex",gap:6,alignItems:"center"}}>
                    <CheckCircle size={9} color={C.green}/>{e}
                  </div>
                ))}
              </div>
              <div style={{background:`${C.cyan}08`,border:`1px solid ${C.cyan}20`,borderRadius:12,padding:"14px 16px"}}>
                <div style={{fontSize:9,color:C.text3,fontWeight:800,marginBottom:10,letterSpacing:".1em"}}>WEBSITE PUBLICATION OBLIGATION</div>
                <div style={{fontSize:10,color:C.text2,lineHeight:1.75}}>
                  Under LWMR 2024, operators must also publish the same monthly data on their
                  <strong style={{color:C.cyan}}> own website</strong> every month.
                  AquaComply auto-generates both the CPCB portal submission and
                  the public website report simultaneously from the same data.
                </div>
              </div>
              <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:12,padding:"14px 16px"}}>
                <div style={{fontSize:9,color:C.text3,fontWeight:800,marginBottom:10,letterSpacing:".1em"}}>PENALTY STRUCTURE</div>
                {[
                  {e:"Late submission",p:"Env. Compensation (Polluter Pays)"},
                  {e:"Missed submission",p:"Env. Comp. + SPCB action"},
                  {e:"Water quality breach",p:"Criminal — EPA §15–15F"},
                  {e:"Recovery target miss",p:"Env. Comp. by SPCB"},
                  {e:"Registration suspended",p:"Cannot issue EUR certificates"},
                ].map(r=>(
                  <div key={r.e} style={{fontSize:9,padding:"5px 0",
                    borderBottom:`1px solid ${C.b1}`,display:"flex",justifyContent:"space-between",gap:8}}>
                    <span style={{color:C.text3}}>{r.e}</span>
                    <span style={{color:C.red,fontWeight:700,textAlign:"right"}}>{r.p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── VIOLATIONS ─── */}
        {tab==="violations"&&(
          <div className="fi">
            <SLabel>Water Quality &amp; Compliance Violations Register
              <span className="mono" style={{fontSize:9,color:C.red,fontWeight:700}}>
                4 ACTIVE CRITICAL
              </span>
            </SLabel>
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,overflow:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:1000}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.b1}`}}>
                    {["Date","Plant","Parameter","Reading","CPCB Limit","Severity","Legal Section","Action Status"].map(h=>(
                      <th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:9,
                        color:C.text3,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",
                        background:C.s2}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {violations.map((v,i)=>(
                    <tr key={i} className="trow"
                      style={{borderBottom:i<violations.length-1?`1px solid ${C.b1}`:"none",
                        background:v.sev==="critical"?`${C.red}06`:"transparent"}}>
                      <td style={{padding:"9px 14px"}}>
                        <span className="mono" style={{fontSize:10,color:C.text3}}>{v.dt}</span>
                      </td>
                      <td style={{padding:"9px 14px",fontWeight:700,fontSize:11,color:C.text}}>{v.pl}</td>
                      <td style={{padding:"9px 14px"}}>
                        <span style={{background:C.b1,color:C.text2,fontSize:9,padding:"2px 7px",borderRadius:4,fontWeight:600}}>{v.param}</span>
                      </td>
                      <td style={{padding:"9px 14px"}}>
                        <span className="mono" style={{fontSize:11,fontWeight:700,
                          color:v.sev==="critical"?C.red:C.amber}}>{v.r}</span>
                      </td>
                      <td style={{padding:"9px 14px"}}>
                        <span className="mono" style={{fontSize:10,color:C.text3}}>{v.lim}</span>
                      </td>
                      <td style={{padding:"9px 14px"}}><Pill s={v.sev==="critical"?"breach":"at-risk"} sm/></td>
                      <td style={{padding:"9px 14px",fontSize:9,color:C.text3}}>{v.sec}</td>
                      <td style={{padding:"9px 14px"}}>
                        <span style={{fontSize:9,padding:"2px 8px",borderRadius:4,fontWeight:700,
                          background:v.action==="Resolved"?`${C.green}20`:v.action==="Pending"?`${C.red}20`:`${C.amber}20`,
                          color:v.action==="Resolved"?C.green:v.action==="Pending"?C.red:C.amber}}>
                          {v.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── ANNUAL RETURNS ─── */}
        {tab==="returns"&&(
          <div className="fi">
            <SLabel>Annual Returns — GPCB Filing (30 Jun 2026) · Annual Audit (30 Sep 2026)</SLabel>
            <div style={{background:C.card,border:`1px solid ${C.b1}`,borderRadius:14,overflow:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.b1}`}}>
                    {["Plant","Capacity","Return Deadline","Audit Deadline","Status","Data Completeness","Filed By"].map(h=>(
                      <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:9,
                        color:C.text3,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",
                        background:C.s2}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLANTS.map((p,i)=>(
                    <tr key={p.id} className="trow" style={{borderBottom:i<PLANTS.length-1?`1px solid ${C.b1}`:"none"}}>
                      <td style={{padding:"12px 16px",fontWeight:800,fontSize:12,color:C.text}}>{p.name}</td>
                      <td style={{padding:"12px 16px"}}><span className="mono" style={{color:C.text3,fontSize:11}}>{p.capacity} MLD</span></td>
                      <td style={{padding:"12px 16px"}}><span className="mono" style={{color:C.amber,fontSize:11}}>30 Jun 2026</span></td>
                      <td style={{padding:"12px 16px"}}><span className="mono" style={{color:C.text3,fontSize:11}}>30 Sep 2026</span></td>
                      <td style={{padding:"12px 16px"}}><Pill s="pending" sm/></td>
                      <td style={{padding:"12px 16px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:90,height:6,background:C.b1,borderRadius:3,overflow:"hidden"}}>
                            <div style={{height:"100%",width:`${p.annualPct}%`,borderRadius:3,
                              background:p.annualPct>60?C.green:C.amber,
                              boxShadow:`0 0 8px ${p.annualPct>60?C.green:C.amber}`}}/>
                          </div>
                          <span className="mono" style={{fontSize:10,color:p.annualPct>60?C.green:C.amber,fontWeight:700}}>
                            {p.annualPct}%
                          </span>
                        </div>
                      </td>
                      <td style={{padding:"12px 16px",fontSize:11,color:C.text3}}>—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{background:`${C.cyan}08`,border:`1px solid ${C.cyan}20`,borderRadius:10,
              padding:"11px 14px",fontSize:10,color:C.text3,lineHeight:1.75}}>
              <strong style={{color:C.cyan}}>Annual Return Contents (LWMR 2024):</strong> Full-year wastewater treated &amp; reused ·
              Total sludge generated, tested &amp; disposed · EUR certificates issued (plant/user/month) ·
              Reuse Responsibility Certificates · Water body quality monitoring (12 months) ·
              GPCB audit filing by 30 Sep under SPCB mandate.
            </div>
          </div>
        )}

        {/* ─── PLANT PROFILES ─── */}
        {tab==="plants"&&(
          <div className="fi">
            <SLabel>Individual Plant Profiles — Click to Enter Full Regulatory View</SLabel>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {PLANTS.map(p=>(
                <div key={p.id} className="gcard lift" onClick={()=>setDrillPid(p.id)}
                  style={{padding:20,cursor:"pointer",
                    background:`linear-gradient(135deg,${ST[p.status]?.bg||C.s2} 0%,${C.card} 100%)`,
                    border:`1px solid ${ST[p.status]?.br||C.b1}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                    <div>
                      <div className="display" style={{fontWeight:800,fontSize:16,color:C.text}}>{p.name}</div>
                      <div style={{fontSize:10,color:C.text3,marginTop:2}}>{p.loc}</div>
                    </div>
                    <Pill s={p.status}/>
                  </div>
                  {[
                    {l:"Design Capacity",v:`${p.capacity} MLD`},
                    {l:"CPCB Registration",v:p.reg},
                    {l:"CTO Number",v:p.cto},
                    {l:"CTO Validity",v:p.ctoValid},
                    {l:"Discharge Point",v:p.discharge},
                    {l:"Data Integration",v:`${p.scada?"SCADA":"—"} + ${p.iot?"IoT":"—"}`},
                    {l:"CPCB Submission",v:p.submission==="complete"?"Complete ✓":"⚠ Incomplete"},
                    {l:"Active Violations",v:`${p.alerts.filter(a=>a.t==="critical").length} critical`},
                  ].map(r=>(
                    <div key={r.l} style={{display:"flex",justifyContent:"space-between",
                      padding:"6px 0",borderBottom:`1px solid ${C.b1}`,fontSize:10}}>
                      <span style={{color:C.text3}}>{r.l}</span>
                      <span style={{color:C.text,fontWeight:600,textAlign:"right",maxWidth:160,
                        color:r.l==="Active Violations"&&parseInt(r.v)>0?C.red:C.text}}>
                        {r.v}
                      </span>
                    </div>
                  ))}
                  <div style={{marginTop:14,display:"flex",alignItems:"center",gap:6,
                    color:C.amber,fontWeight:700,fontSize:11}}>
                    <Eye size={13}/>View Full Regulatory Detail
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App(){
  const [view,setView]=useState("home");
  const [drillPlant,setDrillPlant]=useState(0);
  const drill=(id)=>{setDrillPlant(id);setView("operator");};
  return(
    <>
      <style>{CSS}</style>
      {view==="home"    &&<HomePage onSelect={setView}/>}
      {view==="manager" &&<ManagerDash onBack={()=>setView("home")} onDrill={drill}/>}
      {view==="operator"&&<OperatorDash onBack={()=>setView("home")} initPlant={drillPlant}/>}
      {view==="officer" &&<OfficerDash onBack={()=>setView("home")}/>}
    </>
  );
}

function gvjs_O_(a){gvjs_aT.call(this,a)}gvjs_t(gvjs_O_,gvjs_aT);
gvjs_O_.prototype.rI=function(){var a=[];gvjs_u(this.layout,function(b){b.C.forEach(function(c){var d=[],e=c.color,f=(new gvjs_Uq).style(gvjs_rp,gvjs_f).style(gvjs_6p,e).style(gvjs_8p,2);f.data({value:c,id:gvjs_xR(c.sourceColumn)});var g=!0;gvjs_u(c.data,function(h){null!=h.Tt&&null!=h.Iw&&isFinite(h.Tt)&&isFinite(h.Iw)?(h.color=e,d.push((new gvjs_2Q).style("x",h.Tt).style("y",h.Iw).style("r",4).style(gvjs_rp,e).style(gvjs_sp,0).data({value:h,id:gvjs_KL(gvjs_wR(c.sourceColumn,h.ZE),gvjs_JQ,b.column)})),
g?f.move(h.Tt,h.Iw):f.line(h.Tt,h.Iw),g=!1):g=!0});a.push(f);gvjs_Me(a,d)})});return a};function gvjs_P_(a,b,c,d){gvjs_DS.call(this,a,b,c,d)}gvjs_o(gvjs_P_,gvjs_DS);gvjs_P_.prototype.vi=function(){return gvjs_J(this.options,gvjs_9v,gvjs_S,gvjs_CS)};gvjs_P_.prototype.hZ=function(a,b,c){return new gvjs_O_({options:this.options,Zna:!1,$na:!0,table:this.Ta,Sm:this.jO.Sm,rK:c,axes:{domain:a,target:b}})};function gvjs_Q_(a,b){gvjs_GS.call(this,a,b)}gvjs_o(gvjs_Q_,gvjs_GS);gvjs_=gvjs_Q_.prototype;gvjs_.Lp=function(a){a.style(gvjs_Xp,0).style(gvjs_Yp,1).style(gvjs_Vp,.4).style(gvjs_Wp,2);return a};gvjs_.dr=function(a){a.style(gvjs_Xp,null).style(gvjs_Yp,null).style(gvjs_Vp,null).style(gvjs_Wp,null);return a};gvjs_.CT=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.Lp(a).style(gvjs_pp,b).style(gvjs_qp,1))};
gvjs_.tT=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.Lp(a).style(gvjs_pp,gvjs_HS(b,this.dQ,this.HB)).style(gvjs_qp,1))};gvjs_.pT=function(a){null!=a.data().value&&this.dr(a).style(gvjs_qp,0)};gvjs_.zT=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.dr(a).style(gvjs_pp,b).style(gvjs_qp,0))};gvjs_.Hfa=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.Lp(a).style(gvjs_5p,4).style(gvjs_3p,b))};
gvjs_.Cfa=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.Lp(a).style(gvjs_5p,4).style(gvjs_3p,gvjs_HS(b,this.dQ,this.HB)))};gvjs_.Afa=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.dr(a).style(gvjs_5p,2).style(gvjs_3p,gvjs_IS(b,this.nfa,this.HB)))};gvjs_.Ffa=function(a){var b=a.data();null!=b.value&&(b=b.value.color,this.dr(a).style(gvjs_5p,2).style(gvjs_3p,b))};function gvjs_R_(a){gvjs_UL.call(this,a)}gvjs_o(gvjs_R_,gvjs_UL);gvjs_=gvjs_R_.prototype;gvjs_.xq=function(){return null};gvjs_.og=function(){return gvjs_FS};gvjs_.po=function(a,b,c,d){a=new gvjs_AR(this,a,b,c,d);a.$t([gvjs_Wo,gvjs_Pu,gvjs_Cw,gvjs_YQ,gvjs_RQ,gvjs_Ds,gvjs_Cs,gvjs_Pd]);return a};gvjs_.Mm=function(a,b){return new gvjs_Q_(a,b)};gvjs_.Al=function(a,b,c,d){return new gvjs_P_(a,b,c,d)};
gvjs_.xs=function(a){return[new gvjs_IR([new gvjs_IL(gvjs_3r)]),new gvjs_KR([new gvjs_IL(gvjs_HQ),new gvjs_IL(gvjs_IQ)],gvjs_J(a,gvjs_Kw)===gvjs_Ww),new gvjs_JR([new gvjs_IL(gvjs_3r),new gvjs_IL(gvjs_HQ),new gvjs_IL(gvjs_IQ),new gvjs_IL(gvjs_NQ)]),new gvjs_MR([new gvjs_IL(gvjs_HQ)])]};gvjs_.nH=function(a,b){null==this.sb?this.sb=new gvjs_oR(this.container,a,b,[gvjs_qs,gvjs_LQ]):this.sb.update(a,b)};gvjs_q(gvjs__b,gvjs_R_,void 0);gvjs_R_.convertOptions=function(a){return gvjs__S(a)};gvjs_R_.prototype.draw=gvjs_R_.prototype.draw;gvjs_R_.prototype.clearChart=gvjs_R_.prototype.Jb;gvjs_R_.prototype.getSelection=gvjs_R_.prototype.getSelection;gvjs_R_.prototype.setSelection=gvjs_R_.prototype.setSelection;

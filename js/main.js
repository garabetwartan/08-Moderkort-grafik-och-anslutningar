"use strict";const PREFIX="itlab08_";function save(k,v){try{localStorage.setItem(PREFIX+k,JSON.stringify(v))}catch(e){alert("Sparande misslyckades. Exportera dina svar och kontrollera webbläsarens lagringsinställningar.")}}function load(k,d=""){try{const v=localStorage.getItem(PREFIX+k);return v===null?d:JSON.parse(v)}catch{return d}}function exportAnswers(){const data={lektion:"08 Moderkort, grafik och anslutningar",datum:new Date().toISOString(),svar:{}};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith(PREFIX))data.svar[k.slice(PREFIX.length)]=load(k.slice(PREFIX.length))}const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="itlab08-svar.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}document.querySelectorAll("#export").forEach(b=>b.addEventListener("click",exportAnswers));document.querySelectorAll("[data-save]").forEach(el=>{el.value=load(el.dataset.save,"");el.addEventListener("input",()=>save(el.dataset.save,el.value))});function node(tag,text,parent,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;parent.append(e);return e}function optionsSelect(parent,label,choices,key){const l=node("label",label,parent);const s=node("select",undefined,parent);choices.forEach((v,i)=>{const o=node("option",v,s);o.value=String(i)});s.value=String(load(key,0));s.addEventListener("change",()=>save(key,Number(s.value)));return s}function answerField(parent,label,key){node("label",label,parent);const t=node("textarea",undefined,parent);t.value=load(key,"");t.addEventListener("input",()=>save(key,t.value));return t}

/* =========================================
   RULLGARDINSMENY
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const dropdown = document.querySelector(".nav-dropdown");
  const button = document.querySelector(".nav-dropdown-btn");

  if (!dropdown || !button) return;

  button.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");

    button.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  // Stäng när man klickar utanför menyn
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });

  // Stäng med Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.focus();
    }
  });

});

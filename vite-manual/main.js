import '@/styles/global.css'

import { getNode as $ } from "kind-tiger";
import { btn } from "@/styles/main.module.css"; //네임드익스폴트로 불러옴 (클래스명이랑 똑같이 작성)

import img from "@/assets/8b.jpg"; //동적자산 불러오는 방법

const app = $('#app');


// 태그 생성하여 조립하는 방식
const h1 = document.createElement('h1');
h1.textContent = '빛보다 빠른 Vite'
h1.classList.add = 'heading';

const figure = document.createElement('figure');
figure.innerHTML = /* html */ `
  <img src="${img}" style="width:50px"/>
  <button type="button" class="${btn}">버튼</button>
  <figcaption>로고</figcaption>
`


// 태그 2개 한번에 내보내기
const fragment = document.createDocumentFragment(); // 인수는 따로 필요없음
fragment.appendChild(h1)
fragment.appendChild(figure)

app.appendChild(fragment)

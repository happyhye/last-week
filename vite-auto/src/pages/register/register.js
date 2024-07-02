import '@/pages/register/register.css';
import { getNode as $ } from 'kind-tiger'
import gsap from 'gsap';
import pb from '@/api/pocketbase';



function register(){

  const idField = $('#idField');
  const pwField = $('#pwField');
  const next1 = $('.next-1');
  const next2 = $('.next-2');
  

  // validation 함수
  function validation(e) {
    const target = e.currentTarget; //currentTarget이 this 랑 똑같음

    // input값이 5글자 이상이면 버튼 활성화
    if(target.value.length > 5){
      target.nextElementSibling.disabled = false;
    }
    else {
      target.nextElementSibling.disabled = true;
    }
  }

  idField.addEventListener('input', validation)
  pwField.addEventListener('input', validation)


  // next 버튼 애니메이션 스르륵~
  next1.addEventListener('click', ()=>{
    gsap.to('.wrapper', {x:-500})
    gsap.to('.line > div', {width:'50%'}) //프로그래스바 애니메이션
  })


  // 회원가입 완료 시 포켓베이스로 데이터 전송
  next2.addEventListener('click', async ()=>{

    const email = idField.value;
    const password = pwField.value;
    const passwordConfirm = password;

    pb.collection('users').create({ email, password, passwordConfirm })
    .then(()=>{
      // 회원가입이 완료됐을 때 실행되는 코드
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
      location.href = '/src/pages/login/'
    })
    .catch(()=>{
      alert('동일한 이메일이 존재합니다.')
      // location.reload() //새로고침

      gsap.to('.wrapper', {x:0})
      gsap.to('.line > div', {width:'0'}) //프로그래스바 애니메이션
      idField.value = ''
      pwField.value = ''

    })
  })
}



register()
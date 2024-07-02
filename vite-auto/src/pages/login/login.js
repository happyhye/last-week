import '@/pages/login/login.css';
import { setDocumentTitle, getNode, getStorage, setStorage } from 'kind-tiger';
import pb from '@/api/pocketbase';
import gsap from "gsap";



setDocumentTitle('29CM / 로그인');

// gsap 애니메이션
const tl = gsap.timeline({
  defaults:{
    opacity:0,
  }
});

tl.from('.container h1',{ delay:0.2, y:30 })
  .from('.container hr', { scaleX: 0 })
  .from('form > *', { y:30, stagger:0.1 })
  .from('.register', {y:-30}, '-=0.2')



const loginButton = getNode('.login');



function handleLogin(e) {
  e.preventDefault();

  console.log('click');

  // const id = 'hyeji@gmail.com';
  // const pw = '12341234';

  const id = getNode('#idField').value;
  const pw = getNode('#pwField').value;

  pb.collection('users').authWithPassword(id,pw)
  .then( async() => {
    // 로그인 성공 영역

    


    // const auth = await getStorage('pocketbase_auth')
    // console.log(auth); //model과 token이 떨어짐

    const {model, token} = await getStorage('pocketbase_auth')

    setStorage('auth', {
      isAuth: !!model,
      user: model,
      token: token
    })



    alert('로그인 완료! 메인페이지로 이동합니다.');
    location.href = '/index.html'

    

  }, ()=>{ // 에러 캐치
    alert('인증된 사용자가 아닙니다.')
  })


}

loginButton.addEventListener('click', handleLogin);

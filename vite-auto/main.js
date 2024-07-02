import getPbImageURL from '@/api/getPbImageURL';
import { getNode, getStorage, insertLast, setStorage } from 'kind-tiger';
import '/src/styles/global.css';
import pb from './src/api/pocketbase';
import gsap from "gsap";
import defaultAuthData from '@/api/defaultAuthData'

const tl = gsap.timeline({
  defaults:{
    opacity:0
  }
});

tl.from('.visual', {
  delay:0.3,
  y:30
})

tl.from('h2 > span', {
  x: -30
},
'-=0.2')

async function logout() {

  // 로컬스토리지에 auth 라는 키가 있으면 실행해
  if(localStorage.getItem('auth')) {

    const {isAuth, user} = await getStorage('auth');
    console.log(isAuth); //true


    // 로그아웃버튼 생성
    if(isAuth) {

      const template = `
      <div class="thumbnail">
        <img src="${getPbImageURL(user,'avatar')}" alt="" />
      </div>
      <div class="username">${user.name}님 반갑습니다!</div>
      <button type="button" class="logout">로그아웃</button>
    `

      insertLast('.container', template)


      // ------------------------------------ 로그아웃 기능
      const logout = getNode('.logout');

      function handleLogout(){
        
        if(confirm('정말 로그아웃 하실 겁니까?')) {
          pb.authStore.clear();
          setStorage('auth', defaultAuthData)
          location.reload(); //새로고침
        }

      }

      logout.addEventListener('click', handleLogout)

    }
    

  }
}

logout()
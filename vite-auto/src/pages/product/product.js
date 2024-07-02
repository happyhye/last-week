import getPbImageURL from '@/api/getPbImageURL';
import '@/pages/product/product.css';
import gsap from 'gsap';
import { comma, insertLast, setDocumentTitle, getStorage, setStorage } from "kind-tiger";
import pb from "@/api/pocketbase";
import defaultAuthData from '@/api/defaultAuthData';


// console.log(import.meta.env.VITE_PB_URL);

// console.log(await pb.collection('products').getFullList());   //SDK



setDocumentTitle('29CM / 상품목록');



// Auth 기본값 넣어주는 작업
if(!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData)
}





async function renderProductItem() {

  // const response = await tiger.get(`${import.meta.env.VITE_PB_API}/collections/products/records`)   // Fetch API
  // const productsData = response.data.items;

  const {isAuth} = await getStorage('auth');
  console.log(isAuth);

  const productsData = await pb
      .collection('products')
      .getFullList({
        // sort: 'price'    //정렬기능 : 낮은순부터 나옴
        sort: '-created'    //정렬기능 : 높은순부터 나옴
      });   //SDK

  productsData.forEach((items)=>{

    // console.log(items); //아이템들 뽑음

    const discount = items.price * (items.ratio * 0.01);
    const template = /*html */`
     <li class="product-item">
          <div>
            <figure>
              <a href="${isAuth ? `/src/pages/detail/index.html?product=${items.id}` : '/src/pages/login/'}"></a>
              <img src="${getPbImageURL(items)}" alt="" />
            </figure>
            <span class="brand">${items.brand}</span>
            <span class="desc">${items.description}</span>
            <span class="price">${comma(items.price)}원</span>
            <div>
              <span class="discount">${items.ratio}%</span>
              <span class="real-price">${comma(items.price - discount)}원</span>
            </div>
          </div>
          </li>
     `

     insertLast('.container > ul', template)
  })



  gsap.from('.product-item', {
    y:30,
    opacity:0,
    stagger:0.1
  })


}

renderProductItem()
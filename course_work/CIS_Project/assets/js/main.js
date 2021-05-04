
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-Appetizer');
        });
        this.classList.add('filter-Appetizer');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/**
   * Shopping cart
   */

 let carts = document.querySelectorAll('.add-cart');

 let products = [
   {
     name: 'meatballs',
     tag: 'meatballs',
     price: '35',
     incart: '0'
   },

   {
    name: 'burger',
    tag: 'burger',
    price: '35',
    incart: '0'
  },

  {
    name: 'pizza',
    tag: 'pizza',
    price: '40',
    incart: '0'
  },

  {
    name: 'ceser',
    tag: 'ceser',
    price: '30',
    incart: '0'
  },

  {
    name: 'cake',
    tag: 'cake',
    price: '22',
    incart: '0'
  },

  {
    name: 'ice cream',
    tag: 'ice cream',
    price: '15',
    incart: '0'
  },

  {
    name: 'greek',
    tag: 'greek',
    price: '30',
    incart: '0'
  },

  {
    name: 'souffle',
    tag: 'souffle',
    price: '26',
    incart: '0'
  },

  {
    name: 'orange',
    tag: 'orange',
    price: '18',
    incart: '0'
  },

  {
    name: 'lemon',
    tag: 'lemon',
    price: '18',
    incart: '0'
  },

  {
    name: 'soda',
    tag: 'soda',
    price: '10',
    incart: '0'
  },

  {
    name: 'black',
    tag: 'black',
    price: '12',
    incart: '0'
  },

  {
    name: 'latte',
    tag: 'latte',
    price: '16',
    incart: '0'
  },

 ]

 for( let i=0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
    cartnumbers(products[i]);
    totalCost(products[i]);
   })


 }

 function onloadCartNumbers() {
    let productnumbers = localStorage.getItem('cartnumbers');

  if(productnumbers) {
      document.querySelector('.cart span').textContent = productnumbers;
  }
 }

 function cartnumbers(product){
  
   let productnumbers = localStorage.getItem('cartnumbers');
   productnumbers = parseInt(productnumbers);

   if(productnumbers){
      localStorage.setItem('cartnumbers', productnumbers + 1); 
      document.querySelector('.cart span').textContent = productnumbers + 1;

   } else {
    localStorage.setItem('cartnumbers', 1); 
    document.querySelector('.cart span').textContent =1;
   }

   setItems(product);
  
 }

 function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {

    if(cartItems[product.tag] == undefined){
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
      cartItems[product.tag].incart += 1;

  } else {
    product.incart =1;
    cartItems = {
       [product.tag]: product

  }
  }
  
  localStorage.setItem("productsInCart",JSON.stringify
  (cartItems));
    
 }

 function totalCost(product) {

  let cartCost = localStorage.getItem('totalCost');
   
  
  
  if(cartCost != null){
 
   cartCost = parseInt(cartCost); 
  localStorage.setItem("totalCost", cartCost + product.price);

  } else{
    localStorage.setItem("totalCost", product.price);
  }
    
 }
 
 onloadCartNumbers();

 


function myalert() {
  alert("The item was added to the cart");
}

 
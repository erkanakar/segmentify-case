const url = 'product-list.json';


async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    if (response.ok) {
        return response.json();
    }
    throw 'Herhangi bir veriye ulaşılamadı!';
}

function getCategories() {
    getData('product-list.json')
        .then(data => {
            const resp = data.responses[0];
            return resp.map(function (cat) {
                const categories = cat.params.userCategories;

                const container = document.getElementById('user-category');

                container.addEventListener("click", function (e) {
                    const user = e.target.closest(".tab-list-element");

                    const elems = document.querySelectorAll(".tab-list-element");

                    [].forEach.call(elems, function (el) {
                        el.classList.remove("selected-tab");
                    });

                    user.classList.add('selected-tab');
                    getProductsCategory(user.firstElementChild.getAttribute("data-tab-key"));
                });

                const nodes = categories.map((category, i) => {
                    const li = document.createElement('li');
                    const span = document.createElement('span');

                    if (category.split('> ').indexOf(category) > -1) {
                        categoryFull = category;
                    } else {
                        categoryFull = category.split('> ')[1]
                    }

                    span.textContent = categoryFull;
                    span.setAttribute('data-tab-key', category);

                    li.append(span);
                    li.classList.add('tab-list-element');

                    if (i == 0) {
                        li.classList.add('selected-tab');
                    }

                    return li;
                });

                document.querySelector('#user-category').append(...nodes);
            })
        });
}

function getProductsCategory(category) {
    getData('product-list.json')
        .then(data => {
            const resp = data.responses[0];
            const container = document.createElement('div');
            const wrapper = document.createElement('div');

            return resp.map(function (cat) {
                const products = cat.params.recommendedProducts[category];
                const productNodes = products.map((product, i) => {
                    const slide = document.createElement('div');

                    if (window.innerWidth < 960) {
                        container.classList.add('mobile-product-slide');
                        wrapper.classList.add('mobile-wrapper');
                        slide.classList.add('mobile-slide');
                    } else {
                        container.classList.add('swiper-container', 'product-slide');
                        wrapper.classList.add('swiper-wrapper');
                        slide.classList.add('swiper-slide');
                    }

                    let fee = ' ';

                    if (product.params.shippingFee == 'FREE') {
                        fee = '<div title="Ücretsiz Kargo" class="free-cargo"><div name="freeCargo" fill="#36b458" width="16" height="16" radius="0" class="free-cargo-icon" color="inherit"><svg width="16" height="16" fill="#36b458" viewBox="0 0 24 24"><path d="M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z"></path></svg></div><span class="free-cargo-text">Ücretsiz Kargo</span></div>'
                    }

                    slide.innerHTML += '<article><div class="product-box"><a href="' + product.url + '"><div class="product-box-inner"><div class="product-box-inner-img"><div class="product-box-inner-img-box"><div><img src="' + product.image + '" alt="Regal 32R602H Televizyon" class="swiper-lazy" /><div class="swiper-lazy-preloader"></div></div></div></div><div class="product-box-inner-content"><div class="product-box-inner-content-header"><header><hgroup><h2 title="' + product.name + '">' + product.name + '</h2></hgroup></header></div><div class="product-box-inner-content-price"><div></div><span>' + product.priceText + '</span></div><div class="product-box-inner-content-cargo">' + fee + '</div></div></div></a><footer class="add-to-cart"><button class="add-to-cart-button" type="button"><span>Sepete Ekle</span></button></footer></div></article>';

                    wrapper.append(slide);

                    container.append(wrapper);

                    return container;
                });


                document.querySelector('.tabs').innerHTML = ''
                document.querySelector('.tabs').append(...productNodes);
                document.querySelector('.swiper-container').innerHTML += '<div name="chevronRight" fill="#333" width="16" height="16" radius="0" class="slider-button swiper-button-next swiper-button discover-swiper-button-next" color="inherit" tabindex="0" role="button" aria-label="Sonraki Slayt" aria-disabled="false"><svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M6.317.32A1.079 1.079 0 017.715.204L7.85.32l10.834 10.909c.38.383.419.98.114 1.407l-.114.135L7.85 23.681a1.078 1.078 0 01-1.532 0 1.098 1.098 0 01-.114-1.408l.114-.135L16.387 12 6.316 1.862A1.097 1.097 0 016.202.455L6.317.32z"></path></svg></div><div name="chevronLeft" fill="#333" width="16" height="16" radius="0" class=" swiper-button-prev swiper-button discover-swiper-button-prev swiper-button-disabled" color="inherit" tabindex="0" role="button" aria-label="Önceki Slayt" aria-disabled="true"><svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M18.683.32a1.079 1.079 0 00-1.398-.116L17.15.32 6.317 11.229c-.38.383-.419.98-.114 1.407l.114.135 10.834 10.91a1.078 1.078 0 001.532 0c.38-.384.419-.982.114-1.408l-.114-.135L8.613 12l10.07-10.138c.38-.383.419-.981.114-1.407L18.683.32z"></path></svg></div>'

                const swiper = new Swiper(".product-slide", {
                    slidesPerView: 3.1,
                    spaceBetween: 15,
                    lazy: true,
                    preloadImages: false,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    breakpoints: {
                        640: {
                          slidesPerView: 2,
                        },
                        768: {
                          slidesPerView: 3.1,
                        },
                        1280: {
                          slidesPerView: 4.2,
                        },
                      },
                });
            })
        })
        .catch(e => {
            document.querySelector('h2').innerHTML = e;
        });
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        getCategories();
        getProductsCategory('Size Özel');

    }
};

if (window.innerWidth < 960) {
    document.getElementsByClassName('wrapper-content-list').classList.add('mobile-category-list');
}

document.querySelector('body').addEventListener('click', function (event) {
    if (event.target.closest(".add-to-cart-button")) {
        document.querySelector('.product-added').innerHTML = '<div class="product-added-container"><div class="icon-container"><div class="icon-container-box"><svg width="14" height="14" fill="#333" viewBox="0 0 12 12"><path d="M10.522 2.326L4.182 8.62 1.364 5.664a.828.828 0 00-1.169.087.824.824 0 00.095 1.162l3.465 3.52a.823.823 0 00.54.202l.082-.004a.829.829 0 00.573-.32l6.875-6.979a.824.824 0 10-1.304-1.006z" fill="#FFF" fill-rule="nonzero"></path></svg></div></div><div class="text-container"><div class="text-container-box"><span>Ürün sepete eklendi.</span><a href="https://www.gittigidiyor.com/sepetim">Sepete Git</a></div><div><div><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M14.207 12.027l9.352-9.351c.609-.61.609-1.59 0-2.2a1.551 1.551 0 00-2.2 0l-9.351 9.352L2.656.477c-.61-.61-1.59-.61-2.199 0-.61.609-.61 1.59 0 2.199l9.352 9.351L.457 21.38c-.61.605-.61 1.59 0 2.2a1.553 1.553 0 002.2 0l9.35-9.352 9.352 9.351a1.553 1.553 0 002.2 0c.609-.61.609-1.594 0-2.2zm0 0"></path></svg></div></div></div></div>'
        removePopup();
    }
});

function removePopup() {
    setTimeout(function(){ document.querySelector('.product-added').innerHTML = ' '; }, 3000);
}
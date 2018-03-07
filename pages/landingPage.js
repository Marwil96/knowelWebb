(function () {

PC.pages.landingPage = {}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 */

PC.pages.landingPage.renderHTML = function (params) {
  var query = {
    content_type: PC.config.landingPageInformationContentTypeId
  }

  if (params && params.categoryId) {
    query['fields.categories.sys.id[in]'] = params.categoryId
  }

  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderProducts(entries.items)
  })
}

function renderProducts(products) {
  $(document).on('click', '.chalmersLink', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_blank');
});
   $(document).on('click', '.headerLink', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_Self');
});
     $(document).on('click', '.buttonLink', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_Self');
});
     $(document).on('click', '.saharaLink', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_Self');
});
  setTimeout(function fullpager(){
    

$('#fullpage').fullpage({
     afterLoad: function (anchorLink, index) {
         //section 3 finished loading
         var sida = anchorLink;
         if (sida === "firstPage") {
          console.log(anchorLink)
             $('.menuItems').addClass('black');
             $('.logo').addClass('black');
         }
         else {
          $('.menuItems').removeClass('black');
              $('.logo').removeClass('black');
         }
     },
    
    //Navigation
    menu: '#menu',
    lockAnchors: true,
    anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    verticalCentered:false,
    fixedElements: '.header',
    parallax:false,
    
  });}, 100)
   console.log("product", products[0].fields.rubrikLandingPage);
  return '<div id="fullpage">'+     
  '<div class="landingPage section" id="section1">'+
      '<div class="landingPageIntroTextDiv">'+
         '<h1 class="landingPageRubrik" id="landingPageRubrik">' + products[0].fields.rubrikLandingPage +'</h1>'+
          '<h3 class="landingPageText" id="landingPageText">'+ products[0].fields.underRubrikLandingPage +'</h3>'+
        '</div>'+
        '<a class="buttonLink" href="https://knowel.typeform.com/to/K3OLU2"><div class="landingPageButton"><h2 class="landingPageButtonText"> Contact us</h2></div></a>       <div class="scrollDown">         <div class="scrollDownCircle"></div>       </div><div class="partners"><h3> Partners </h3> <img src="https://www.wallenstam.se/Static/img/wallenstam-logo.png" class="wallenstam"></div>     </div>'+
        
        '<div class="bigProject section" id="section2">'+
          '<div class="bigProject1" style="background: url('+ products[0].fields.umnandiImage.fields.file.url+')no-repeat center center; -webkit-background-size: cover;   -moz-background-size: cover;   -o-background-size: cover;   background-size: cover;"></div>'+ 
          '<div class="infoBigProjectContainer">'+           
          '<h1 class="infoBigProjectText">'+products[0].fields.umnandiRubrik+'</h1>'+
        '<div class="lineLandingPage"></div><a class="chalmersLink" href="http://umnandi.com/"><h2 class="infoBigProjectButton">Read more</h2></a></div></div>'+      
        
        '<div class="bigProject section" id="section3">'+
        '<div class="bigProject2" style="background: url('+ products[0].fields.saharaImage.fields.file.url+')no-repeat center center; -webkit-background-size: cover;   -moz-background-size: cover;   -o-background-size: cover;   background-size: cover;" ></div>'+
        '<div class="infoBigProjectContainer">'+
        '<h1 class="infoBigProjectText">'+ products[0].fields.saharaRubrik +'</h1>'+
        '<div class="lineLandingPage"></div>'+ 
        '<a class="saharaLink" href="'+'journey/'+"sahara"+'"><h2 class="infoBigProjectButton">Read more</h2></a></div></div>'+
        '</div>'
}
// function renderProducts(products) {
//   return '<h1>Products</h1>' +
//     '<div class="products">' +
//     products.map(renderSingleProduct).join('\n') +
//     '</div>'
// } 

}());



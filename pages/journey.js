(function () {

PC.pages.journey = {}

/**
 * Renders the individual product page
 */

PC.pages.journey.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    // content_type: PC.config.productContentTypeId,
    content_type: PC.config.journeyContentTypeId,
    'fields.slug': params.productSlug
  })
  .then(function (entries) {
    console.log('entries', entries)
    if(entries.items[0] != entries.includes.Asset[1]){
    return renderSingleProduct(entries.items[0],entries.items[0])
    }
  })
}


function renderSingleProduct(product, slug) {
  $(document).on('click', 'a', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_Self');
});
  setTimeout(function slickeeer(){
        console.log("SLICKEER")
        $('.slideShowContainer').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        swipeToSlide: true,
        lazyLoad: "progressive"
        })}, 100)
  console.log("product", slug);
  var fields = product.fields
  return '<div class="journeyLandingPage">' +
     ' <img src="'+ product.fields.headImage.fields.file.url+'" class="journeyImg">' +
      '<div class="introTextDiv">' +
        '<h1 class="journeyPageRubrik" style="color:' + fields.journalRubrikColor + '">'+fields.journalRubrik+'</h1>'+
        '<h2 class="journeyPageText" style="color:' + fields.journalRubrikColor + '">'+fields.journalUnderRubrik+'</h2>'+
      '</div>' +
      '</div>' +
     '<div class="journeyBecomeMemberBox">'+
        '<p class="journeyBecomeMemberText">' +
        'There are huge knowledge gaps in the world; if these gaps are bridged they can be life changing for the people affected. Wether you identified a gap on your own or simply want to participate, we can help you thanks to our network and our platform.'+
        '</p>'+
        '<a href="https://knowel.typeform.com/to/K3OLU2"><div class="journeyBecomeMemberButton">'+
          '<h2 class="journeyBecomeMemberButtonText">' + 
          'Contact us'+
          '</h2>'+
        '</a></div>'+
      '</div>' +
      '<div class="journeyTextBox">'+
        // '<h1 class="journeyTextBoxRubrik">Driving factors</h1>'+
        '<p class="journeyTextBoxText">' +PC.utils.truncate(marked(fields.journeyText), 100000)+'</p>' +
    '</div>' +
    '<div class="slideShowContainer">'+
      product.fields.bildSpel.map(renderSlideShow).join('\n')+
     //  '<div class="slideImage">'+
     //    '<img src="https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?ixlib=rb-0.3.5&s=f0eada8231c26bb891dfce2993e3752b&auto=format&fit=crop&w=1650&q=80" class="slideImg">'+
     //  '</div>'+
     // ' <div class="slideImage">'+
     //   '<img src="https://images.unsplash.com/photo-1459539235056-5045ca20e525?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=42ace4ed912d7d494a4385258572a682&auto=format&fit=crop&w=1650&q=80" class="slideImg">'+
     //  '</div>'+
    '</div>'
    // '<a href="'+'journey/'+product.fields.slug+'"><div class="nextProjectButton"> Next Project </div></a>'













  // return '<div class="product">' +
  //   '<div class="product-header">' +
  //     '<h2>' + fields.productName + '</h2>' +
  //   '</div>' +
  //   '<p class="product-categories">' +
  //     fields.categories.map(function (category) {
  //       return category.fields.title
  //     }).join(', ') +
  //     '<div class="introTextDiv">' +
  //       '<h1 class="journeyPageRubrik">Guatemala 2015</h1>'+
  //       '<h2 class="journeyPageText"> Building Social Entrepreneurship together with University Students</h2>'+
  //      '</div>' +
  //   '</p>' +
  // '</div>'
}

function renderSlideShow(image) {
  console.log(image.fields.file.url)
    return '<div class="slideImage">'+
        '<img src="'+image.fields.file.url+'" class="slideImg">'+
      '</div>'
}

 
}());

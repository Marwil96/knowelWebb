(function () {

PC.pages.journal = {}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 */

PC.pages.journal.renderHTML = function (params) {
  var query = {
    content_type: PC.config.journeyContentTypeId
    // content_type: PC.config.productContentTypeId
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
  $(document).on('click', 'a', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_Self');
});
  $('.menuItems').removeClass('black');
             $('.logo').removeClass('black');
  if ( $('.fp-enabled').length ) {
            // Destroy all  
            $.fn.fullpage.destroy('all');
        }
   console.log("product");
  return '<div class="journalLandingPage">'+
      '<div class="journalLandingImage"></div>'+
      '<div class="journalIntroTextDiv">'+
        '<h1 class="journalPageRubrik">Journal</h1>'+
        '<h2 class="journalPageText">Our latest journeys</h2>'+
      '</div>'+
    '</div>'+
  '<div class="projectBox">'+
    products.map(renderSingleProduct).join('\n') +
  '</div>'
}


function renderSingleProduct(product) {

  var fields = product.fields
  console.log("renderProducts",fields.slug)
  return '<a  class="project"href="journey/' + fields.slug + '" data-nav>' +
      '<div class="projectTextContainer">'+
        '<h1 class="projectRubrik">'+ fields.journalRubrik +'</h1>'+
        '<h2 class="projectText">' + fields.journalUnderRubrik + '</h2>'+
      '</div>'+
      '<img src="'+ product.fields.headImage.fields.file.url +'" class="projectImg">'+
    '</a>'
}





}());

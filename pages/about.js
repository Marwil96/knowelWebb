(function () {

PC.pages.about = {}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 */

PC.pages.about.renderHTML = function (params) {
  var query = {
    content_type: PC.config.boardMemberInformationContentTypeId 
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
  console.log(products);
  $('.menuItems').addClass('black');
             $('.logo').addClass('black');
  if ( $('.fp-enabled').length ) {
            // Destroy all  
            $.fn.fullpage.destroy('all');
        }
  return '<div class="aboutLandingPage">' +
        '<div class="aboutIntroTextDiv">' + 
        '<h1 class="aboutPageRubrik">Our mission</h1>'+
        '<p class="aboutPageText">Knowel is a non-profit organization based in Gothenburg, Sweden, run by master students from Chalmers School of Entrepreneurship. Knowel’s mantra is spreading vital knowledge, and this is done through the different projects that each team undertakes. Knowel is not a charity organization, rather we are a social entrepreneurial venture that aims to spread the knowledge needed to build a better society.  Knowel was founded in 2010, and has since undertaken a couple of different projects. The projects have visited Laos, Kenya and Tanzania. The first project involved the creation of a book to spread vital knowledge through pictures to ensure that everyone could understand it, the second project involved a business plan competition to distribute solar powered lamps and the third project worked together with local students and NGOs in Dar es Salaam in order to improve the businesses of local micro-entrepreneurs.  During the project year 2013 we had, influenced by the aspirations of previous Knowel projects, an ambition to install a more permanent Knowel board responsible for creating a long-term platform for social entrepreneurship. The idea was born out of the frustration that we lacked traceability between different Knowel projects, that lessons learned fell between the cracks and that ambitions of sustainable impact, no matter how important they were, ended up as discrete efforts. We knew we were in need of a systematic approach to better accumulate resources, experiences, people and projects. We’re glad to announce, that during the aftermath of our homecoming we have done just that!  At Knowel, it is our absolute conviction that knowledge precedes all development, and our contribution to a better world is to spread vital knowledge. Our goal with this platform is therefore to collect and share experiences, knowledge and networks that enable and empower people that want to engage in initiatives that strive to create an enlightened world. At the moment we have not one, but five (!) Knowel projects running simultaneousl</p></div>'+ 
        '<div class="line"></div>'+
        '<div class="symbolAreaContainer">'+ 
          '<div class="symbolContainer">'+
            '<div class="symbolImage"><img src="http://localhost:8000/img/openness.svg"></div>'+
            '<h1 class="iconHeader">Openess</h1>'+
            '<h3 class="iconSubHeader">We are flexible and open to new approaches.</h3>'+
          '</div>'+
          '<div class="symbolContainer">'+
            '<div class="symbolImage"><img src="http://localhost:8000/img/knowledge.svg"></div>'+
            '<h1 class="iconHeader">Knowledge</h1>'+
            '<h3 class="iconSubHeader">We focus on transferring knowledge, both to others and to ourselves.</h3>'+
          '</div>'+
          '<div class="symbolContainer">'+
            '<div class="symbolImage"><img src="http://localhost:8000/img/Sustainability.svg"></div>'+
            '<h1 class="iconHeader">Sustainability</h1>'+
            '<h3 class="iconSubHeader">We work long-term and strive to create independence.</h3>'+
          '</div>'+
        '</div>'+
        '<div class="line"></div>'+
       '<h1 class="boardHeader"> Our Board </h1>' +
       '<div class="boardContainer" id="boardContainer">'+
        products.map(renderBoardMemberInformation).join('\n')+
        '</div>'
}
function renderBoardMemberInformation(boardMember) {
  console.log(boardMember.fields.boardMemberImage.fields.file.url)
  return '<div class="profileContainer">' +
    '<div class="profileImage">'+
    '<img class="profileImage" src="'+boardMember.fields.boardMemberImage.fields.file.url+'" />'+
    '</div>' +
    '<h2 class="profileName">' +
    boardMember.fields.boardMemberName +
    '</h2>' +
    '</div>'
}
}());

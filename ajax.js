$(document).ready(function(){
  
  /*
  Upload File to folder on change
  ____________________________________________________
  */

  $('#fileToUpload').on('change', function(){

     var fileToUpload = this.files[0];   
      var form_data = new FormData();                  
      form_data.append('fileToUpload', fileToUpload);                           
      $.ajax({
                  url: 'upload.php', // point to server-side PHP script 
                  dataType: 'html',  // what to expect back from the PHP script, if anything
                  cache: false,
                  contentType: false,
                  processData: false,
                  data: form_data,                         
                  type: 'post',
                  success: function(reponse){
                      console.log(response);
                  }
       });

       });
  
  /*
  Show and Hide Contact Seller Form
  ________________________________________________________
  */
  
  $('.car__list').on('click', '#c-seller', function(){
   $('.contact-form-overlay').show();
    $('html').addClass('no-scroll');
  });
  
  $('html').on('click', '.close-anchor', function(){
    $('.contact-form-overlay').hide();
    $('html').removeClass('no-scroll');
  });

});
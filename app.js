/*
Car Data Controller
_______________________________________________
*/
 var carDataController = (function(){


   var Car = function(Id, image, make, model, year, price, city, state){
     this.Id = Id;
     this.image = image;
     this.make = make;
     this.model = model;
     this.year = year;
     this.price = price;
     this.city = city;
     this.state = state;
   };


   var data = {
     allItems: {
       car: []
     }
   };

   return {

     addItem: function(image,make,model,year,price,city,state){

       var newItem, ID;

       if(data.allItems.car.length > 0){
         ID = data.allItems.car[data.allItems.car.length - 1].id + 1;
         console.log(ID);
       } else {
         ID = 0;
       }

       newItem = new Car(ID, image, make, model, year, price, city, state);

       data.allItems.car.push(newItem);

       return newItem;

     },

     testing: function(){
       console.log(data);
     }

   };

 })();

/*
UI Controller
_________________________________________________
*/
 var UIController = (function(){

   var DOMstrings = {
     inputImage: 'fileToUpload',
     inputMake: '.add__make',
     inputModel: '.add__model',
     inputYear: '.add__year',
     inputPrice: '.add__price',
     inputCity: '.add__city',
     inputState: '.add__state',
     inputButton: '.add__btn',
     carListContainer: '.car__list'
   }

   return {

     getInput: function(){

       return {
         image: document.getElementById(DOMstrings.inputImage).files[0].name,
         make: document.querySelector(DOMstrings.inputMake).value,
         model: document.querySelector(DOMstrings.inputModel).value,
         year: parseInt(document.querySelector(DOMstrings.inputYear).value),
         price: parseInt(document.querySelector(DOMstrings.inputPrice).value),
         city: document.querySelector(DOMstrings.inputCity).value.toUpperCase(),
         state: document.querySelector(DOMstrings.inputState).value.toUpperCase()
       }

     },

     addCarListItem: function(obj){
       var html, newHtml, element;

       element = DOMstrings.carListContainer;
       
        html = '<div class="row car__item" id="car-%Id%"><div class="col-xs-12 col-sm-3"><div class="car__left__container"><img src="uploads/%image%"></div></div><div class="col-xs-12 col-sm-6"><div class="car__right__container"><div class="car__right__inner"><div class="car__make list"><span>Make: </span>%make%</div><div class="car__model list"><span>Model: </span>%model%</div><div class="car__year list"><span>Year: </span>%year%</div><div class="car__price list"><span>Price: </span>$ %price% dlls</div><div class="car__city list"><span>City: </span>%city%</div><div class="car_state list"><span>State: </span>%state%</div></div></div></div><div class="col-xs-12 col-sm-3"><div class="contact-seller"><div class="contact-seller-inner"><button class="btn btn-primary">Go to post</button><button class="btn btn-success" id="c-seller">Contact Seller</button></div></div></div></div>';

       newHtml = html.replace('%Id%', obj.Id);
       newHtml = html.replace('%image%', obj.image);
       newHtml = newHtml.replace('%make%', obj.make);
       newHtml = newHtml.replace('%model%', obj.model);
       newHtml = newHtml.replace('%year%', obj.year);
       newHtml = newHtml.replace('%price%', obj.price);
       newHtml = newHtml.replace('%city%', obj.city);
       newHtml = newHtml.replace('%state%', obj.state);

       document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

     },

     getDomStrings: function(){
       return DOMstrings;
     },

     clearFields: function(){
       var fields, fieldsArr;

       fields = document.querySelectorAll(DOMstrings.inputImage + ', ' + DOMstrings.inputMake + ', ' + DOMstrings.inputModel + ',' + DOMstrings.inputYear + ', ' + DOMstrings.inputPrice + ', ' + DOMstrings.inputCity + ', ' + DOMstrings.inputState);

       fieldsArr = Array.prototype.slice.call(fields);

       fieldsArr.forEach(function(current){
         current.value = '';
       });

     }

   };

 })();

/*
App Controller
__________________________________________________
*/
 var appController = (function(carDataCtrl, UIctrl){

   var setupEventListeners = function(){

     var DOM = UIctrl.getDomStrings();

     document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

   };

   var ctrlAddItem = function(event){

     var input, newItem;

     //1. Get field input data

     input = UIctrl.getInput();
     
      if(input.make === "" || input.make == null || !isNaN(input.make)){
        return;
      }
     
     if(input.model === "" || input.model == null || input.model <= 0){
       return;
      }
     
     if(input.year === "" || input.year == null || isNaN(input.year) || input.year <= 0 || input.year.toString().length < 4){
       return;
      }
     
      if(input.price === "" || input.price == null || isNaN(input.price) || input.price <= 0){
       return;
      }
     
      if(input.city === "" || input.city == null || !isNaN(input.city) ){
       return;
      }
     
     if(input.state === "" || input.state == null || !isNaN(input.state) ){
       return;
      }

     //2. add the item to car data controller

     newItem = carDataCtrl.addItem(input.image, input.make, input.model, input.year, input.price, input.city, input.state);

     //3. add new item to the UI

     UIctrl.addCarListItem(newItem);
     //4. clear the fields

     UIctrl.clearFields();

   }

   return {
     init: function(){
       console.log('Application has started');
       setupEventListeners();
     }
   }

 })(carDataController, UIController);

appController.init();

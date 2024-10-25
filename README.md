####FormBuilder

This a project for JavaScript/jQuery app that builds Web forms. The current version of the project is 1.0.0.  

The form building part of the app is pretty much complete and workable solution. The actual form part of the app is still under construction, as the data validation is incomplete.  You can also use the form builder to create your own forms by extending the app. 

Demo http://mysterious-caverns-1462.herokuapp.com/FormBuilder.html

The form builder part returns data that can be used to build your own plugin for form creation and validation. The get the data, you can access the fields to be included in the created form with the following JavaScript:
  ```
  var fb = new FormBuilder(); 
  
  fb.getFormData();
  ```

The above returns an array of field item objects that were created while using the form builder. The field items’ JSON representation is described in folder <a href="https://github.com/jyrkim/formbuilder/tree/master/json-schema">json-schema</a>. Those items that are returned by the function, can also be found by looking at Web page’s div elements that have class formBuilder; this works with Chrome’s developer tools. 

If you decide to use the app, then <a href="https://github.com/jyrkim/formbuilder/tree/master/dist">formBuilder.min.js</a> and <a href="https://github.com/jyrkim/formbuilder/tree/master/dist">formBuilder.min.css</a> needs to be referred on the Web page. In order to use the code you need also include jQuery and jQueryUI to make the code work. The <a href="https://github.com/jyrkim/formbuilder/tree/master/dist">img</a> folder containing the images for the form builder needs to be in the same folder as the Web page. 

The code has been tested with jQuery version 1.11.1 and jQueryUI version 1.11.0, and it works in Chrome, IE, Opera and Safari. A great deal of the testing has been done in Chrome. Firefox isn’t supported.
 
Most of the images in the project are from IcoMoon, https://icomoon.io/ and few from jQueryUI; only one image that is used is home made. So great thanks for IcoMoon and jQueryUI for those handy images. 

In the demo, a custom made jQueryUI theme is used for lighter image colors. The theme can be found from demo_formbuilder git repository’s folder <a href="https://github.com/jyrkim/demo_formbuilder/tree/master/public/css">public/css</a>.

The form part of the project that is under construction uses <a href="http://getbootstrap.com/">Bootstrap version 3</a>.

The form builder’s appearance and usability resemble quite a lot of one well-known Forms app that I admire a lot; so only most of the JavaScript/jQuery/JSON in the project is original, apart from jQuery and jQueryUI libraries that are used in the project. 



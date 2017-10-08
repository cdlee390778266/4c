// GIA Carat Tool jQuery Plugin

// Gemological Institute of America 4Cs Tool 

// version 1.05, April 22th, 2016

// by Ali Farhoumand 

// ali.farhoumand@gia.edu



// drawGIACaratTool plugin!

(function($) {



    // here we go!

    $.drawGIACaratTool = function(element, options) {



        // plugin's default options

        // this is private property and is accessible only from inside the plugin

        var defaults = {



            language: 'en',

            noWatermark: false,



            // if your plugin is event-driven, you may provide callback capabilities

            // for its events. execute these functions before or after events of your 

            // plugin, so that users may customize those particular events without 

            // changing the plugin's code

            onFoo: function() {}



        }



        // to avoid confusions, use "plugin" to reference the 

        // current instance of the object

        var plugin = this;



        // this will hold the merged default, and user-provided options

        // plugin's properties will be available through this object like:

        // plugin.settings.propertyName from inside the plugin or

        // element.data('pluginName').settings.propertyName from outside the plugin, 

        // where "element" is the element the plugin is attached to;

        plugin.settings = {}



        var $element = $(element), // reference to the jQuery version of DOM element

             element = element,    // reference to the actual DOM element



            // Getting initial values to create a slider for the first time

            firstSliderValue = $("#firstSliderValue").html(),

            firstSliderImageSize = $("#firstSliderImageSize").html();



     



        // the "constructor" method that gets called when the object is created

        plugin.init = function() {



            // the plugin's final properties are the merged default and 

            // user-provided options (if any)

            plugin.settings = $.extend({}, defaults, options);



            // Check if 'Courtesy of GIA' need to be removed from the tool

            (options.noWatermark) ? $(".GIACourtesy, #toolTitle").css('visibility','hidden') : $(".GIACourtesy, #toolTitle").css('visibility','visible');



            createSlider(firstSliderValue, firstSliderImageSize); 

            // makeTheCaratToolSkeleton();



        }







        // Click handler

        $("button").click(function() {



            var firstSliderValue = $("#firstSliderValue").html(),

                firstSliderImageSize = $("#firstSliderImageSize").html(),

                secondSliderValue = $("#secondSliderValue").html(),

                secondSliderImageSize = $("#secondSliderImageSize").html(),

                clicks = $(this).data("clicks");



            if (clicks) {

                 // Reset the slider

                 $("#slider-range").slider("destroy");

                 $(".target_2").css("display","none");

                 $("#addbtn").css("display","block");

                 $("#resetbtn").css("display","none");



                 createSlider(firstSliderValue, firstSliderImageSize);



            } else {

                 // Adding second handle to the Slider         

                 secondSliderValue = (firstSliderValue>250) ? firstSliderValue - 80 : parseInt(firstSliderValue) + 80;

                 secondSliderImageSize = calculateStoneSize(secondSliderValue);



                 // twoSliderValues = [firstSliderValue, secondSliderValue];

                 $("#slider-range").slider("destroy");

                 $("#addbtn").css("display","none");

                 $("#resetbtn").css("display","block");



                 createSlider(firstSliderValue, firstSliderImageSize, secondSliderValue, secondSliderImageSize);



            }

            $(this).data("clicks", !clicks);

        }); // ENDS Click handler



        // Calculate diamond image size based on slider handler position

        function calculateStoneSize (slidervalue) {



            var fraction ='';



            if(slidervalue<10){

              fraction = ((31 + slidervalue + slidervalue / 16) +15) * slidervalue / 100;



            }else if(slidervalue<20){

              fraction = ((32 + slidervalue + slidervalue / 15) + 15) * slidervalue / 100;



            }else if(slidervalue<30){

              fraction = ((33 + slidervalue + slidervalue / 14) + 15) * slidervalue / 100;



            }else if(slidervalue<40){

              fraction = ((34 + slidervalue + slidervalue / 13) + 15) * slidervalue / 100;



            }else{

              fraction = (35 + slidervalue / 12);

            }



            return fraction;

        } // Calculate diamond image size



        // Create Slider Function

        var createSlider = function(firstSliderValue, firstSliderImageSize, secondSliderValue, secondSliderImageSize) {



          // First time initiation for single slider

          var activeImg = $(".target"),

              fraction;

          

          // Check if it has more than one slider

          if(secondSliderImageSize) {



            // Create and position the image for the new slider

            $(".target_2").show();

            $(".target_2").css('background-size',secondSliderImageSize+"%");

            $(".target_2").css('left', secondSliderValue/5+"%");





            // Position the slider and it's image based on previous state

            $(".target").css('background-size',firstSliderImageSize+"%");

            $(".target").css('left', firstSliderValue/5+"%");



            // Multiple Slider

            $("#slider-range").slider({

                values: [firstSliderValue,secondSliderValue],

                min: 0,

                max: 500,

                step: 1,

                slide: function (event, ui) {



                    var activeSlider,

                        secondImage;



                    // Check which slider is moving and assign it's image to it correspondent slider

                    if(ui.values[0] == ui.value) {

                        activeSlider = ui.values[0];

                        activeImg = $(".target");

                        secondImage = false;



                    }else if(ui.values[1] == ui.value) {

                        activeSlider = ui.values[1];

                        activeImg = $(".target_2");

                        secondImage = true;



                    }else{

                        console.error("Where are the sliders bro!?");



                    }



                    fraction = calculateStoneSize(activeSlider)

                    activeImg.css('background-size',fraction+"%");

                    activeImg.css('left', activeSlider/5+"%");



                    // Passing current values to info panel

                    if(!secondImage) {

                      $("#firstSliderValue").html(activeSlider);

                      $("#firstSliderImageSize").html(fraction);



                    }else{

                      $("#secondSliderValue").html(activeSlider);

                      $("#secondSliderImageSize").html(fraction);

                      

                    }



                }

            }); // ENDS Multiple Slider



          } else {



            $(".target").css('background-size',firstSliderImageSize+"%");

            $(".target").css('left', firstSliderValue/5+"%");

            // console.log("Function running"+firstSliderImageSize)  



            // Single Slider

            $("#slider-range").slider({

                value: firstSliderValue,

                min: 0,

                max: 500,

                step: 1,

                slide: function (event, ui) {



                    fraction = calculateStoneSize(ui.value)

                    activeImg.css('background-size',fraction+"%");



                    // Fetch slider position to align image with handler

                    var sliderPos = $("span.ui-slider-handle");

                    offs = sliderPos.offset();

                    activeImg.css('left', ui.value/5+"%");



                    // Passing current values to info panel

                    $("#firstSliderValue").html(ui.value);

                    $("#firstSliderImageSize").html(fraction);





                }

            }); // ENDS Single Slider

          }

        } // ENDS Create Slider Function



        // fire up the plugin!

        // call the "constructor" method

        plugin.init();



    }



    // add the plugin to the jQuery.fn object

    $.fn.drawGIACaratTool = function(options) {



        // iterate through the DOM elements we are attaching the plugin to

        return this.each(function() {



            $(this).append(chooseToolLanguage(options.language));





            // if plugin has not already been attached to the element

            if (undefined == $(this).data('drawGIACaratTool')) {

                // create a new instance of the plugin

                // pass the DOM element and the user-provided options as arguments

                var plugin = new $.drawGIACaratTool(this, options);



                // in the jQuery version of the element

                // store a reference to the plugin object

                // you can later access the plugin and its methods and properties like

                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or

                // element.data('pluginName').settings.propertyName

                $(this).data('drawGIACaratTool', plugin);



            }



        });





        // Choose the language for the tool

        function chooseToolLanguage (lang){



            // var englishCaratTool = "<div class='en_tool' id='weightWrapper'><div id='toolTitle' style='display: none;'><div>MEASURING DIAMOND</div><div>CARAT WEIGHT</div></div><div id='infoBtn' style='display: none;'><button id='btn'>Add a second </br>diamond to the scale </br>to compare sizes</button></div><!-- Info panel --><div style='display:none;'><div style='position: absolute; top: 0px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Value : </div><div id='firstSliderValue' style='position: absolute; top: 0px; right: 10px; font-size: 30px;'>87</div><div style='position: absolute; top: 40px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Image Size : </div><div id='firstSliderImageSize' style='position: absolute; top: 40px; right: 10px; font-size: 30px;'>42.5</div><div style='position: absolute; top: 80px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Value : </div><div id='secondSliderValue' style='position: absolute; top: 80px; right: 10px; font-size: 30px;'>0</div><div style='position: absolute; top: 120px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Image Size : </div><div id='secondSliderImageSize' style='position: absolute; top: 120px; right: 10px; font-size: 30px;'>0</div></div><div class='carat-tool'><div class='caratScale'><span id='ref'>Reference only. True diamond size may vary based on monitor size. <br />Move slider to view diamond carat weight.</span></div><!-- Slider --><div id='slider-range'><!-- First Diamond image --><div class='target'></div><!-- Second Diamond image --><div class='target_2' style='display:none;'></div></div><div class='GIACourtesy'> Courtesy of GIA </div></div></div>"; 

            var englishCaratTool = "<div class='en_tool' id='weightWrapper'><div id='toolTitle' style='display: none;'><div>MEASURING DIAMOND</div><div>CARAT WEIGHT</div></div><div id='infoBtn' style='display: none;'><button id='btn'><span id='addbtn'>Add a second </br>diamond to the scale </br>to compare sizes</span><span id='resetbtn'>Reset slider</span></button></div><!-- Info panel --><div style='display:none;'><div style='position: absolute; top: 0px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Value : </div><div id='firstSliderValue' style='position: absolute; top: 0px; right: 10px; font-size: 30px;'>87</div><div style='position: absolute; top: 40px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Image Size : </div><div id='firstSliderImageSize' style='position: absolute; top: 40px; right: 10px; font-size: 30px;'>42.5</div><div style='position: absolute; top: 80px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Value : </div><div id='secondSliderValue' style='position: absolute; top: 80px; right: 10px; font-size: 30px;'>0</div><div style='position: absolute; top: 120px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Image Size : </div><div id='secondSliderImageSize' style='position: absolute; top: 120px; right: 10px; font-size: 30px;'>0</div></div><div class='carat-tool'><div class='caratScale'><span id='ref' style='display: none;'>Reference only. True diamond size may vary based on monitor size. <br />Move slider to view diamond carat weight.</span></div><!-- Slider --><div id='slider-range'><!-- First Diamond image --><div class='target'></div><!-- Second Diamond image --><div class='target_2' style='display:none;'></div></div><div class='GIACourtesy' style='display: none;'>Courtesy of <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=carat_en' target='_blank'>GIA</a></div></div></div>"; 

            var chineseCaratTool = "<div class='cn_tool' id='weightWrapper'><div id='toolTitle' style='display: none;'><div>测量钻石</div><div>克拉重量</div></div><div id='infoBtn' style='display: none;'><button id='btn'><span id='addbtn'>添加另一颗钻石到标尺上，</br>比较其尺寸 </span><span id='resetbtn'>重新设置滑块</span></button></div><!-- Info panel --><div style='display:none;'><div style='position: absolute; top: 0px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Value : </div><div id='firstSliderValue' style='position: absolute; top: 0px; right: 10px; font-size: 30px;'>87</div><div style='position: absolute; top: 40px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Image Size : </div><div id='firstSliderImageSize' style='position: absolute; top: 40px; right: 10px; font-size: 30px;'>42.5</div><div style='position: absolute; top: 80px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Value : </div><div id='secondSliderValue' style='position: absolute; top: 80px; right: 10px; font-size: 30px;'>0</div><div style='position: absolute; top: 120px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Image Size : </div><div id='secondSliderImageSize' style='position: absolute; top: 120px; right: 10px; font-size: 30px;'>0</div></div><div class='carat-tool'><div class='caratScale'><span id='ref'>仅供参考。 真实的钻石尺寸与显示器上的尺寸会有差异。 <br />移动滑块，查看钻石的克拉重量。</span></div><!-- Slider --><div id='slider-range'><!-- First Diamond image --><div class='target'></div><!-- Second Diamond image --><div class='target_2' style='display:none;'></div></div><div class='GIACourtesy'> 由 <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/CN?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=carat_cn' target='_blank'>GIA</a> 友情提供 </div></div></div>";

            var japaneseCaratTool = "<div class='ja_tool' id='weightWrapper'><div id='toolTitle' style='display: none;'><div>ダイヤモンドの測定</div><div>カラット重量</div></div><div id='infoBtn' style='display: none;'><button id='btn'><span id='addbtn'>サイズを比較するため、</br>スケールに二つ目のダイヤモンドを追加してください。</span><span id='resetbtn'>スライダーをリセットする。</span></button></div><!-- Info panel --><div style='display:none;'><div style='position: absolute; top: 0px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Value : </div><div id='firstSliderValue' style='position: absolute; top: 0px; right: 10px; font-size: 30px;'>87</div><div style='position: absolute; top: 40px; right: 320px; font-size: 20px;padding-top: 5px;'>First Slider Image Size : </div><div id='firstSliderImageSize' style='position: absolute; top: 40px; right: 10px; font-size: 30px;'>42.5</div><div style='position: absolute; top: 80px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Value : </div><div id='secondSliderValue' style='position: absolute; top: 80px; right: 10px; font-size: 30px;'>0</div><div style='position: absolute; top: 120px; right: 320px; font-size: 20px;padding-top: 5px;'>Second Slider Image Size : </div><div id='secondSliderImageSize' style='position: absolute; top: 120px; right: 10px; font-size: 30px;'>0</div></div><div class='carat-tool'><div class='caratScale'><span id='ref'>参考の目的のみ。 実際のダイヤモンドのサイズは、モニターのサイズにより異なります。<br />ダイヤモンドのカラットを表示するには、スライダーを移動してください。</span></div><!-- Slider --><div id='slider-range'><!-- First Diamond image --><div class='target'></div><!-- Second Diamond image --><div class='target_2' style='display:none;'></div></div><div class='GIACourtesy'> 提供：<a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/JP?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=carat_jp' target='_blank'>GIA</a> </div></div></div>";



            

            switch(lang) {

                case 'cn':

                    return chineseCaratTool;

                    break;

                case 'ja':

                    return japaneseCaratTool;

                    break;

                default:

                    return englishCaratTool

            }

            

        }



    }



})(jQuery);


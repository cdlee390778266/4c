// GIA Cut Tool jQuery Plugin

// Gemological Institute of America 4Cs Tool 

// version 4.23, April 6th, 2016

// by Ali Farhoumand 

// ali.farhoumand@gia.edu



// drawGIACutTool plugin!

(function($) {



    // here we go!

    $.drawGIACutTool = function(element, options) {



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

             element = element;    // reference to the actual DOM element



        // the "constructor" method that gets called when the object is created

        plugin.init = function() {



            // the plugin's final properties are the merged default and 

            // user-provided options (if any)

            plugin.settings = $.extend({}, defaults, options);



            // Check if 'Courtesy of GIA/ Tool title' need to be removed from the tool

            (options.noWatermark) ? $(".GIACourtesy, div#descHeader").css('visibility','hidden') : $(".GIACourtesy, div#descHeader").css('visibility','visible');



            makeTheCutToolSkeleton();





            $(".magnify").click(function(e){

                e.preventDefault();

                var imageID = $(this).attr('href');

                $(".box .content img").css({

                    'width':570,

                    'max-width':570,

                    'height':300

                });

                $(".sliderHandleContainer").css("z-index","-1");

                $(".bx-default-pager").css("z-index","-1");

                $("#"+imageID).show();

            })

            $(".box").click(function(){

                $(".sliderHandleContainer").css("z-index","100");

                $(".bx-default-pager").css("z-index","100");

                $('.lightbox').hide();

            })



        }







        // a private method. for creating the Cut tool

        var makeTheCutToolSkeleton = function() {



            // Creating a slider for different cuts

            var select = $( "#cut" );

            var slider = $( "<div id='CutSlider'></div>" ).insertAfter(select).slider({

              min: 0,

              max: 400,

              value: 0,

              orientation: "vertical",

              slide: function( event, ui ) {

                var sliderPositionStep = Math.round(ui.value/200);

                select[ 0 ].selectedIndex = sliderPositionStep - 1;



                $("div.active span.cutDesc").css("display","none");

                $("div.cutType").removeClass("active");

                $("div.cutType:eq("+sliderPositionStep+")").addClass("active");

                

                $("div.active span.cutDesc").css("display","block");



                // Logging

                // console.log("Option " + ui.value + " is showing.");

              }

            });



            slider.slider("value", "400");

            $("div.cutType:eq(4)").addClass("active");



            // Cut variation images

            $("#excellentPics, #vGoodPics, #goodtPics, #fairPics, #poorPics").each(function(){

              var thisCutVariation = $(this).bxSlider({ 

                mode: "fade", 

                controls: false, 

                auto: false 

              });



              $(this).find(".cut-images").click(function(e){

                e.preventDefault();

                thisCutVariation.goToNextSlide();

                return false;

              })

            });



            // Adding default style for cut variation container and it's description

            $("div.cutType div.bx-viewport").height(200);

            $("div#cutTool div.bx-viewport").width(500);

            $("div.cutType div.bx-viewport li").css('max-width',500);

            $("div.cutType div.bx-viewport li").css('width',485);

            $("div#cutTool div.bx-viewport").css("overflow","visible");

            $("div#cutTool .bx-wrapper .cut-images img").css('max-width',400);

            $("div#cutTool .bx-wrapper .cut-images img").css('padding-left',32);

            $("div#cutTool div.bx-viewport ul").css("padding-left", "45px");

            $("div#cutTool div.bx-viewport ul").css("margin", 0);

            $("div#cutTool div.bx-wrapper").css({

                "max-width":"600px",

                "display":"inline-block"

              });

            

        }



        // fire up the plugin!

        // call the "constructor" method

        plugin.init();



    }



    // add the plugin to the jQuery.fn object

    $.fn.drawGIACutTool = function(options) {



        // iterate through the DOM elements we are attaching the plugin to

        return this.each(function() {



            $(this).append(chooseToolLanguage(options.language));





            // if plugin has not already been attached to the element

            if (undefined == $(this).data('drawGIACutTool')) {

                // create a new instance of the plugin

                // pass the DOM element and the user-provided options as arguments

                var plugin = new $.drawGIACutTool(this, options);



                // in the jQuery version of the element

                // store a reference to the plugin object

                // you can later access the plugin and its methods and properties like

                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or

                // element.data('pluginName').settings.propertyName

                $(this).data('drawGIACutTool', plugin);



            }



        });





        // Choose the language for the tool

        function chooseToolLanguage (lang){



            var englishCutTool = "<div class='en_tool' id='cutWrapper'> <div id='toolDesc' style='display: none;'> <div id='descHeader'> <div> DIAMOND </div><div> CUT GRADING </div></div></div><div id='cutTool'> <div class='itemContainer'> <div class='cutType' id='Poor'> <div class='cutTitle'> POOR </div><ul id='poorPics'> <li> <a class='cut-images' href=''><img src='../images/rd39.jpg'></a> <a class='magnify' href='rd39'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its weight ratio. Although most of the proportions for this diamond are fairly standard, the extremely thick girdle greatly increases the total depth. Therefore, this diamond's diameter is much smaller than its carat weight would indicate.</span> <div class='lightbox' id='rd39'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd39.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd45.jpg'></a> <a class='magnify' href='rd45'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its fire and scintillation. This slightly steep crown angle, very steep pavilion angle, and large total depth all cause this diamond to have a very dark table area, along with very dark upper-girdle areas.</span> <div class='lightbox' id='rd45'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd45.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd43.jpg'></a> <a class='magnify' href='rd43'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is also limited by its weight ratio. The somewhat steep crown angle, slightly steep pavilion angle, and very thick girdle greatly increase the total depth. Therefore, this diamond's diameter is much smaller than its carat weight would indicate.</span> <div class='lightbox' id='rd43'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd43.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Fair'> <div class='cutTitle'> FAIR </div><ul id='fairPics'> <li> <a class='cut-images' href=''><img src='../images/rd19.jpg'></a> <a class='magnify' href='rd19'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its scintillation. The combination of a shallow crown angle and a somewhat shallow pavilion angle leads to a face-up appearance with a lack of contrast and general darkness.</span> <div class='lightbox' id='rd19'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd19.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd33.jpg'></a> <a class='magnify' href='rd33'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is determined by its fire, scintillation, and weight ratio. A slightly steep crown angle, combined with a steep pavilion angle and large total depth, causes this diamond to display general darkness in the table area and very dark upper-girdle areas.</span> <div class='lightbox' id='rd33'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd33.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd37.jpg'></a> <a class='magnify' href='rd37'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its brightness and scintillation. The large table and a somewhat shallow crown height, with this pavilion angle, cause a general darkness in this diamond, along with a slight fisheye that becomes more evident when the diamond is tilted.</span> <div class='lightbox' id='rd37'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd37.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Good'> <div class='cutTitle'> GOOD </div><ul id='goodtPics'> <li> <a class='cut-images' href=''><img src='../images/rd22.jpg'></a> <a class='magnify' href='rd22'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its scintillation. In this case, the somewhat shallow pavilion angle produces dark pavilion mains.</span> <div class='lightbox' id='rd22'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd22.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd11.jpg'></a> <a class='magnify' href='rd11'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is determined by its fire, scintillation, and weight ratio. A somewhat steep crown angle, combined with a slightly steep pavilion and this total depth, leads to a diamond that displays a slightly dark ring within the table edge, as well as somewhat dark upper-girdle facets.</span> <div class='lightbox' id='rd11'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd11.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd06.jpg'></a> <a class='magnify' href='rd06'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is limited by its scintillation. The shallow crown angle and low crown height lead to a face-up appearance with a lack of contrast in its pattern and localized darkness (especially in the table area).</span> <div class='lightbox' id='rd06'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd06.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='VGood'> <div class='cutTitle'> VERY GOOD </div><ul id='vGoodPics'> <li> <a class='cut-images' href=''><img src='../images/rd16.jpg'></a> <a class='magnify' href='rd16'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is determined by brightness, scintillation, and polish. Although no individual proportions would necessarily cause its brightness or scintillation to perform poorly, the combination of this particular set of proportions leads to increased darkness in the pavilion mains.</span> <div class='lightbox' id='rd16'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd16.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd07.jpg'></a> <a class='magnify' href='rd07'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is determined by its fire, scintillation, and weight ratio. It has a \"splintery\" pattern, most likely caused by a higher crown height with a somewhat steeper crown angle, accompanied by long lower-girdle facets.</span> <div class='lightbox' id='rd07'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd07.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd03.jpg'></a> <a class='magnify' href='rd03'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond's grade is determined by its brightness, scintillation, and finish. There is a slight darkening within the table and along the upper-girdle facets.</span> <div class='lightbox' id='rd03'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd03.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Excellent'> <div class='cutTitle'> EXCELLENT </div><ul id='excellentPics'> <li> <a class='cut-images' href=''><img src='../images/rd01.jpg'></a> <a class='magnify' href='rd01'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>The diamond, which has an even pattern of bright and dark areas, scores in the top category for all grade-setting determinants.</span> <div class='lightbox' id='rd01'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd01.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd08.jpg'></a> <a class='magnify' href='rd08'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>Although its proportions are different from the diamond in the first example, this diamond also has an even pattern of bright and dark areas and scores in the top category for all grade-setting determinants.</span> <div class='lightbox' id='rd08'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd08.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd20.jpg'></a> <a class='magnify' href='rd20'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>This diamond also scores in the top category for all grade-setting determinants.</span> <div class='lightbox' id='rd20'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd20.jpg'> </div></div></div></li></ul> </div><div id='toolHelp'> <div> Move the slider to view examples of different diamond cut grades.<br>Click images to view different cuts. </div></div><div class='GIACourtesy'> Courtesy of <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=cut_en' target='_blank'>GIA</a> </div></div><div class='sliderHandleContainer'> <div class='cutRuler'></div><form id='cutScale' name='cutScale'> <select id='cut' name='cut'> <option> 1 </option> <option> 2 </option> <option> 3 </option> <option> 4 </option> <option> 5 </option> </select> </form> </div></div></div>"; 

            var chineseCutTool = "<div class='cn_tool' id='cutWrapper'> <div id='toolDesc' style='display: none;'> <div id='descHeader'> <div> 钻石 </div><div> 切工等级 </div></div></div><div id='cutTool'> <div class='itemContainer'> <div class='cutType' id='Poor'> <div class='cutTitle'> 不良 </div><ul id='poorPics'> <li> <a class='cut-images' href=''><img src='../images/rd39.jpg'></a> <a class='magnify' href='rd39'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>此钻石的等级受到其重量比的限制。 尽管此钻石的大部分比例都相当标准，但极厚的腰围大大增加了钻石的全深。 因此，此钻石的实际直径远远小于其克拉重量应有的直径。</span> <div class='lightbox' id='rd39'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd39.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd45.jpg'></a> <a class='magnify' href='rd45'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>此钻石的等级受到其火彩和闪光的限制。 略陡的冠角结合极陡的底角和较大的全深，让这颗钻石的桌面和腰上刻面非常黯淡。</span> <div class='lightbox' id='rd45'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd45.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd43.jpg'></a> <a class='magnify' href='rd43'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>此钻石的等级受到其重量比的限制。 较陡的冠角和略陡的底角结合极厚的腰围，增加了钻石的全深。 因此，此钻石的实际直径远远小于其克拉重量应有的直径。</span> <div class='lightbox' id='rd43'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd43.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Fair'> <div class='cutTitle'> 尚可（Fair）<span class='cutTitle-txt'>代表全球粗糙度为35%的钻石切工，仍然是优质钻石，但是一般切工加工的钻石反射的光线不及G级切工。</span></div><ul id='fairPics'> <li><div>案例一</div> <a class='cut-images' href=''><img src='../images/rd19.jpg'></a> <a class='magnify' href='rd19'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级受到它的闪烁的限制。一个浅冠角和一个稍微浅的亭子角相结合，导致一个脸上的外观，缺乏对比和一般的黑暗。</p><p>This diamond's grade is limited by its scintillation. The combination of a shallow crown angle and a somewhat shallow pavilion angle leads to a face-up appearance with a lack of contrast and general darkness.</p></span> <div class='lightbox' id='rd19'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd19.jpg'> </div></div></div></li><li><div>案例二</div> <a class='cut-images' href=''><img src='../images/rd33.jpg'></a> <a class='magnify' href='rd33'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级取决于它的火焰、闪烁和重量比。一个稍微陡峭的冠角，结合一个陡峭的亭角和大的总深度，使这个钻石显示一般黑暗的表区和非常黑暗的腰带区域。</p><p>his diamond's grade is determined by its fire, scintillation, and weight ratio. A slightly steep crown angle, combined with a steep pavilion angle and large total depth, causes this diamond to display general darkness in the table area and very dark upper-girdle areas.</p></span> <div class='lightbox' id='rd33'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd33.jpg'> </div></div></div></li><li><div>案例三</div> <a class='cut-images' href=''><img src='../images/rd37.jpg'></a> <a class='magnify' href='rd37'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级受到它的亮度和闪烁的限制。大桌子和一个稍微浅的冠高，带有这个亭子的角度，导致这个钻石一般的黑暗，伴随着一个轻微的鱼眼，当钻石倾斜时变得更加明显。</p><p>This diamond's grade is limited by its brightness and scintillation. The large table and a somewhat shallow crown height, with this pavilion angle, cause a general darkness in this diamond, along with a slight fisheye that becomes more evident when the diamond is tilted.</p></span> <div class='lightbox' id='rd37'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd37.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Good'> <div class='cutTitle'> 良好（Good）<span class='cutTitle-txt'>代表全球大约25%的钻石切工。是钻石反射了大部分进入钻石内部的光。</span> </div><ul id='goodtPics'> <li> <div>案例一</div><a class='cut-images' href=''><img src='../images/rd22.jpg'></a> <a class='magnify' href='rd22'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级受到它的闪烁的限制。在这种情况下，有点浅的亭子角会产生黑暗的亭子。</p><p>his diamond's grade is limited by its scintillation. In this case, the somewhat shallow pavilion angle produces dark pavilion mains.</p></span> <div class='lightbox' id='rd22'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd22.jpg'> </div></div></div></li><li><div>案例二</div> <a class='cut-images' href=''><img src='../images/rd11.jpg'></a> <a class='magnify' href='rd11'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级取决于它的火焰、闪烁和重量比。一个陡峭的皇冠角，加上稍微陡峭的亭子和这个总的深度，导致一个钻石，显示一个稍微黑暗的戒指在表的边缘，以及一些黑暗的上腰带方面。</p><p>his diamond's grade is determined by its fire, scintillation, and weight ratio. A somewhat steep crown angle, combined with a slightly steep pavilion and this total depth,leads to a diamond that displays a slightly dark ring within the table edge, as well as somewhat dark upper-girdle facets.</p></span> <div class='lightbox' id='rd11'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd11.jpg'> </div></div></div></li><li><div>案例三</div> <a class='cut-images' href=''><img src='../images/rd06.jpg'></a> <a class='magnify' href='rd06'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级受到它的闪烁的限制。浅冠角和低冠高导致一个脸上出现在它的模式和局部黑暗缺乏对比（特别是在表面积）。</p><p>his diamond's grade is limited by its scintillation. The shallow crown angle and low crown height lead to a face-up appearance with a lack of contrast in its pattern and localized darkness (especially in the table area).</p></span> <div class='lightbox' id='rd06'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd06.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='VGood'> <div class='cutTitle'> 优良（Very Good)  <span class='cutTitle-txt'>代表全球大约15%的钻石切工。可以使钻石反射出和标准等级切工的光芒，但是价格稍高。</span> </div><ul id='vGoodPics'> <li><div>案例一</div> <a class='cut-images' href=''><img src='../images/rd16.jpg'></a> <a class='magnify' href='rd16'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级是由亮度、闪烁和抛光决定的。虽然没有单独的比例必然会导致其亮度或闪烁表现不佳，这一特定比例的组合导致增加黑暗的凉亭电源。</p><p>his diamond's grade is determined by brightness, scintillation, and polish. Although no individual proportions would necessarily cause its brightness or scintillation to perform poorly, the combination of this particular set of proportions leads to increased darkness in the pavilion mains.</p></span> <div class='lightbox' id='rd16'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd16.jpg'> </div></div></div></li><li><div>案例二</div> <a class='cut-images' href=''><img src='../images/rd07.jpg'></a> <a class='magnify' href='rd07'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级取决于它的火焰、闪烁和重量比。它有一个“粗糙”的格局，极有可能造成更高的树冠高度有点陡冠角，配以长下腰刻面。</p><p>his diamond's grade is determined by its fire, scintillation, and weight ratio. It has a \"splintery\" pattern, most likely caused by a higher crown height with a somewhat steeper crown angle, accompanied by long lower-girdle facets.</p></span> <div class='lightbox' id='rd07'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd07.jpg'> </div></div></div></li><li> <div>案例三</div><a class='cut-images' href=''><img src='../images/rd03.jpg'></a> <a class='magnify' href='rd03'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这个钻石的等级取决于它的亮度、闪烁度和光洁度。有一个轻微的黑暗中的表和沿腰带的方方面面。</p><p>his diamond's grade is determined by its brightness, scintillation, and finish. There is a slight darkening within the table and along the upper-girdle facets.</p></span> <div class='lightbox' id='rd03'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd03.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Excellent'> <div class='cutTitle'> 极优（Excellent)  <span class='cutTitle-txt'>代表全球只有3%的一流高质量钻石才能达到的标准，这种切工使钻石几乎反射了所有进入钻石的光线，一种高雅且杰出的切工。</span></div><ul id='excellentPics'> <li><div class='al'>案例一</div> <a class='cut-images' href=''><img src='../images/rd01.jpg'></a> <a class='magnify' href='rd01'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>钻石有一个光明和黑暗地区的偶数模式，分数在所有等级设置决定因素的顶级类别。</p><p>he diamond, which has an even pattern of bright and dark areas, scores in the top category for all grade-setting determinants.</p></span> <div class='lightbox' id='rd01'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd01.jpg'> </div></div></div></li><li><div>案例二</div> <a class='cut-images' href=''><img src='../images/rd08.jpg'></a> <a class='magnify' href='rd08'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>虽然它的比例不同于钻石在第一个例子，这个钻石也有一个光明和黑暗的地区和得分均匀模式。所有等级设置决定因素的顶级类别。</p><p>Although its proportions are different from the diamond in the first example, this diamond also has an even pattern of bright and dark areas and scores in the top category for all grade-setting determinants.</p></span> <div class='lightbox' id='rd08'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd08.jpg'> </div></div></div></li><li><div>案例三</div> <a class='cut-images' href=''><img src='../images/rd20.jpg'></a> <a class='magnify' href='rd20'><img src='../images/magnifier.png'/></a> <span class='cutDesc'><p>这颗钻石也在所有等级决定因素中名列第一。</p><p>his diamond also scores in the top category for all grade-setting determinants.</p></span> <div class='lightbox' id='rd20'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd20.jpg'> </div></div></div></li></ul> </div><div id='toolHelp'> <div style='display: none;'> 请移动滑块，观看不同钻石切工等级演示。 </div></div><div class='GIACourtesy' style='display: none;'> 由 <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/CN?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=cut_en' target='_blank'>GIA</a> 友情提供 </div></div><div class='sliderHandleContainer'> <div class='cutRuler'></div><form id='cutScale' name='cutScale'> <select id='cut' name='cut'> <option> 1 </option> <option> 2 </option> <option> 3 </option> <option> 4 </option> <option> 5 </option> </select> </form> </div></div></div>"; 

            var japaneseCutTool = "<div class='ja_tool' id='cutWrapper'> <div id='toolDesc' style='display: none;'> <div id='descHeader'> <div> ダイヤモンド </div><div> カットグレーディング </div></div></div><div id='cutTool'> <div class='itemContainer'> <div class='cutType' id='Poor'> <div class='cutTitle'> POOR（プア） </div><ul id='poorPics'> <li> <a class='cut-images' href=''><img src='../images/rd39.jpg'></a> <a class='magnify' href='rd39'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、その重量比が原因で抑えられてしまっています。 このダイヤモンドのほとんどのプロポーション項目はかなり標準的ですが、非常に厚いガードルで全体の深さが大幅に増大してしまっています。 したがって、このダイヤモンドの直径は、カラット重量から推定されるよりはるかに短くなります。</span> <div class='lightbox' id='rd39'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd39.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd45.jpg'></a> <a class='magnify' href='rd45'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、そのファイアーやシンチレーションが原因で抑えられてしまっています。 やや急なクラウン角度、非常に急なパビリオン角度、大きな全体の深さがすべてが要因となり、このダイヤモンドのテーブル部分とアッパーガードル部は非常に暗いものとなっています。</span> <div class='lightbox' id='rd45'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd45.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd43.jpg'></a> <a class='magnify' href='rd43'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードも、その重量比が原因で抑えられてしまっています。 やや急なクラウン角度、わずかに急なパビリオン角度、非常に厚いガードルで全体の深さが大幅に増大してしまっています。 したがって、このダイヤモンドの直径は、カラット重量から推定されるよりはるかに短くなります。</span> <div class='lightbox' id='rd43'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd43.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Fair'> <div class='cutTitle'> FAIR（フェア） </div><ul id='fairPics'> <li> <a class='cut-images' href=''><img src='../images/rd19.jpg'></a> <a class='magnify' href='rd19'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、そのシンチレーションが原因で抑えられてしまっています。 浅いクラウン角度とやや浅いパビリオン角度の組み合わせは、コントラストが欠如し全体的に暗いフェイスアップの外観をもたらしています。</span> <div class='lightbox' id='rd19'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd19.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd33.jpg'></a> <a class='magnify' href='rd33'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、ファイアー、シンチレーション、重量比が原因で抑えられてしまっています。 わずかに急なクラウン角度に、急なパビリオン角度と大きな全体の深さが組み合わさり、全体的に暗いテーブル部分と非常に暗いアッパーガードル部の原因となっています。</span> <div class='lightbox' id='rd33'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd33.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd37.jpg'></a> <a class='magnify' href='rd37'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、輝きとシンチレーションが原因で抑えられてしまっています。 大きなテーブルとやや浅いクラウンの高さは、このパビリオン角度とともに、ダイヤモンドの全体的な暗さや、傾けたときにはっきり分かるわずかなフィッシュアイの原因となっています。</span> <div class='lightbox' id='rd37'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd37.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Good'> <div class='cutTitle'> GOOD（グッド） </div><ul id='goodtPics'> <li> <a class='cut-images' href=''><img src='../images/rd22.jpg'></a> <a class='magnify' href='rd22'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、そのシンチレーションが原因で抑えられてしまっています。 この場合、やや浅いパビリオン角度が暗いパビリオンメインを作り出しています。</span> <div class='lightbox' id='rd22'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd22.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd11.jpg'></a> <a class='magnify' href='rd11'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、ファイアー、シンチレーション、重量比が原因で抑えられてしまっています。 やや急なクラウン角度に、わずかに急なパビリオンと全体の深さが合わさって、このダイヤモンドではテーブル端部にわずかに暗いリングが見られ、やや暗いアッパーガードルファセットも見られます。</span> <div class='lightbox' id='rd11'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd11.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd06.jpg'></a> <a class='magnify' href='rd06'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、そのシンチレーションが原因で抑えられてしまっています。 浅いクラウン角度とクラウンの低さが、コントラストに欠けるパターンと局所的な暗さ（特にテーブル部分）を見せるフェイスアップをもたらしています。</span> <div class='lightbox' id='rd06'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd06.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='VGood'> <div class='cutTitle'> VERY GOOD（ベリーグッド） </div><ul id='vGoodPics'> <li> <a class='cut-images' href=''><img src='../images/rd16.jpg'></a> <a class='magnify' href='rd16'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、輝き、シンチレーション、ポリッシュで決定されます。 必ずしも個々のプロポーションによって、その輝きやシンチレーションのグレードが低くなるわけではありませんが、この特定のプロポーションの組み合わせによってパビリオンメインが暗さを増してしまっています。</span> <div class='lightbox' id='rd16'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd16.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd07.jpg'></a> <a class='magnify' href='rd07'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、ファイアー、シンチレーション、重量比で決定されます。 これは破片の様なパターンを持ちます。クラウン角度が急でクラウンの高さが高めであることとともに、ロワーガードルファセットが長いことが原因となっている可能性が高いと思われます。</span> <div class='lightbox' id='rd07'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd07.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd03.jpg'></a> <a class='magnify' href='rd03'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドのグレードは、輝き、シンチレーション、フィニッシュで決まっています。 テーブル内と、アッパーガードルファセットに沿った部分がわずかに暗くなっています。</span> <div class='lightbox' id='rd03'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd03.jpg'> </div></div></div></li></ul> </div><div class='cutType' id='Excellent'> <div class='cutTitle'> EXCELLENT（エクセレント） </div><ul id='excellentPics'> <li> <a class='cut-images' href=''><img src='../images/rd01.jpg'></a> <a class='magnify' href='rd01'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>明るい部分と暗い部分が均等なパターンで存在するこのダイヤモンドは、グレードを決定するすべての要素においてトップのカテゴリーに該当します。</span> <div class='lightbox' id='rd01'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd01.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd08.jpg'></a> <a class='magnify' href='rd08'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>最初の例のダイヤモンドとはプロポーションは異なりますが、このダイヤモンドはグレードを決定するすべての要素でトップカテゴリーに該当するだけでなく、明るい部分と暗い部分が均等に存在するパターンを示します。</span> <div class='lightbox' id='rd08'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd08.jpg'> </div></div></div></li><li> <a class='cut-images' href=''><img src='../images/rd20.jpg'></a> <a class='magnify' href='rd20'><img src='../images/magnifier.png'/></a> <span class='cutDesc'>このダイヤモンドも、グレードを決定するすべての要素でトップのカテゴリーに入ります。</span> <div class='lightbox' id='rd20'> <div class='box'> <a class='close' href='#'>X</a> <div class='content'> <img src='../images/rd20.jpg'> </div></div></div></li></ul> </div><div id='toolHelp'> <div> ダイヤモンドカットの様々なグレードの例を表示するには、スライダーを移動してください。 </div></div><div class='GIACourtesy'> 提供：<a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/JP?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=cut_en' target='_blank'>GIA</a> </div></div><div class='sliderHandleContainer'> <div class='cutRuler'></div><form id='cutScale' name='cutScale'> <select id='cut' name='cut'> <option> 1 </option> <option> 2 </option> <option> 3 </option> <option> 4 </option> <option> 5 </option> </select> </form> </div></div></div>"; 



            switch(lang) {

                case 'cn':

                    return chineseCutTool;

                    break;

                case 'ja':

                    return japaneseCutTool;

                    break;

                default:

                    return englishCutTool

            }

            

        }



    }



})(jQuery);
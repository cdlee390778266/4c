// GIA Clarity Tool jQuery Plugin

// Gemological Institute of America 4Cs Tool 

// version 1.05, April 22th, 2016

// by Ali Farhoumand 

// ali.farhoumand@gia.edu



// drawGIAClarityTool plugin!

(function($) {



    // here we go!

    $.drawGIAClarityTool = function(element, options) {



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



            // Check if 'Courtesy of GIA' need to be removed from the tool

            (options.noWatermark) ? $("#descHeader, .GIACourtesy").css('visibility','hidden') : $("#descHeader, .GIACourtesy").css('visibility','visible');



            makeTheClarityToolSkeleton();



        }







        // a private method. for creating the Clarity tool

        var makeTheClarityToolSkeleton = function() {



            // Creating a slider for different clarities

            var select = $( "#clarity" );

            var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({

              min: 0,

              max: 1000,

              range: "min",

              value: 0,

              slide: function( event, ui ) {



                var sliderPositionStep = Math.round(ui.value/100);

                select[ 0 ].selectedIndex = sliderPositionStep - 1;



                $("div.clarityType").removeClass("active");

                $("div.clarityType:eq("+sliderPositionStep+")").addClass("active");

                $("div.clarityType:eq("+sliderPositionStep+") div.bx-viewport").height(150);

                $("div.clarityType:eq("+sliderPositionStep+") div.bx-viewport li").width(150);



                // // Logging

                // console.log("Option " + ui.value + " is showing.");

              }

            });



            slider.slider("value", "0");

            $("div.clarityType:eq(0)").addClass("active");



            // Showing images within slider

            $("#flPics, #ifPics, #vvs1Pics, #vvs2Pics, #vs1Pics, #vs2Pics, #si1Pics, #si2Pics, #i1Pics, #i2Pics, #i3Pics").each(function(){

              

              var thisClarityVariation = $(this).bxSlider({ 

                mode: "fade", 

                controls: false, 

                auto: false 

              });



              // Add onClick function on each image

              $(this).find(".clarity-images").click(function(e){

                e.preventDefault();
                return;

                thisClarityVariation.goToNextSlide();

                return false;

              })



            })





            // Styling for tooltip position

            $("div.bx-viewport").width(150);

            // $("div.bx-viewport ul").css("padding-left", "27px");

            $("div.bx-wrapper").css(

              {

                "max-width":"170px",

                "display":"inline-block"

              });





            // Tooltip

            $("div.clarityTypeToolTip").tooltip({

              position: ({my: "bottom-20", at:"left center"}),

              content: function(){

                var element = $(this);

                  return element.attr("title");

              }

            }); 

            // }).tooltip("open"); 



            $("div#keySymbols").tooltip({

              position: ({my: "left-150", at:"left+30 center-20", of:"#keySymbols"}),

              content: function(){

                var element = $(this);

                  return element.attr("title");

              }

            });

            

        }



        // fire up the plugin!

        // call the "constructor" method

        plugin.init();



    }



    // add the plugin to the jQuery.fn object

    $.fn.drawGIAClarityTool = function(options) {



        // iterate through the DOM elements we are attaching the plugin to

        return this.each(function() {



            $(this).append(chooseToolLanguage(options.language));





            // if plugin has not already been attached to the element

            if (undefined == $(this).data('drawGIAClarityTool')) {

                // create a new instance of the plugin

                // pass the DOM element and the user-provided options as arguments

                var plugin = new $.drawGIAClarityTool(this, options);



                // in the jQuery version of the element

                // store a reference to the plugin object

                // you can later access the plugin and its methods and properties like

                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or

                // element.data('pluginName').settings.propertyName

                $(this).data('drawGIAClarityTool', plugin);



            }



        });





        // Choose the language for the tool

        function chooseToolLanguage (lang){



            var englishClarityTool = "<div class='en_tool' id='clarityTool'><div id='descHeader' style='display: none;'><div>DIAMOND</div><div>CLARITY GRADING</div></div><div id='toolDesc' style='display: none;'><div style='display: none;' id='keySymbols' title=\"<div><img src='../images/ClarityScale_ENG.jpg' /></div>\">Key to Symbols</div></div><div class='clarityType' id='FL'><div class='clarityDesc'><span class='descIni'>(FL)</span><span class='descTitl'>无瑕级 (FL) </span><span class='descText'>钻石没有任何内含物或表面特征，最高净度品质的钻石，极其罕见</span></div><ul id='flPics'><li><a href='' class='clarity-images'><img src='../images/FL_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/FL_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/FL_3.jpg' /></a></li></ul></div><div class='clarityType' id='IF'><div class='clarityDesc'><span class='descIni'>(IF)</span><span class='descTitl'>内无瑕级 (IF)</span><span class='descText'>无可见内含物，仅有可见表面特征，只有专业分级师才能看到</span></div><ul id='ifPics'><li><a href='' class='clarity-images'><img src='../images/IF_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/IF_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/IF_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/if.jpg' /><p class='tooltipDesc' style='max-width:190px'> Polish Lines – Fine parallel grooves and ridges left by polishing; can occur on any facet but do not cross facet junctions; transparent or white.</p></div>\"></div></div><div class='clarityType' id='VVS1'><div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>1</span>)</span><span class='descTitl'>极轻微内含级VVS1 /VVS2</span><span class='descText'>单个极微小的瑕疵，部分个别极微小瑕疵，是钻戒常用的净度等级</span></div><ul id='vvs1Pics'><li><a href='' class='clarity-images'><img src='../images/VVS1_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/vvs1.jpg' /><p class='tooltipDesc' style='max-width:190px'>Pinpoint – A very small crystal that looks like a tiny dot at 10x.</p></div>\"></div></div><div class='clarityType' id='VVS2'><div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>2</span>)</span><span class='descTitl'>极轻微内含级VVS1 /VVS2</span><span class='descText'>单个极微小的瑕疵，部分个别极微小瑕疵，是钻戒常用的净度等级</span></div><ul id='vvs2Pics'><li><a href='' class='clarity-images'><img src='../images/VVS2_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/vvs2.jpg' /><p class='tooltipDesc' style='max-width:190px'>Pinpoint – A very small crystal that looks like a tiny dot at 10x.</p></div>\"></div></div><div class='clarityType' id='VS1'><div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>1</span>)</span><span class='descTitl'>轻微内含级VS1/VS2</span><span class='descText'>部分可见数个微小瑕疵，是钻戒常用的净度等级</span></div><ul id='vs1Pics'><li><a href='' class='clarity-images'><img src='../images/VS1_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/vs1.jpg' /><p class='tooltipDesc' style='max-width:190px'>Crystal – Mineral trapped inside of the diamond during growth.</p></div>\"></div></div><div class='clarityType' id='VS2'><div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>2</span>)</span><span class='descTitl'>轻微内含级VS1/VS2</span><span class='descText'>部分可见数个微小瑕疵，是钻戒常用的净度等级</span></div><ul id='vs2Pics'><li><a href='' class='clarity-images'><img src='../images/VS2_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/vs2.jpg' /><p class='tooltipDesc' style='max-width:190px'>Crystal – Mineral trapped inside of the diamond during growth.</p></div>\"></div></div><div class='clarityType' id='SI1'><div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>1</span>)</span><span class='descTitl'>微内含级SI1/SI2</span><span class='descText'>部分容易观察到数个明显瑕疵，但肉眼不可见，不影响佩戴美观</span></div><ul id='si1Pics'><li><a href='' class='clarity-images'><img src='../images/SI1_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/si1.jpg' /><p class='tooltipDesc' style='max-width:190px'>Crystal – Mineral trapped inside of the diamond during growth.</p></div>\"></div></div><div class='clarityType' id='SI2'><div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>2</span>)</span><span class='descTitl'>微内含级SI1/SI2</span><span class='descText'>部分容易观察到数个明显瑕疵，但肉眼不可见，不影响佩戴美观</span></div><ul id='si2Pics'><li><a href='' class='clarity-images'><img src='../images/SI2_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><img src='../images/si2.jpg' /><p class='tooltipDesc' style='max-width:190px'>Feather – General trade term for a break in a gemstone, often white and feathery in appearance</p></div>\"></div></div><div class='clarityType' id='I1'><div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>1</span>)</span><span class='descTitl'>内含级I1-I3</span><span class='descText'>瑕疵肉眼可见，并且可能会影响透明度和亮光，克拉盛宴不提供，也建议客户不使用.</span></div><ul id='i1Pics'><li><a href='' class='clarity-images'><img src='../images/I1_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I1_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I1_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><div class='tooltipBlock'><img src='../images/i1_1.jpg' /><p class='tooltipDesc'>Crystal – Mineral trapped inside of the diamond during growth.</p></div><div class='tooltipBlock'><img src='../images/i1_2.jpg' /><p class='tooltipDesc'>Pinpoint – A very small crystal that looks like a tiny dot at 10x.</p></div><div class='tooltipBlock'><img src='../images/i1_3.jpg' /><p class='tooltipDesc'>Feather – General trade term for a break in a gemstone, often white and feathery in appearance.</p></div><div class='tooltipBlock'><img src='../images/i1_4.jpg' /><p class='tooltipDesc'>Cloud – Many tightly grouped pinpoints that might be too small to distinguish individually but together have a hazy appearance.</p></div></div>\"></div></div><div class='clarityType' id='I2'><div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>2</span>)</span><span class='descTitl'>内含级I1-I3</span><span class='descText'>瑕疵肉眼可见，并且可能会影响透明度和亮光，克拉盛宴不提供，也建议客户不使用.</span></div><ul id='i2Pics'><li><a href='' class='clarity-images'><img src='../images/I2_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I2_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I2_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><div class='tooltipBlock'><img src='../images/i2_1.jpg' /><p class='tooltipDesc'>Feather – General trade term for a break in a gemstone, often white and feathery in appearance.</p></div><div class='tooltipBlock'><img src='../images/i2_2.jpg' /><p class='tooltipDesc'>Cloud – Many tightly grouped pinpoints that might be too small to distinguish individually but together have a hazy appearance.</p></div></div>\"></div></div><div class='clarityType' id='I3'><div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>3</span>)</span><span class='descTitl'>内含级I1-I3</span><span class='descText'>瑕疵肉眼可见，并且可能会影响透明度和亮光，克拉盛宴不提供，也建议客户不使用.</span></div><ul id='i3Pics'><li><a href='' class='clarity-images'><img src='../images/I3_1.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I3_2.jpg' /></a></li><li><a href='' class='clarity-images'><img src='../images/I3_3.jpg' /></a></li></ul><div class='clarityTypeToolTip' title=\"<div><div class='tooltipBlock'><img src='../images/i3_1.jpg' /><p class='tooltipDesc'>Crystal – Mineral trapped inside of the diamond during growth.</p></div><div class='tooltipBlock'><img src='../images/i3_2.jpg' /><p class='tooltipDesc'>Feather – General trade term for a break in a gemstone, often white and feathery in appearance.</p></div></div>\"></div></div><form id='clarityScale'><div class='clarityScale'></div><select name='clarity' id='clarity'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option></select></form><div id='toolHelp' style='display: none;'>Move the slider to view examples of different diamond clarity grades.</br>Tap marker for more information.</div></div>"; 

            var chineseClarityTool = "<div class='cn_tool' id='clarityTool'> <div id='descHeader'> <div>钻石</div><div>净度分级</div></div><div id='toolDesc' style='display: none;'> <div id='keySymbols' title=\" <div><img src='../images/ClarityScale_SC.jpg'/></div>\">符号注解 </div></div><div class='clarityType' id='FL'> <div class='clarityDesc'><span class='descIni'>(FL)</span><span class='descTitl'>无瑕级</span><span class='descText'>在 10 倍放大镜下观察，钻石没有任何内含物或表面特征。</span></div><ul id='flPics'> <li><a href='' class='clarity-images'><img src='../images/FL_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/FL_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/FL_3.jpg'/></a></li></ul></div><div class='clarityType' id='IF'> <div class='clarityDesc'><span class='descIni'>(IF)</span><span class='descTitl'>内无瑕级</span><span class='descText'>抛光线（抛光过程中留下的表面特征）位于钻石的底部。</span></div><ul id='ifPics'> <li><a href='' class='clarity-images'><img src='../images/IF_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/IF_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/IF_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/if.jpg'/> <p class='tooltipDesc' style='max-width:190px'> 抛光线——抛光过程中留下的平直的槽痕和脊线，可能出现在任何刻面上，但不会穿过刻面接合处，呈透明或白色状。</p></div>\"></div></div><div class='clarityType' id='VVS1'> <div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>1</span>)</span><span class='descTitl'>极轻微内含级</span><span class='descText'>仅可通过该钻石的底部看到针点（于 10 倍放大镜下观察，可看到钻石生长过程中包围的矿物晶体所形成的细微斑点）。</span></div><ul id='vvs1Pics'> <li><a href='' class='clarity-images'><img src='../images/VVS1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vvs1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>针点：10 倍放大观察下，状似小点的微小晶体。</p></div>\"></div></div><div class='clarityType' id='VVS2'> <div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>2</span>)</span><span class='descTitl'>极轻微内含级</span><span class='descText'>针点仅在钻石冠部可见。</span></div><ul id='vvs2Pics'> <li><a href='' class='clarity-images'><img src='../images/VVS2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vvs2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>针点：10 倍放大观察下，状似小点的微小晶体。</p></div>\"></div></div><div class='clarityType' id='VS1'> <div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>1</span>)</span><span class='descTitl'>轻微内含级</span><span class='descText'>钻石的桌面刻面中可见晶体。</span></div><ul id='vs1Pics'> <li><a href='' class='clarity-images'><img src='../images/VS1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vs1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>晶体——钻石形成过程中，钻石内部包裹的矿物。</p></div>\"></div></div><div class='clarityType' id='VS2'> <div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>2</span>)</span><span class='descTitl'>轻微内含级</span><span class='descText'>钻石的桌面刻面中可见晶体。</span></div><ul id='vs2Pics'> <li><a href='' class='clarity-images'><img src='../images/VS2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vs2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>晶体——钻石形成过程中，钻石内部包裹的矿物。</p></div>\"></div></div><div class='clarityType' id='SI1'> <div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>1</span>)</span><span class='descTitl'>微内含级</span><span class='descText'>钻石的冠部可见晶体。</span></div><ul id='si1Pics'> <li><a href='' class='clarity-images'><img src='../images/SI1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/si1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>晶体——钻石形成过程中，钻石内部包裹的矿物。</p></div>\"></div></div><div class='clarityType' id='SI2'> <div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>2</span>)</span><span class='descTitl'>微内含级</span><span class='descText'>钻石冠部可见羽裂纹（钻石内部有裂纹）。</span></div><ul id='si2Pics'> <li><a href='' class='clarity-images'><img src='../images/SI2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/si2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>羽裂纹——通常指宝石裂纹，呈白色或羽毛状。</p></div>\"></div></div><div class='clarityType' id='I1'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>1</span>)</span><span class='descTitl'>内含级</span><span class='descText'>通过钻石的桌面刻面可见晶体。 还包含针点、羽裂纹和云状物（由大量针点构成的乳状区域）。</span></div><ul id='i1Pics'> <li><a href='' class='clarity-images'><img src='../images/I1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i1_1.jpg'/> <p class='tooltipDesc'>晶体——钻石形成过程中，钻石内部包裹的矿物。</p></div><div class='tooltipBlock'> <img src='../images/i1_2.jpg'/> <p class='tooltipDesc'>针点：10 倍放大观察下，状似小点的微小晶体。</p></div><div class='tooltipBlock'> <img src='../images/i1_3.jpg'/> <p class='tooltipDesc'>羽裂纹——通常指宝石裂纹，呈白色或羽毛状。</p></div><div class='tooltipBlock'> <img src='../images/i1_4.jpg'/> <p class='tooltipDesc'>云状物：由肉眼难辨的微小针点聚集而成的模糊状外观，由于太过细小，很难独立区分。</p></div></div>\"></div></div><div class='clarityType' id='I2'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>2</span>)</span><span class='descTitl'>内含级</span><span class='descText'>羽裂纹沿钻石底部开裂，透过冠部可见。 还包含云状物。</span></div><ul id='i2Pics'> <li><a href='' class='clarity-images'><img src='../images/I2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i2_1.jpg'/> <p class='tooltipDesc'>羽裂纹——通常指宝石裂纹，呈白色或羽毛状。</p></div><div class='tooltipBlock'> <img src='../images/i2_2.jpg'/> <p class='tooltipDesc'>云状物：由肉眼难辨的微小针点聚集而成的模糊状外观，由于太过细小，很难独立区分。</p></div></div>\"></div></div><div class='clarityType' id='I3'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>3</span>)</span><span class='descTitl'>内含级</span><span class='descText'>钻石底部和冠部均可见羽裂纹。 还包含晶体。</span></div><ul id='i3Pics'> <li><a href='' class='clarity-images'><img src='../images/I3_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I3_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I3_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i3_1.jpg'/> <p class='tooltipDesc'>晶体——钻石形成过程中，钻石内部包裹的矿物。</p></div><div class='tooltipBlock'> <img src='../images/i3_2.jpg'/> <p class='tooltipDesc'>羽裂纹——通常指宝石裂纹，呈白色或羽毛状。</p></div></div>\"></div></div><form id='clarityScale'> <div class='clarityScale'></div><select name='clarity' id='clarity'> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> <option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option> <option>11</option> </select></form><div id='toolHelp'>请移动滑块，观看不同钻石净度等级演示。</div><div class='GIACourtesy'> 由 <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/CN?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=clarity_en' target='_blank'>GIA</a> 友情提供 </div></div>"; 

            var japaneseClarityTool = "<div class='ja_tool' id='clarityTool'> <div id='descHeader'> <div>ダイヤモンド</div><div>クラリティグレーディング</div></div><div id='toolDesc' style='display: none;'> <div id='keySymbols' title=\" <div><img src='../images/ClarityScale_JP.jpg'/></div>\">記号の凡例 </div></div><div class='clarityType' id='FL'> <div class='clarityDesc'><span class='descIni'>(FL)</span><span class='descTitl'>フローレス。</span><span class='descText'>10倍の倍率で内包物やブレミッシュが認められない。</span></div><ul id='flPics'> <li><a href='' class='clarity-images'><img src='../images/FL_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/FL_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/FL_3.jpg'/></a></li></ul></div><div class='clarityType' id='IF'> <div class='clarityDesc'><span class='descIni'>(IF)</span><span class='descTitl'>インターナルフローレス。</span><span class='descText'>ダイヤモンドのパビリオンにポリッシュライン（ポリッシング工程中にダイヤモンドに残るブレミッシュ）がある。</span></div><ul id='ifPics'> <li><a href='' class='clarity-images'><img src='../images/IF_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/IF_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/IF_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/if.jpg'/> <p class='tooltipDesc' style='max-width:190px'> ポリッシュライン - ポリッシングでついた細い平行な溝と隆起部。どのようなファセットでも発生する可能性があるが、ファセットの境界をまたぐことはない。透明または白色。</p></div>\"></div></div><div class='clarityType' id='VVS1'> <div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>1</span>)</span><span class='descTitl'>ベリーベリースライトリーインクルーデッド1。</span><span class='descText'>ピンポイント（成長中のダイヤモンドの内部に閉じ込められた鉱物結晶で、10倍に拡大すると小さな斑点に見える）が、ダイヤモンドのパビリオンを通してのみ視認できる。</span></div><ul id='vvs1Pics'> <li><a href='' class='clarity-images'><img src='../images/VVS1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vvs1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>ピンポイント - 10倍の倍率で小さな点状に見える非常に小さな結晶。</p></div>\"></div></div><div class='clarityType' id='VVS2'> <div class='clarityDesc'><span class='descIni'>(VVS<span class='IniSub'>2</span>)</span><span class='descTitl'>ベリーベリースライトリーインクルーデッド2。</span><span class='descText'>ピンポイントが、ダイヤモンドのクラウンを通してのみ視認できる。</span></div><ul id='vvs2Pics'> <li><a href='' class='clarity-images'><img src='../images/VVS2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VVS2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vvs2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>ピンポイント - 10倍の倍率で小さな点状に見える非常に小さな結晶。</p></div>\"></div></div><div class='clarityType' id='VS1'> <div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>1</span>)</span><span class='descTitl'>ベリースライトリーインクルーデッド1。</span><span class='descText'>結晶が、ダイヤモンドのテーブルファセットで視認できる。</span></div><ul id='vs1Pics'> <li><a href='' class='clarity-images'><img src='../images/VS1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vs1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>結晶 - 成長の過程でダイヤモンドの中に閉じ込められた鉱物。</p></div>\"></div></div><div class='clarityType' id='VS2'> <div class='clarityDesc'><span class='descIni'>(VS<span class='IniSub'>2</span>)</span><span class='descTitl'>ベリースライトリーインクルーデッド2。</span><span class='descText'>結晶が、ダイヤモンドのテーブルファセットで視認できる。</span></div><ul id='vs2Pics'> <li><a href='' class='clarity-images'><img src='../images/VS2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/VS2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/vs2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>結晶 - 成長の過程でダイヤモンドの中に閉じ込められた鉱物。</p></div>\"></div></div><div class='clarityType' id='SI1'> <div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>1</span>)</span><span class='descTitl'>スライトリーインクルーデッド1。</span><span class='descText'>結晶が、ダイヤモンドのクラウンを通して視認できる。</span></div><ul id='si1Pics'> <li><a href='' class='clarity-images'><img src='../images/SI1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/si1.jpg'/> <p class='tooltipDesc' style='max-width:190px'>結晶 - 成長の過程でダイヤモンドの中に閉じ込められた鉱物。</p></div>\"></div></div><div class='clarityType' id='SI2'> <div class='clarityDesc'><span class='descIni'>(SI<span class='IniSub'>2</span>)</span><span class='descTitl'>スライトリーインクルーデッド2。</span><span class='descText'>フェザー（ダイヤモンド内の亀裂）が、ダイヤモンドのクラウンを通して視認できる。</span></div><ul id='si2Pics'> <li><a href='' class='clarity-images'><img src='../images/SI2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/SI2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <img src='../images/si2.jpg'/> <p class='tooltipDesc' style='max-width:190px'>フェザー - 宝石内の亀裂を表す一般的な業界用語。通常、白い羽根状に見える。</p></div>\"></div></div><div class='clarityType' id='I1'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>1</span>)</span><span class='descTitl'>インクルーデッド1。</span><span class='descText'>結晶が、ダイヤモンドのテーブルファセットを通して視認できる。 ピンポイント、フェザー、クラウド（数個のピンポイントから成る乳白色の部分）も存在。</span></div><ul id='i1Pics'> <li><a href='' class='clarity-images'><img src='../images/I1_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I1_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I1_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i1_1.jpg'/> <p class='tooltipDesc'>結晶 - 成長の過程でダイヤモンドの中に閉じ込められた鉱物。</p></div><div class='tooltipBlock'> <img src='../images/i1_2.jpg'/> <p class='tooltipDesc'>ピンポイント - 10倍の倍率で小さな点状に見える非常に小さな結晶。</p></div><div class='tooltipBlock'> <img src='../images/i1_3.jpg'/> <p class='tooltipDesc'>フェザー - 宝石内の亀裂を表す一般的な業界用語。通常、白い羽根状に見える。</p></div><div class='tooltipBlock'> <img src='../images/i1_4.jpg'/> <p class='tooltipDesc'>クラウド - 密集した多数のピンポイント。個々に識別するには小さすぎるが、集まると、曇った外観を示す。</p></div></div>\"></div></div><div class='clarityType' id='I2'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>2</span>)</span><span class='descTitl'>インクルーデッド2。</span><span class='descText'>ダイヤモンドのパビリオン全体にフェザーが入り、クラウンを通して視認できる。 クラウドも存在。</span></div><ul id='i2Pics'> <li><a href='' class='clarity-images'><img src='../images/I2_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I2_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I2_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i2_1.jpg'/> <p class='tooltipDesc'>フェザー - 宝石内の亀裂を表す一般的な業界用語。通常、白い羽根状に見える。</p></div><div class='tooltipBlock'> <img src='../images/i2_2.jpg'/> <p class='tooltipDesc'>クラウド - 密集した多数のピンポイント。個々に識別するには小さすぎるが、集まると、曇った外観を示す。</p></div></div>\"></div></div><div class='clarityType' id='I3'> <div class='clarityDesc'><span class='descIni'>(I<span class='IniSub'>3</span>)</span><span class='descTitl'>インクルーデッド3。</span><span class='descText'>ダイヤモンドのクラウンとパビリオンの両方にフェザーが存在。 結晶も存在。</span></div><ul id='i3Pics'> <li><a href='' class='clarity-images'><img src='../images/I3_1.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I3_2.jpg'/></a></li><li><a href='' class='clarity-images'><img src='../images/I3_3.jpg'/></a></li></ul> <div class='clarityTypeToolTip' title=\" <div> <div class='tooltipBlock'> <img src='../images/i3_1.jpg'/> <p class='tooltipDesc'>結晶 - 成長の過程でダイヤモンドの中に閉じ込められた鉱物。</p></div><div class='tooltipBlock'> <img src='../images/i3_2.jpg'/> <p class='tooltipDesc'>フェザー - 宝石内の亀裂を表す一般的な業界用語。通常、白い羽根状に見える。</p></div></div>\"></div></div><form id='clarityScale'> <div class='clarityScale'></div><select name='clarity' id='clarity'> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> <option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option> <option>11</option> </select></form><div id='toolHelp'>ダイヤモンドクラリティの様々なグレードの例を表示するには、スライダーを移動してください。</div><div class='GIACourtesy'> 提供：<a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/JP?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=clarity_en' target='_blank'>GIA</a> </div></div>"; 



            // var toolMarkup = (lang == 'en') ? englishClarityTool : chineseClarityTool;

            // return toolMarkup;

            switch(lang) {

                case 'cn':

                    return chineseClarityTool;

                    break;

                case 'ja':

                    return japaneseClarityTool;

                    break;

                default:

                    return englishClarityTool

            }

        }



    }



})(jQuery);


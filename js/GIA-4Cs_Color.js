// GIA Color Tool jQuery Plugin

// Gemological Institute of America 4Cs Tool 

// version 4.23, August 4th, 2016

// by Ali Farhoumand 

// ali.farhoumand@gia.edu



// drawGIAColorTool plugin!

(function($) {



    // here we go!

    $.drawGIAColorTool = function(element, options) {



        // plugin's default options

        // this is private property and is accessible only from inside the plugin

        var defaults = {



            language: 'en',

            noWatermark: false,



            // if your plugin is event-driven, you may provide callback capabilities

            // for its events. exeColore these functions before or after events of your 

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

            (options.noWatermark) ? $(".GIACourtesy, div#toolTitle").css('visibility','hidden') : $(".GIACourtesy, div#toolTitle").css('visibility','visible');



            makeTheColorToolSkeleton();



        }



        // var onReady = function(e) {

        //         console.log("onReady loaded!")

        //     if (document.addEventListener) {

        //         document.addEventListener("DOMContentLoaded", function() {

        //             this.checkIfHasTransforms();

        //             e()

        //         })

        //     } else {

        //         document.onreadystatechange = function() {

        //             this.checkIfHasTransforms();

        //             if (document.readyState == "complete") e()

        //         }

        //     }

        // };



        // a private method. for creating the Color tool

        var makeTheColorToolSkeleton = function() {

            // FWDU3DCarUtils.onReady(function(){

                var carousel = new FWDUltimate3DCarousel({

                    //required settings

                    carouselHolderDivId:"myDiv",

                    carouselDataListDivId:"carouselData",

                    // displayType:"fluidwidth",

                    displayType:"fixed",

                    // displayType:"responsive",

                    autoScale:"no",

                    carouselWidth:675,

                    carouselHeight:250,

                    skinPath:"../img/GIA-4cs-Color-Skin",      

                    //main settings

                    backgroundColor:"#ffffff",

                    backgroundImagePath:"../img/GIA-4cs-Color-Skin/background.jpg",

                    thumbnailsBackgroundImagePath:"",

                    scrollbarBackgroundImagePath:"",

                    backgroundRepeat:"no-repeat",

                    carouselStartPosition:"left",

                    carouselTopology:"normal",

                    carouselXRadius:450,

                    carouselYRadius:0,

                    carouselXRotation:10,

                    carouselYOffset:0,

                    showCenterImage:"no",

                    centerImagePath:"load/logo.png",

                    centerImageYOffset:0,

                    showDisplay2DAlways:"no",

                    slideshowDelay:5000,

                    autoplay:"no",

                    showPrevButton:"no",

                    showNextButton:"no",

                    showSlideshowButton:"no",

                    disableNextAndPrevButtonsOnMobile:"yes",

                    controlsMaxWidth:647,

                    controlsHeight:91,

                    controlsPosition:"bottom",

                    slideshowTimerColor:"#777777",

                    rightClickContextMenu:"GIA",

                    addKeyboardSupport:"yes",

                    fluidWidthZIndex:1000,

                    //thumbnail settings

                    thumbnailWidth:120,

                    thumbnailHeight:120,

                    thumbnailBorderSize:0,

                    thumbnailMinimumAlpha:.3,

                    thumbnailBackgroundColor:"#666666",

                    thumbnailBorderColor1:"#fcfdfd",

                    thumbnailBorderColor2:"#e4e4e4",

                    transparentImages:"yes",

                    maxNumberOfThumbnailsOnMobile:23,

                    showThumbnailsGradient:"no",

                    showThumbnailsHtmlContent:"no",

                    textBackgroundColor:"#000000",

                    textBackgroundOpacity:1,

                    showText:"no",

                    showTextBackgroundImage:"no",

                    showFullTextWithoutHover:"no",

                    showThumbnailBoxShadow:"no",

                    thumbnailBoxShadowCss:"0px 0px 0px #555555",

                    showReflection:"no",

                    reflectionHeight:60,

                    reflectionDistance:0,

                    reflectionOpacity:.2,

                    //scrollbar settings

                    showScrollbar:"no",

                    disableScrollbarOnMobile:"yes",

                    enableMouseWheelScroll:"no",

                    scrollbarHandlerWidth:80,

                    scrollbarTextColorNormal:"#777777",

                    scrollbarTextColorSelected:"#000000",

                    //combobox settings

                    showComboBox:"no",

                    startAtCategory:1,

                    selectLabel:"SELECT CATEGORIES",

                    allCategoriesLabel:"All Categories",

                    showAllCategories:"no",

                    comboBoxPosition:"topright",

                    selectorBackgroundNormalColor1:"#fcfdfd",

                    selectorBackgroundNormalColor2:"#e4e4e4",

                    selectorBackgroundSelectedColor1:"#a7a7a7",

                    selectorBackgroundSelectedColor2:"#8e8e8e",

                    selectorTextNormalColor:"#8b8b8b",

                    selectorTextSelectedColor:"#FFFFFF",

                    buttonBackgroundNormalColor1:"#e7e7e7",

                    buttonBackgroundNormalColor2:"#e7e7e7",

                    buttonBackgroundSelectedColor1:"#a7a7a7",

                    buttonBackgroundSelectedColor2:"#8e8e8e",

                    buttonTextNormalColor:"#000000",

                    buttonTextSelectedColor:"#FFFFFF",

                    comboBoxShadowColor:"#000000",

                    comboBoxHorizontalMargins:12,

                    comboBoxVerticalMargins:20,

                    comboBoxCornerRadius:0,

                    //lightbox settings

                    addLightBoxKeyboardSupport:"no",

                    showLightBoxNextAndPrevButtons:"no",

                    showLightBoxZoomButton:"no",

                    showLightBoxInfoButton:"no",

                    showLighBoxSlideShowButton:"no",

                    showLightBoxInfoWindowByDefault:"no",

                    slideShowAutoPlay:"no",

                    lightBoxVideoAutoPlay:"no",

                    lightBoxVideoWidth:640,

                    lightBoxVideoHeight:480,

                    lightBoxIframeWidth:800,

                    lightBoxIframeHeight:600,

                    lightBoxBackgroundColor:"#000000",

                    lightBoxInfoWindowBackgroundColor:"#FFFFFF",

                    lightBoxItemBorderColor1:"#fcfdfd",

                    lightBoxItemBorderColor2:"#e4FFe4",

                    lightBoxItemBackgroundColor:"#333333",

                    lightBoxMainBackgroundOpacity:.8,

                    lightBoxInfoWindowBackgroundOpacity:.9,

                    lightBoxBorderSize:5,

                    lightBoxBorderRadius:0,

                    lightBoxSlideShowDelay:4000

                }); 



                carousel.addListener(FWDUltimate3DCarousel.THUMB_CHANGE, onThumbChange);

                

                // Restoring previous state of dropdown (no visual presentation for users)

                var select = $( "#diamondColor" );

                var pervSel = select[ 0 ].selectedIndex+1;



                // Moving slider handle 

                var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({

                  min: 1,

                  max: 23,

                  step: 1,

                  // range: "min",

                  value: select[ 0 ].selectedIndex + 1,

                  slide: function( event, ui ) {

                        select[ 0 ].selectedIndex = ui.value - 1;

                        carousel.gotoThumb(ui.value - 1);

                        showRightColorName(ui.value - 1)



                        // logging

                        // console.log("Slider value is: " + ui.value);

                    }

                });



                /* Manaully click an diamonds in the carousel */

                function onThumbChange(ev) {

                    select[ 0 ].selectedIndex = ev.id;

                    slider.slider( "value", ev.id + 1 );

                    showRightColorName(ev.id)

                }



                /* Displaying correct color scale name for each diamond */

                function showRightColorName(index) {

                    $(".Color_name div").hide();

                    $(".Color_name div:eq("+index+")").show();

                }

            // });    

            

        }



        // fire up the plugin!

        // call the "constructor" method

        plugin.init();



    }



    // add the plugin to the jQuery.fn object

    $.fn.drawGIAColorTool = function(options) {



        // iterate through the DOM elements we are attaching the plugin to

        return this.each(function() {



            $(this).append(chooseToolLanguage(options.language));





            // if plugin has not already been attached to the element

            if (undefined == $(this).data('drawGIAColorTool')) {

                // create a new instance of the plugin

                // pass the DOM element and the user-provided options as arguments

                var plugin = new $.drawGIAColorTool(this, options);



                // in the jQuery version of the element

                // store a reference to the plugin object

                // you can later access the plugin and its methods and properties like

                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or

                // element.data('pluginName').settings.propertyName

                $(this).data('drawGIAColorTool', plugin);



            }



        });





        // Choose the language for the tool

        function chooseToolLanguage (lang){



            var englishColorTool = "<div class='en_tool' id='colorWrapper'><div id='toolTitle' style='display: none;' > <div>DIAMOND</div><div>COLOR GRADING</div></div><div id='myDiv'></div><div id='carouselData' style='display: none;'><ul data-cat='Category one'><ul><li data-type='none'></li><li data-thumbnail-path='../img/d.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (D)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/e.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (E)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/f.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (F)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/g.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/h.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/i.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/j.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/k.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/l.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/m.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/n.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='30'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/o.png'></li><li data-thumbnail-text='asdas' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>12 IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/p.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/q.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/r.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/s.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/t.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/u.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/v.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/w.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/x.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/y.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/z.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul></ul></div><div class='controls'> <div class='colorScale'></div><div class='Color_name'> <div>COLORLESS (D)</div><div>COLORLESS (E)</div><div>COLORLESS (F)</div><div>NEAR COLORLESS (G)</div><div>NEAR COLORLESS (H)</div><div>NEAR COLORLESS (I)</div><div>NEAR COLORLESS (J)</div><div>FAINT (K)</div><div>FAINT (L)</div><div>FAINT (M)</div><div>VERY LIGHT (N)</div><div>VERY LIGHT (O)</div><div>VERY LIGHT (P)</div><div>VERY LIGHT (Q)</div><div>VERY LIGHT (R)</div><div>LIGHT (S)</div><div>LIGHT (T)</div><div>LIGHT (U)</div><div>LIGHT (V)</div><div>LIGHT (W)</div><div>LIGHT (X)</div><div>LIGHT (Y)</div><div>LIGHT (Z)</div></div><form id='colorNavigate'> <label for='diamondColor' style='display:none;'>Select diamond</label> <select name='diamondColor' id='diamondColor' style='display:none;' autocomplete='off'> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> <option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option> <option>11</option> <option>12</option> <option>13</option> <option>14</option> <option>15</option> <option>16</option> <option>17</option> <option>18</option> <option>19</option> <option>20</option> <option>21</option> <option>22</option> <option>23</option> </select> </form> </div><div id='ref' style='display:none;'>Move the slider to view examples of different diamond color grades.</div><div class='GIACourtesy' style='display: none;'> Courtesy of <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=color_en' target='_blank'>GIA</a> </div></div>"; 

            var chineseColorTool = "<div class='cn_tool' id='colorWrapper'><div id='toolTitle' style='display: none;'> <div>钻石</div><div>颜色分级</div></div><div id='myDiv'></div><div id='carouselData' style='display: none;'><ul data-cat='Category one'><ul><li data-type='none'></li><li data-thumbnail-path='../img/d.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>无色 (D)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/e.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>无色 (E)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/f.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>无色 (F)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/g.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/h.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/i.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/j.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/k.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/l.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/m.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/n.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='30'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/o.png'></li><li data-thumbnail-text='asdas' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>12 IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/p.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/q.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/r.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/s.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/t.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/u.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/v.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/w.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/x.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/y.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/z.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul></ul></div><div class='controls'> <div class='colorScale'></div><div class='Color_name'> <div>无色 (D)</div><div>无色 (E)</div><div>无色 (F)</div><div>近乎无色 (G)</div><div>近乎无色 (H)</div><div>近乎无色 (I)</div><div>近乎无色 (J)</div><div>微黄 (K)</div><div>微黄 (L)</div><div>微黄 (M)</div><div>极淡黄 (N)</div><div>极淡黄 (O)</div><div>极淡黄 (P)</div><div>极淡黄 (Q)</div><div>极淡黄 (R)</div><div>淡黄 (S)</div><div>淡黄 (T)</div><div>淡黄 (U)</div><div>淡黄 (V)</div><div>淡黄 (W)</div><div>淡黄 (X)</div><div>淡黄 (Y)</div><div>淡黄 (Z)</div></div><form id='colorNavigate'> <label for='diamondColor' style='display:none;'>Select diamond</label> <select name='diamondColor' id='diamondColor' style='display:none;' autocomplete='off'> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> <option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option> <option>11</option> <option>12</option> <option>13</option> <option>14</option> <option>15</option> <option>16</option> <option>17</option> <option>18</option> <option>19</option> <option>20</option> <option>21</option> <option>22</option> <option>23</option> </select> </form> </div><div id='ref'>请移动滑块，观看不同钻石颜色等级演示。</div><div class='GIACourtesy'> 由 <a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/CN?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=color_en' target='_blank'>GIA</a> 友情提供 </div></div>"; 

            var japaneseColorTool = "<div class='ja_tool' id='colorWrapper'><div id='toolTitle' style='display: none;'> <div>ダイヤモンド</div><div>カラーグレーディング</div></div><div id='myDiv'></div><div id='carouselData' style='display: none;'><ul data-cat='Category one'><ul><li data-type='none'></li><li data-thumbnail-path='../img/d.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (D)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/e.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (E)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/f.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>COLORLESS (F)</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/g.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/h.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/i.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/j.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/k.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/l.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/m.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/n.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='30'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/o.png'></li><li data-thumbnail-text='asdas' data-thumbnail-text-title-offset='0'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>12 IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/p.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/q.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/r.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/s.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/t.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/u.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/v.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/w.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/x.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/y.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul><ul><li data-type='none'></li><li data-thumbnail-path='../img/z.png'></li><li data-thumbnail-text='' data-thumbnail-text-title-offset='35'data-thumbnail-text-offset-top='10' data-thumbnail-text-offset-bottom='7'><p class='largeLabel'>IFRAME SUPPORT!</p></li></ul></ul></div><div class='controls'> <div class='colorScale'></div><div class='Color_name'> <div>無色 (D)</div><div>無色 (E)</div><div>無色 (F)</div><div>ほぼ無色 (G)</div><div>ほぼ無色 (H)</div><div>ほぼ無色 (I)</div><div>ほぼ無色 (J)</div><div>わずかな色 (K)</div><div>わずかな色 (L)</div><div>わずかな色 (M)</div><div>非常に薄い色 (N)</div><div>非常に薄い色 (O)</div><div>非常に薄い色 (P)</div><div>非常に薄い色 (Q)</div><div>非常に薄い色 (R)</div><div>薄い色 (S)</div><div>薄い色 (T)</div><div>薄い色 (U)</div><div>薄い色 (V)</div><div>薄い色 (W)</div><div>薄い色 (X)</div><div>薄い色 (Y)</div><div>薄い色 (Z)</div></div><form id='colorNavigate'> <label for='diamondColor' style='display:none;'>Select diamond</label> <select name='diamondColor' id='diamondColor' style='display:none;' autocomplete='off'> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> <option>6</option> <option>7</option> <option>8</option> <option>9</option> <option>10</option> <option>11</option> <option>12</option> <option>13</option> <option>14</option> <option>15</option> <option>16</option> <option>17</option> <option>18</option> <option>19</option> <option>20</option> <option>21</option> <option>22</option> <option>23</option> </select> </form> </div><div id='ref'>ダイヤモンドのカラーの様々なグレードの例を表示するには、スライダーを移動してください。</div><div class='GIACourtesy'> 提供：<a style='color: #0477aa; text-decoration: none;' href='http://www.gia.edu/JP?utm_source=interactive_tool&utm_medium=embed_4Cs&utm_campaign=color_en' target='_blank'>GIA</a> </div></div>"; 



            switch(lang) {

                case 'cn':

                    return chineseColorTool;

                    break;

                case 'ja':

                    return japaneseColorTool;

                    break;

                default:

                    return englishColorTool

            }

            

        }



    }



})(jQuery);
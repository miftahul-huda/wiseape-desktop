var UIProcessor = Class({

    gridTheme: 'energyblue',
    $statics :  
    {
        init: function(callback)
        {
            let css  = ["/system/desktop/components/default/ui-style.css", 
                "/system/desktop/components/default/css/wisedatatable.css", 
                "/system/desktop/components/default/winbox.modern.min.css", 
                "/system/desktop/components/default/winbox.white.min.css", 
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.base.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.office.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.energyblue.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.flat.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.metro.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.fresh.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.glacier.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.material-green.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.blue.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.bootstrap.css",
                "/system/desktop/components/default/responsive-editor/editor.css",
                "/system/desktop/components/default/css/fontawesome-free-6.4.0-web/css/all.css"

            ];
            let js = ["/system/desktop/components/default/window.js", 
                "/system/desktop/components/default/winbox.bundle.js", 
                "/system/desktop/components/default/notify/notify.js", 
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcore.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdata.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxbuttons.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxscrollbar.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxmenu.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcheckbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxlistbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdropdownlist.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxDropDownButton.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.sort.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.filter.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.pager.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.selection.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.edit.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.columnsresize.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.grouping.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.selection.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdata.export.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.export.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxexport.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxeditor.js",
                "/system/desktop/components/default/jqwidgets/scripts/jszip.min.js",
                "/system/applications/default/defaultapplication.js",
                "/system/applications/default/defaultpage.js",
                "/system/applications/default/defaultlistpage.js",
                "/system/desktop/components/default/WiseElement.js",
                "/system/desktop/components/default/WiseDataTable.js",
                "/system/desktop/components/default/WiseDiv.js",    
                "/system/desktop/components/default/WiseGroup.js",
                "/system/desktop/components/default/WiseButton.js",
                "/system/desktop/components/default/WiseLabel.js",
                "/system/desktop/components/default/WiseMenuButton.js",
                "/system/desktop/components/default/WiseOptionGroup.js",
                "/system/desktop/components/default/WiseMenuVerticalSeparator.js",
                "/system/desktop/components/default/WiseTextBox.js",
                "/system/desktop/components/default/WiseTextArea.js",
                "/system/desktop/components/default/WiseHtmlEditor.js",
                "/system/desktop/components/default/WiseComboBox.js",
                "/system/desktop/components/default/WiseText.js",
                "/system/desktop/components/default/responsive-editor/editor.js"
            ]

            UIProcessor.loadCss(css, 0, function(){
                UIProcessor.loadJs(js, 0, callback)
            })
        }
        ,
        loadCss: function(csss, idx, callback)
        {
            let href = csss[idx]
            var stylesheet = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: href
            });
            stylesheet.appendTo("head");

            if(idx < csss.length - 1)
            {
                UIProcessor.loadCss(csss, idx  + 1, callback)
            }
            else
            {
                if(callback != null)
                    callback();
            }
        }
        ,
        loadJs: function(jsss, idx, callback)
        {
            let script = jsss[idx];
            $.getScript(jsss[idx], function (){
                if(idx < jsss.length - 1)
                {
                    UIProcessor.loadJs(jsss, idx  + 1, callback)
                }
                else
                {
                    if(callback != null)
                        callback();
                }
            })
        }
    }
    ,
    constructor: function () {

    }
    ,
    createWindow: function(title, icon, handler, options, app)
    {
        let newWin = new Window(title, icon, handler, options, app)
        newWin.uiProcessor = this;
        return  newWin;
    }
    ,
    createDom: function (json, win) {
        this.window = win;
        let root = json.root;
        let children = root.children;
        let parentDom = document.createElement("div")
        let dom = this.createElements(parentDom, children)
        return dom;
    }
    ,
    createElement: function(json, win, elementEventHandler)
    {
        this.window = win;
        this.application = win.application;
        let root = json.root;
        let children = root.children;
        
        let parentDom = { children: [] };
        let dom = this.createElements(parentDom, children, elementEventHandler)
        return dom;
    }
    ,
    attachEventToWindow: function(me, eventName, id)
    {
        if(me.window.eventHandler != null)
            me.window.eventHandler(eventName, id)
    }
    ,
    createElements: function (parentDom, elements, elementEventHandler)
    {
        var me = this;
        elements.map((el)=>{
            let elm = me.createNewElement(el)
            elm.elementEventHandler = elementEventHandler;
            elm.window = me.window;
            elm.desktop = me.window.desktop;
            elm.application = me.window.application;

            if(el.children != null && el.children.length > 0)
                elm = me.createElements(elm, el.children, elementEventHandler)

            if(parentDom.children == null)
                parentDom.children = []

            parentDom.children.push(elm);
        })
        return parentDom;
    }
    ,
    createNewElement: function(json)
    {
        let dom = this.createByObjectName(json)
        return dom;
    }
    ,
    defaultInit: function (json, dom) {
        if(json.id != null)
            dom.id = json.id;
        if(json.class != null)
            $(dom).addClass( json.class)
        if(json.style != null)
            $(dom).attr("style", json.style)
        return dom;
    }
    ,
    createDiv: function(json)
    {
        let element = new WiseDiv();
        element.init(json);
        return element;
    }
    ,
    createWiseMenuButton: function(json)
    {
        let element = new WiseMenuButton();
        element.init(json);
        return element;
    }
    ,
    createWiseMenuVerticalSeparator: function(json)
    {
        let element = new WiseMenuVerticalSeparator();
        element.init(json);
        return element;
    }
    ,
    createWiseGroup: function(json)
    {
        let element = new WiseGroup();
        element.init(json);
        return element;
    }
    ,
    createWiseDataTable: function(json)
    {
        let element = new WiseDataTable();
        element.init(json);
        return element;
    }
    ,
    createByObjectName: function(json)
    {
        let elmName = json.element;
        let element = {};
        eval("element = new " + elmName + "();");
        element.init(json);
        return element;
    }
    ,
    initContent:function(win)
    {
        var me = this;
        me.initBootStrap(win);
        $(".notification-box").hide();
    }
    ,
    initBootStrap: function(win)
    {
        //Initialize Select2 Elements
        
        try{
            let selects = $("#" + win.id).find('select');
            if(selects.length > 0)
            {
                //$("#" + win.id).find('select').select2("destroy")
            }
        }
        catch(err)
        {

        }
        $("#" + win.id).find('select').select2()

        $("#" + win.id).find(".select2-container").css("width", "100%");
        //Initialize Select2 Elements
        $("#" + win.id).find('.select2bs4').select2({
            theme: 'bootstrap4'
        })

        

        
        let eds = $("#" + win.id).find(".wise-editor");
        if(eds.length > 0)
        {
           for(var i = 0; i < eds.length; i++)
           {
                let id = $(eds[i]).attr("id");
                let h = $(eds[i]).css("height");
                /*
                const editor = new toastui.Editor({
                    el: document.querySelector('#' + id),
                    height: '500px',
                    initialEditType: 'wysiwyg'
                });*/

                /*
                let editor = $("#" + id).wysiwyg();
                let elm = $("#" + id).parent().find(".editor-content");
                $(elm).css("height", h);
                */
                
                let editor = $("#" + id).Editor();
                $("#" + id).parent().find(".Editor-editor").css("height", h);
                //eds[i].editor = editor;
           }
        }
        
        

        //this.initEditor(this, win);

    }
    ,
    initEditor: function(me, win)
    {
    
        let eds = $("#" + win.id).find(".wise-editor");
        if(eds.length > 0)
        {
            let ed = eds[0];
            let h = $(ed).attr("height");
            /*$('.wise-editor').summernote({
                height: h,
                width: '100%'
            });
            */
           for(var i = 0; i < eds.length; i++)
           {
                let id = $(eds[i]).attr("id");
                let editor = SUNEDITOR.create(id, {
                    // plugins to load
                    plugins: [
                      "font",
                      "fontSize",
                      "formatBlock",
                      "fontColor",
                      "hiliteColor",
                      "align",
                      "lineHeight",
                      "horizontalRule",
                      "list",
                      "table",
                      "link",
                      "image",
                      "video",
                      "textStyle",
                      "blockquote",
                      "paragraphStyle",
                      "imageGallery"
                    ] 
                    ,
                    // set the initial value
                    value: '',
                    // default tag name of the editor.
                    defaultTag: 'br',
                    // Add tags to the default tags whitelist of editor.
                    // _defaultTagsWhitelist : 'br|p|div|pre|blockquote|h[1-6]|ol|ul|li|hr|figure|figcaption|img|iframe|audio|video|table|thead|tbody|tr|th|td|a|b|strong|var|i|em|u|ins|s|span|strike|del|sub|sup'
                    addTagsWhitelist: '',
                    // blacklist
                    tagsBlacklist: null,
                    pasteTagsBlacklist: null,
                    // Whitelist of tags when pasting. 
                    // _editorTagsWhitelist  : _defaultTagsWhitelist + addTagsWhitelist
                    // ex) 'p|h[1-6]'
                    pasteTagsWhitelist: "_editorTagsWhitelist",
                    // Blacklist of the editor default tags. 
                    // e.g. 'h1|h2' 
                    tagsBlacklist: null,
                    //  Blacklist of tags when pasting. 
                    // e.g. 'h1|h2' 
                    pasteTagsBlacklist: null,
                  
                    // Add attributes whitelist of tags that should be kept undeleted from the editor.
                    // -- Fixed whitelist --
                    // Native attributes: 'contenteditable|colspan|rowspan|target|href|src|class|type'
                    // Editor attributes: 'data-format|data-size|data-file-size|data-file-name|data-origin|data-align|data-image-link|data-rotate|data-proportion|data-percentage|origin-size'
                    // ex) {
                    //  'all': 'style', // Apply to all tags
                    //  'input': 'checked' // Apply to input tag
                    // }              
                    attributesWhitelist: null,
                    // blacklist
                    attributesBlacklist: null,
                    // change the tag of the default text button. 
                    textTags: { bold: 'STRONG', underline: 'U', italic: 'EM', strike: 'DEL' },
                    // change default formatBlock array.
                    formats: ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    // show the number of characters in the editor.   
                    charCounter: false,
                    // null || 'char' || 'byte' || 'byte-html'
                    charCounterType: 'char',
                    // text to be displayed in the "charCounter" area of the bottom bar
                    charCounterLabel: null,
                    // the maximum number of characters allowed to be inserted into the editor.
                    maxCharCount: null,
                    // the min-width size of the editor.
                    minWidth: null,
                    // the max-width size of the editor.
                    maxWidth: null,
                    // the size of the total uploadable images (in bytes).
                    imageUploadSizeLimit: null,
                    // if true, multiple images can be selected.
                    imageMultipleFile: false,
                    // allowed extensions like '.jpg, .png ..'
                    imageAccept: "*",
                    // The url of the image gallery, if you use the image gallery.
                    // When "imageUrlInput" is true, an image gallery button is created in the image modal.
                    // You can also use it by adding 'imageGallery' to the button list.
                    imageGalleryUrl: null,
                    // Http Header when get image gallery. 
                    imageGalleryHeader: null,
                    // 'classic', 'inline', 'balloon', 'balloon-always'
                    mode: 'classic',
                    // if true, the editor is set to RTL(Right To Left) mode.
                    rtl: false,
                    // deletes other attributes except for the property set at the time of line break.
                    lineAttrReset: '',
                    // toolbar width
                    toolbarWidth: 'max-content',
                    // 'cell', 'top'
                    tableCellControllerPosition: 'cell',
                    // if true, disables the interaction of the editor and tab key.
                    tabDisable: false,
                    // You can disable shortcuts.
                    // e.g. ['bold', 'strike', 'underline', 'italic', 'undo', 'indent']
                    shortcutsDisable: [],
                                      
                    // If false, hide the shortcuts hint.
                    shortcutsHint: true,
                    // A custom HTML selector placing the toolbar inside.
                    toolbarContainer: null,
                    // Sets to -1 or false or null to turn off
                    // Sticky Toolbar
                    // Default: 0px (offset)
                    stickyToolbar: 0,
                    // The toolbar is rendered hidden
                    hideToolbar: false,
                    // top offset value of "full Screen"
                    fullScreenOffset: '',
                    // the position property of suneditor.   
                    position: null,
                    // places content in the iframe
                    iframe : false,
                    // allows the usage of HTML, HEAD, BODY tags and DOCTYPE declaration.
                    fullPage: false,
                    // Attributes of the iframe
                    iframeAttributes: null,
                    // CSS file to apply inside the iframe
                    iframeCSSFileName: 'suneditor',
                    // e.g. <h1>Preview Template</h1> {{contents}} <div>_Footer_</div>
                    previewTemplate: null,
                    // A template of the "print".
                    // The {{contents}} part in the HTML string is replaced with the contents of the editor.
                    // e.g. "<div style='width:auto; max-width:1080px; margin:auto;'><h1>Print Template</h1> {{contents}} <div>_Footer_</div></div>"
                    printTemplate: null,
                    // CodeMirror option object
                    codeMirror: null,
                    // katex options
                    // https://github.com/KaTeX/KaTeX
                    
                    // Shows the bottom resizing bar.
                    resizingBar: true,
                    // Font Family array
                    font: ['Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia','tahoma', 'Trebuchet MS', 'Verdana'],
                    // Font Size array
                    fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
                    // Font size unit
                    fontSizeUnit: 'px',
                    // A list of drop-down options for the 'align' plugin
                    alignItems: ['right', 'center', 'left', 'justify'],
                    // Enables video resizing
                    videoResizing: true,
                    // width/height of the video
                    videoWidth: 560,
                    videoHeight: '56.25%',
                    // If true, video size can only be scaled by percentage.
                    videoSizeOnlyPercentage: false,
                    // Choose whether to video rotation buttons display.
                    videoRotation: false,
                    // The default aspect ratio of the video.
                    videoRatio: 0.5625,
                    // Video ratio selection options.
                    videoRatioList:  [ {name: 'Classic Film 3:2', value: 0.6666}, {name: 'HD', value: 0.5625} ],
                    // Choose whether the video height input is visible.
                    videoHeightShow: true,
                    // Choose whether the video align radio buttons are visible
                    videoAlignShow: true,
                    // Choose whether the video ratio options is visible.
                    videoRatioShow: true,
                    // the query string of a YouTube embedded URL. 
                    youtubeQuery: '',
                    // whether to create a file input tag in the video upload window.
                    videoFileInput: false,
                    // whether to create a video url input tag in the video upload window.
                    // if the value of videoFileInput is false, it will be unconditionally.
                    videoUrlInput: true,
                    // Http Header when uploading videos.  
                    videoUploadHeader: null,
                    // the video upload to server mapping address.
                    videoUploadUrl: null,
                    // the size of the total uploadable videos (in bytes).
                    videoUploadSizeLimit:  null,
                    // if true, multiple videos can be selected. 
                    videoMultipleFile:  false,
                    // define "Attributes" of the video tag.
                    videoTagAttrs: null,
                    // define "Attributes" of the iframe tag
                    videoIframeAttrs: null,
                    // allowed extensions like '.mp4, .avi ..'
                    videoAccept: "*",
                    // default width of the audio frame.  
                    audioWidth: '300px',
                    // default height of the audio frame. 
                    audioHeight: "default",
                    // whether to create a file input tag in the audio upload window
                    audioFileInput: false,
                    // whether to create a audio url input tag in the audio upload window.
                    audioUrlInput: true,
                    // Http Header when uploading audios. 
                    audioUploadHeader: null,
                    // upload url
                    audioUploadUrl: null,
                    // the size of the total uploadable audios (in bytes).
                    // invokes the "onAudioUploadError" method.
                    audioUploadSizeLimit: null,
                    // if true, multiple audios can be selected.
                    audioMultipleFile: false,
                    // define "Attributes" of the audio tag.  
                    audioTagAttrs: null,
                    // allowed extensions like '.mp3, .wav ..'
                    audioAccept: "*",
                    // default protocol for the links. ('link', 'image', 'video', 'audio')
                    linkProtocol: null,
                    // default checked value of the "Open in new window" checkbox
                    linkTargetNewWindow: false,
                    // the placeholder text.  
                    placeholder: null,
                    // Activate the media[image, video, audio] selection status immediately after inserting the media tag.
                    mediaAutoSelect: true,
                    // custom icons
                    // {
                    //   bold: 'B',
                    //   table: '',
                    //   insert_row_above: ''
                    // }
                    icons: null,
                    // defines "rel" attribute list of anchor tag
                    // e.g. ['author', 'external', 'nofollow']
                    linkRel: [],
                    // defines default "rel" attributes of anchor tag.
                    // e.g.
                    // {
                    //   default: 'nofollow', // Default rel
                    //   check_new_window: 'noreferrer noopener', // When "open new window" is checked 
                    //   check_bookmark: 'bookmark' // When "bookmark" is checked 
                    // },
                    linkRelDefault: {},
                    // If true, disables the automatic prefixing of the host URL to the value of the link
                    linkNoPrefix: false,
                    // Defines the hr items.
                    // Choose whether the image height input is visible.
                    imageHeightShow: true,
                    // Choose whether the image align radio buttons are visible.
                    imageAlignShow: true,
                    // enables image resizing
                    imageResizing: true,
                    // image width/height
                    imageWidth: 'auto',
                    imageHeight: 'auto',
                    // If true, image size can only be scaled by percentage
                    imageSizeOnlyPercentage: true,
                    // Shows image rotation buttons
                    imageRotation: false,
                    // image file input
                    imageFileInput: true,
                    // image url input
                    imageUrlInput: true,
                    // image upload url
                    imageUploadUrl: null,
                    // Http Header when uploading images
                    imageUploadHeader: null,
                    // height/width of the editor
                    height: h,
                    width: '100%',
                    // min height/width of the editor
                    minHeight: null,
                    minWidth: null,
                    // color array of color picker
                    // e.g. [['#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown'], ['SlateGray', 'BurlyWood', 'DeepPink', 'FireBrick', 'Gold', 'SeaGreen']]
                    colorList: null,
                    // line-height array
                    lineHeights: [
                      {text: '1', value: 1},
                      {text: '1.15', value: 1.15},
                      {text: '1.5', value: 1.5},
                      {text: '2', value: 2}
                    ],
                    // Displays the current node structure to resizingBar
                    showPathLabel: true,
                    // Enable/disable resize function of bottom resizing bar
                    resizeEnable: true,
                    // A custom HTML selector placing the resizing bar inside
                    resizingBarContainer: null,
                    // Size of background area when activating dialog window
                    popupDisplay: '',
                    // CSS display property
                    display: 'block',
                    // show/hide toolbar icons
                    buttonList: [
                      ['undo', 'redo'],
                      ['font', 'fontSize', 'formatBlock'],
                      ['paragraphStyle', 'blockquote'],
                      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                      ['fontColor', 'hiliteColor', 'textStyle'],
                      ['removeFormat'],
                      '/', // Line break
                      ['outdent', 'indent'],
                      ['align', 'horizontalRule', 'list', 'lineHeight'],
                      ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                      /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                      ['fullScreen', 'showBlocks', 'codeView'],
                      ['preview', 'print']                    ]
                    ,
                    // execute a function when the save button is clicked.
                    callBackSave: function(){}
                    
                });

                eds[i].editor = editor;
                    
           }
            
        }

    }
    ,
    columns2datafields: function(columns)
    {
        let datafields = [];
        columns.forEach(function(item){
            let type = "string"
            if(type == 'image')
                type = "string"
            datafields.push({ name: item.datafield, type: type })
        })
        return datafields;
    }


})
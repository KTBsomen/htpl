//show a loader 
const loader = {
    show: function (customHtml = null) {
        this.addAnimationStyles();
        const loaderHtml = customHtml || this.getDefaultHtml();

        // Create a new loader element
        const loaderElement = document.createElement('div');
        loaderElement.innerHTML = loaderHtml;
        loaderElement.classList.add('loader64645446554dfd5ff4dfe82422fdf34521dsddsdadderere');
        // Add styles to the loader element
        loaderElement.style.position = 'fixed';
        loaderElement.style.top = '50%';
        loaderElement.style.left = '50%';
        loaderElement.style.transform = 'translate(-50%, -50%)';
        loaderElement.style.zIndex = '9999';
        loaderElement.style.background = '#fff';


        // Append the loader element to the body
        document.body.appendChild(loaderElement);
        this.addBlur();
    },

    hide: function () {
        // Remove the loader element from the body
        const loaderElement = document.querySelector('.loader64645446554dfd5ff4dfe82422fdf34521dsddsdadderere');
        if (loaderElement) {
            loaderElement.parentElement.removeChild(loaderElement);
        }
        const blurElement = document.querySelector('.blur');
        if (blurElement) {
            blurElement.parentElement.removeChild(blurElement);
        }
    },
    addBlur: function () {
        // Create a new element for blur effect
        const blurElement = document.createElement('div');
        blurElement.classList.add('blur');

        // Append the blur element to the body
        document.body.appendChild(blurElement);
    },
    addAnimationStyles: function () {
        // Create style element
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .blur {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
            backdrop-filter: blur(50px); /* Fallback for browsers that support backdrop-filter */
            z-index: 9998; /* Make sure it's below the loader */
        }
            @-webkit-keyframes spin {
                0% { -webkit-transform: rotate(0deg); }
                100% { -webkit-transform: rotate(360deg); }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        // Append style element to the head
        document.head.appendChild(style);
    },


    getDefaultHtml: function () {
        // Default loader HTML with animation
        return '<div class="loader64645446554dfd5ff4dfe82422fdf34521dsddsdadderere" style="border: 8px solid #f3f3f3; border-radius: 50%; border-top: 8px solid #3498db; width: 50px; height: 50px; animation: spin 1s linear infinite;"></div>';
    }
};
//create such variable  so we can access it from outside of this module and listen to its value change so we can update state via setState
function watch(propName, cb, defaultValue = undefined) {
    let _value = defaultValue; // Private variable for storing the value

    // Define the property with getter and setter
    Object.defineProperty(window, propName, {
        get: function () {
            return _value;
        },
        set: function (value) {
            _value = value;
            // console.log(`${propName} has been changed:`, value);

            cb(propName, value)
        }
    });
}
//parse the js expressions inside of html {{}}
function parseTemplate(template) {
    return template.replace(/\{\{(.*?)\}\}/gs, function (match, expression) {
        try {
            // Evaluate the expression within the global scope
            var result = (0, eval)(expression.trim()); // Using (0, eval) to evaluate in global scope

            // If the result is not undefined, return it
            if (result !== undefined) {
                return result;
            }
        } catch (error) {
            throw new Error('Error while evaluating JS Expression "' + expression + '":\n' + error);
            // If there is an error evaluating the expression, return the original match
            //console.error("Error evaluating expression:", expression, error);
        }

        // If the result is undefined or there's an error, return the original match
        return match;
    });
}
//array creation
function createRangeArray(start, end, step = 1) {
    const result = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
    } else if (step < 0) {
        for (let i = start; i >= end; i += step) {
            result.push(i);
        }
    }
    return result;
}
//for loop in html implementation.
class CustomForLoop extends HTMLElement {
    constructor() {
        super();

        // Get start and end attributes


    }
    connectedCallback() {
        // Perform actions after the element is connected to the DOM
        this.render()
    }
    render() {
        try {
            this.style.display = "contents";
            var array = (0, eval)(this.getAttribute('array')) || [];
            var start = eval(this.getAttribute('start')) || 0;
            var step = eval(this.getAttribute('step')) || 1;
            var end = eval(this.getAttribute('end')) || array.length;
            var valueVar = this.getAttribute('valueVar');
            var indexVar = this.getAttribute('indexVar');
            var append = eval(this.getAttribute('append')) || false;
            if (array.length <= 0 && start >= 0 && end >= 0) {
                array = createRangeArray(start, end, step)
            }
            var templateContent

            //const shadow = this.attachShadow({ mode: 'open' });
            // console.log(this.ATTRIBUTE_NODE,"attributes are ",this.attributes,this.querySelector('template'))
            try {
                if (this.getAttribute('loopid') == '' || this.getAttribute('loopid') == null || this.getAttribute('loopid') == undefined) {
                    throw new Error("Missing attribute `loopid` ")
                }
                templateContent = this.querySelector(`template[loopid="${this.getAttribute('loopid')}"]`).content.cloneNode(true);
            } catch (error) {
                this.innerHTML = "💥templateERROR: template tag with a loopid attribute is required.inside of for-loop tag."
                throw error;
            } var temp = document.createElement("div")
            temp.appendChild(templateContent)

            var stringContent = temp.innerHTML;

            // Define the regular expression pattern





            // Create a shadow root
            var tempHTML = ``
            const pattern = /\$\{(.*?)\}/gs;
            var vr = new RegExp("\\b" + valueVar + "\\b", "g");
            var ir = new RegExp("\\b" + indexVar + "\\b", "g");
            stringContent = stringContent.replaceAll(vr, "value").replaceAll(ir, "index")
            //console.log(stringContent)
            for (let i = start; i < end; i++) {
                var value = array[i]
                var index = i



                //console.log("value", value)
                var x = stringContent.replace(pattern, function (match, expression) {
                    try {
                        // Evaluate the expression within the global scope

                        var result = eval(expression.trim()); // Using (0, eval) to evaluate in global scope

                        // If the result is not undefined, return it
                        if (result !== undefined) {

                            return result;
                        }
                    } catch (error) {
                        // If there is an error evaluating the expression, return the original match
                        console.error("Error evaluating expression:", expression, error);
                    }

                    // If the result is undefined or there's an error, return the original match
                    return match;
                }
                )


                tempHTML += x//stringContent.replaceAll("${"+index+"}",`${i}`).replaceAll("${"+value+"}",`${JSON.stringify(array[i])}`)

            }

            //console.log(parseTemplate(tempHTML))
            var templateCopy = `<template loopid="${this.getAttribute('loopid')}">
${temp.innerHTML}
            </template>`


            try {
                if (append == true) {
                    var tempdiv = document.createElement('div');
                    tempdiv.id = "tempcopy" + Math.random() * 12345678
                    tempdiv.style.display = "contents"
                    tempdiv.innerHTML = parseTemplate(tempHTML);
                    this.appendChild(tempdiv)
                } else {
                    this.innerHTML = parseTemplate(tempHTML) + templateCopy
                }
            } catch (error) {
                throw new Error(`Failed to parse due to ${error}`);


            }
            //this.appendChild(templateContent.cloneNode(true));


        } catch (error) {
            console.error(error)

        }
    }
    rerender() {
        this.render();
    }
}
// Define the custom element
customElements.define('for-loop', CustomForLoop);
//set state or refresh ui  when data changes 
setState = ({ loopid = false, ifid = false, showloader = true, datajs = true, innerhtml = true, loops = true, templates = false, conditions = true } = {}) => {
    try {
        if (showloader) { loader.show(); }

        if (loopid) {
            var loopele = document.querySelectorAll(`[loopid="${ifid}"]`);
            loopele.forEach(function (element) {
                element.render();
            });
            return
        }
        if (ifid) {
            var ifele = document.querySelectorAll(`[ifid="${ifid}"]`);
            ifele.forEach(function (element) {
                element.render();
            });
            return
        }


        if (datajs) {
            var elementsWithDataJS = document.querySelectorAll("[data-js]");
            elementsWithDataJS.forEach(function (element) {
                eval(element.dataset.js.replace("this", "element"));
            });
        }

        if (innerhtml) {
            var elementsWithDataInnerHTML = document.querySelectorAll("[data-innerhtml]");
            elementsWithDataInnerHTML.forEach((element) => {
                if (element.dataset.innerhtml !== undefined) {
                    let content = eval(element.dataset.innerhtml);
                    content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                    element.innerHTML = content;
                }
            });
        }

        if (loops) {
            var loopElements = document.querySelectorAll("for-loop");
            loopElements.forEach(function (element) {
                element.render();
            });
        }

        if (templates) {
            var includedTemplates = document.querySelectorAll("include-template");
            includedTemplates.forEach((templateElement) => {
                templateElement.render();
            });
        }

        if (conditions) {
            var conditionBlocks = document.querySelectorAll("condition-block");
            conditionBlocks.forEach((templateElement) => {
                templateElement.render();
            });
        }

        if (showloader) { loader.hide(); }
    } catch (error) {
        if (showloader) { loader.hide(); }
        console.error(error);
    }
};

// replace relative url to absolute url
function convertRelativeToAbsolute(htmlString, baseUrl) {
    // Regular expression to match relative URLs in HTML attributes
    var regex = /(?:src|href)=["'](\.{1,2}\/[^"']+)["']/g;

    // Replace relative URLs with absolute URLs
    htmlString = htmlString.replace(regex, function (match, url) {
        // Construct the absolute URL based on the base URL
        var absoluteUrl = new URL(url, baseUrl).href;
        return match.replace(url, absoluteUrl);
    });

    return htmlString;
}



//get directory from a relative url
function extractDirectory(relativeUrl) {
    // Create a dummy anchor element
    var anchor = document.createElement('a');
    anchor.href = relativeUrl;

    // Extract the directory from the anchor's pathname
    var directory = anchor.pathname.substring(0, anchor.pathname.lastIndexOf('/'));

    // Return the directory
    return directory;
}
//custom include function like php's include 
class includeTemplate extends HTMLElement {
    constructor() {
        super();
        this.render()
    }
    async render() {
        try {
            loader.show()

            this.style.display = "contents";

            var file = this.getAttribute('file');

            var response = await fetch(file)
            var html = await response.text()
            var dir = extractDirectory(file);
            var anchor = document.createElement('a');
            anchor.href = dir;

            html = convertRelativeToAbsolute(html, anchor.href + "/");

            this.innerHTML = parseTemplate(html)

            // Manually execute scripts
            var scripts = this.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                var newScript = document.createElement("script");
                newScript.text = script.text;
                script.parentNode.replaceChild(newScript, script);
            }


            loader.hide()
        } catch (error) {
            console.error(error)
            loader.hide()
        }
    }
    rerender() {
        this.render();
    }
}
customElements.define('include-template', includeTemplate);
//if statement inside of html itself
class IfCondition extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        // Perform actions after the element is connected to the DOM
        this.style.display = "contents";
        this.render()
    }
    render() {

        var elseId;
        try {

            try {
                if ((this.parentElement).parentElement.tagName != "TEMPLATE" && (this.parentElement).parentElement.tagName != "FOR-LOOP" && (this.parentElement).parentElement.tagName != "condition-block".toUpperCase()) {
                    throw Error("1IfConditions must be nested within a Template/for-loop/condition-block tag.")

                }
            } catch (error) {
                //console.log("error",error,"nnn",(this.parentElement).parentElement)
                if ((this.parentElement).tagName != "TEMPLATE" && (this.parentElement).tagName != "FOR-LOOP" && (this.parentElement).tagName != "condition-block".toUpperCase()) {
                    throw Error("2IfConditions must be nested within a Template/for-loop/condition-block tag.")

                }
            }


            const value = this.getAttribute('value');
            const eq = this.getAttribute('eq');
            const neq = this.getAttribute('neq');
            elseId = this.getAttribute('elseid') || "";
            if (value == null || (eq == null && neq == null)) {
                throw "if condition must have a 'value' and an 'eq'/'neq' attribute";
            }
            if (!neq) {
                console.log(`${value}==${eq}`)
                if (eval(`${value}==${eq}`)) {
                    const elseElement = document.querySelector(`else-condition[elseid="${elseId}"]`);
                    if (elseElement) {
                        elseElement.remove()
                    }
                } else {
                    this.remove();
                }
            } else {
                if (eval(`${value}!=${neq}`)) {
                    const elseElement = document.querySelector(`else-condition[elseid="${elseId}"]`);
                    if (elseElement) {
                        elseElement.remove()
                    }
                } else {
                    this.remove();
                }
            }
        } catch (error) {
            this.innerHTML = error
            try {
                document.querySelector(`else-condition[elseid="${elseId}"]`).remove()

            } catch (error) {

            }
            console.error(error)
        }

    }
    rerender() {
        this.render();
    }
}

class ElseCondition extends HTMLElement {
    connectedCallback() {
        try {
            this.style.display = "contents";
            const elseId = this.getAttribute('elseid');
            const ifElement = document.querySelector(`if-condition[elseid="${elseId}"]`);
            if (!ifElement) {
                throw Error(`Else condition without corresponding If: ${this.outerHTML}`);
            }
        }
        catch (error) {
            // console.error(error)
        }
    }
}
customElements.define('if-condition', IfCondition);
customElements.define('else-condition', ElseCondition);

class Customcondition extends HTMLElement {
    constructor() {
        super();



    }

    connectedCallback() {
        // Perform actions after the element is connected to the DOM
        this.render()
    }
    render() {
        try {
            this.style.display = "contents";

            var templateContent

            //const shadow = this.attachShadow({ mode: 'open' });
            // console.log(this.ATTRIBUTE_NODE,"attributes are ",this.attributes,this.querySelector('template'))
            try {
                if (this.getAttribute('ifid') == '' || this.getAttribute('ifid') == null || this.getAttribute('ifid') == undefined) {
                    throw new Error("Missing attribute `ifid` ")
                }
                templateContent = this.querySelector(`template[ifid="${this.getAttribute('ifid')}"]`).content.cloneNode(true);
            } catch (error) {
                this.innerHTML = "💥templateERROR: template tag is required.inside of condition-block tag."
                throw error;
            } var temp = document.createElement("div")
            temp.appendChild(templateContent)

            var stringContent = temp.innerHTML;

            // Define the regular expression pattern





            // Create a shadow root
            //stringContent.replaceAll("${"+index+"}",`${i}`).replaceAll("${"+value+"}",`${JSON.stringify(array[i])}`)



            //console.log(parseTemplate(tempHTML))
            var templateCopy = `<template ifid="${this.getAttribute("ifid")}">
${temp.innerHTML}
            </template>`


            this.innerHTML = parseTemplate(stringContent) + templateCopy;
            // if (append == true) {
            //     console.log(this.innerHTML)
            //     var c = this.innerHTML + parseTemplate(tempHTML).replaceAll(templateCopy, '') + templateCopy;
            //     console.log("c is ", c)

            //     this.innerHTML = c
            // }
            //this.appendChild(templateContent.cloneNode(true));
            setState({ showloader: false, conditions: false, templates: false })


        } catch (error) {
            console.error(error)
        }
    }
    rerender() {
        this.render();
    }
}
// Define the custom element
customElements.define('condition-block', Customcondition);
//Get true input type
function getType(input) {
    if (Array.isArray(input)) {
        return 'array';
    } else if (input === null) {
        return 'null';
    } else {
        return typeof input;
    }
}
// use this to pass value to other pages inside of for loop or  something like that.or you can use as it is as a function.
function passValue(value) {
    if (getType(value) == "array" || getType(value) == "object") {
        return encodeURI(JSON.stringify(value))
    } else {
        return encodeURI(value.toString)
    }

}
// parse url and add to the window(global) by default and default url is location.href
function parseURL(url = location.href, global = true) {
    const parsedUrl = new URL(url);
    const parsedData = {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        pathname: parsedUrl.pathname,
        params: Object.fromEntries(parsedUrl.searchParams.entries())
    };
    // Iterate over each query parameter and attempt JSON parsing
    for (const key in parsedData.params) {
        if (parsedData.params.hasOwnProperty(key)) {
            const value = parsedData.params[key];
            try {
                parsedData.params[key] = JSON.parse(value);
            } catch (error) {
                // Ignore if JSON parsing fails
            }
        }
    }
    if (global) { window["UrlDetails"] = parsedData; }
    return parsedData;
}
//call it to autometically add at the time of initializing
parseURL()

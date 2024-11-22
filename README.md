# hypertext templating language
html but templating language client side, 

it has 
1) for loop
2) if-else
3) Import HTML as components
4) All javascript functions will work
5) listen for variable change
6) auto update ui as variable change

more features will come if you contribute
so please contribute and make it happen.
# Custom HTML UI Library Documentation

## Overview

This library provides a suite of customizable components and utilities to enhance your HTML-based applications. From loaders to template parsing, custom loops, and conditional rendering, this library simplifies common tasks for developers building dynamic and interactive UIs.

---

## Table of Contents

1. [Installation](#installation)  
2. [Getting Started](#getting-started)  
3. [Library Features](#library-features)  
    - [Loader](#loader)  
    - [State Watcher](#state-watcher)  
    - [Template Parsing](#template-parsing)  
    - [Custom Loops](#custom-loops)  
    - [Conditional Rendering](#conditional-rendering)  
    - [Include Templates](#include-templates)  
4. [Utility Functions](#utility-functions)  
5. [Directory Structure](#directory-structure)  
6. [FAQs and Discussions](#faqs-and-discussions)  

---

## Installation

To use this library, simply include the script in your HTML file `after the body tag this should be loaded at last after defining all custom components`:

```html
    <script src="https://cdn.jsdelivr.net/gh/KTBsomen/httl-s@main/statejs.js"></script>
```

Ensure your project has the necessary setup for JavaScript.

---

## Getting Started

Here is an example of how to show a loader using this library:

```html
<script>
    loader.show(); // Displays the loader
    setTimeout(() => loader.hide(), 3000); // Hides it after 3 seconds
</script>
```

This library provides reusable components such as loaders, custom loops, and more, helping you build dynamic UI elements effortlessly.

---

## Library Features

### Loader

A customizable loader that can display a spinning animation and blur the background.

#### Example:

```javascript
// Show loader with default animation
loader.show();

// Hide loader
loader.hide();

// Show loader with custom HTML
loader.show('<div class="my-custom-loader">Loading...</div>');
```

---

### State Watcher

Monitor and react to changes in global variables dynamically.

#### Example:

```javascript
watch('myState', (propName, value) => {
    console.log(`${propName} changed to:`, value);
});

myState = 'newValue'; // Console logs: "myState changed to: newValue"
```

---

### Template Parsing

Parse dynamic JavaScript expressions embedded in HTML using `{{}}`.

#### Example:

```javascript
const template = '<p>Hello, {{ user.name }}</p>';
const parsedTemplate = parseTemplate(template); // Replaces {{ user.name }} with its evaluated value
document.body.innerHTML = parsedTemplate;
```

---

### Custom Loops

Render dynamic arrays or range-based loops directly in HTML.

#### Example:

```html
<for-loop array="[1, 2, 3]" valueVar="item" indexVar="index" loopid="loop1">
    <template loopid="loop1">
        <p>Index: ${index}, Value: ${item}</p>
    </template>
</for-loop>
```

#### Result:

```html
<p>Index: 0, Value: 1</p>
<p>Index: 1, Value: 2</p>
<p>Index: 2, Value: 3</p>
```

---

### Conditional Rendering

Render elements based on conditions directly in HTML.

#### Example:

```html
<condition-block ifid="condition1">
    <if-condition value="5" eq="5" elseid="conditionElse">
        <p>Condition is true!</p>
    </if-condition>
    <else-condition elseid="conditionElse">
        <p>Condition is false!</p>
    </else-condition>
</condition-block>
```

---

### Include Templates

Include and render external HTML files dynamically.

#### Example:

```html
<include-template file="components/header.html"></include-template>
```

This will load `header.html` and replace the tag's content with the parsed HTML.

---

## Utility Functions

1. **Convert Relative to Absolute URLs**  
   ```javascript
   const absoluteHtml = convertRelativeToAbsolute('<img src="./image.jpg">', 'https://example.com/');
   ```

2. **Create Range Arrays**  
   ```javascript
   const rangeArray = createRangeArray(1, 10, 2); // [1, 3, 5, 7, 9]
   ```

3. **Set State**  
   Update UI components dynamically:  
   ```javascript
   setState({ loopid: 'loop1' });
   ```

---

## Directory Structure

Here’s how you can organize files when using this library:

```
project/
├── components/
│   ├── header.html
│   └── footer.html
├── scripts/
│   ├── library.js
│   └── main.js
└── index.html
```

---

## FAQs and Discussions

### Q: How do I customize the loader animation?  
A: Use the `loader.show()` method with a custom HTML string as a parameter.

### Q: Can I use this library with React or Vue?  
A: While primarily designed for vanilla JavaScript, parts of the library (like template parsing) can integrate into React or Vue.

### Q: What browsers are supported?  
A: The library supports modern browsers. Ensure `backdrop-filter` is supported for blur effects.

---

For more details or contributions, feel free to submit issues or pull requests to the project repository. Happy coding!

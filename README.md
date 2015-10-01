# Tooltip 
[![Build Status](https://travis-ci.org/lagden/tooltip.svg?branch=master)](https://travis-ci.org/lagden/tooltip) 
[![Dependency Status](https://david-dm.org/lagden/tooltip.svg)](https://david-dm.org/lagden/tooltip) 
[![devDependency Status](https://david-dm.org/lagden/tooltip/dev-status.svg)](https://david-dm.org/lagden/tooltip#info=devDependencies) 

> A simple tooltip.

## Install

Via [NPM](https://www.npmjs.com/)

```
npm install lagden-tooltip --save
```

Via [bower](https://bower.io/)

```
bower install lagden-tooltip --save
```


## API

### Methods

There are three methods: `show`, `hide` and `destroy`.  
Only `destroy` is available when you are using as **jQuery plugin**.

### Options

Some options can be passed when initialize:

| Option | Description | Default |
| --- | --- | --- |
| attr | Specify from whence come the value | `'data-title'` |
| content | Custom value | `''` |
| html | Escaping your value | `false` |
| css | The component stylesheet class name | `'theTooltip'` |
| place | Force the place where shown the tooltip. Possibles values: `auto`, `top` and `bottom` | `'auto'` |
| space | Add some space between target and tooltip | `15` |

## Usage

There are two ways:

**Warning:**
Examples written in `CoffeeScript`.

### Vanilla

```coffeescript
  tt = new Tooltip '#info'
```

### jQuery

```coffeescript
  $tips = $ '.tips'
  $tips.theTooltip()

  # Custom options
  $info = $ '#info'
  $info.theTooltip
    content: '''
      <h3>Title</h3>
      <p>Some pretty cool stuff!</p>
    '''
    html: true
```


## Stylesheet

Take a look on [stylus/tooltip.styl](https://github.com/lagden/tooltip/blob/master/stylus/tooltip.styl) file.


## Example

See [here](http://lagden.github.io/tooltip/).
![Example](https://raw.githubusercontent.com/lagden/tooltip/master/animation.gif)


## License

MIT © [Thiago Lagden](http://lagden.in)

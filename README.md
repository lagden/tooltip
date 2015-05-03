Tooltip
=======

A simple plugin written in ES6.

## Install

```shell
npm install -g volo
volo add -skipexists lagden/tooltip/0.1.0/es5 your/lib/path
```

## Methods

There are three methods: `show`, `hide` and `destroy`.  
Only `destroy` is available when you are using as **jQuery plugin**.

## Options

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

#### Vanilla

```coffeescript
  tt = new Tooltip '#info'
```

#### jQuery

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

Take a look on [es5/tooltip.css](https://github.com/lagden/tooltip/blob/master/es5/tooltip.css) file.

## Example

See [here](http://lagden.github.io/tooltip/).

![Example](https://raw.githubusercontent.com/lagden/tooltip/master/animation.gif)

## Credit

| [![Thiago Lagden](http://gravatar.com/avatar/bfe5ce4cb209f3e4f4584e1f5aa209c6.png?s=144)](http://lagden.in) |
| :-----------: |
| [Thiago Lagden](http://lagden.in) (creator) |

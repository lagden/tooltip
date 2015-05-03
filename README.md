Tooltip
=======

A simple plugin written in ES6.

## Install

```shell
npm install -g volo
volo add -skipexists lagden/tooltip/0.1.0/es5 your/lib/path
```

## Usage

Theres two ways:

**Warning:**
Examples written in `CoffeeScript`

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

## Style

Take a look on [es5/tooltip.css](https://github.com/lagden/tooltip/blob/master/es5/tooltip.css) file

## Credit

| [![Thiago Lagden](http://gravatar.com/avatar/bfe5ce4cb209f3e4f4584e1f5aa209c6.png?s=144)](http://lagden.in) |
| :-----------: |
| [Thiago Lagden](http://lagden.in) (creator) |

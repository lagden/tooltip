Tooltip
=======

A simple plugin written in ES6

## Install

```shell
npm install -g volo
volo add -skipexists lagden/tooltip/0.1.0/es5 your/lib/path
```

## Usage

Theres two ways:

#### Vanilla

```coffeescript
  tt = new Tooltip '#info'
```

#### jQuery

```coffeescript
  $('.tips').theTooltip()

  $('#info').theTooltip
    content: '''
      <h3>Title</h3>
      <p>Some pretty cool stuff!</p>
    '''
    html: true
```

## Style

```stylus
.promote-layer
  backface-visibility hidden

.theTooltip
  $bgcolor = rgba(black, 0.7)
  @extend .promote-layer
  box-sizing border-box
  color #fff
  background-color $bgcolor
  position absolute
  top 0
  left 0
  right auto
  bottom auto
  display inline-block
  padding 15px
  border-radius 5px
  visibility hidden
  opacity 0
  transition opacity 0.3s ease-out
  z-index 100

  &:after
    width 0
    height 0
    border-left 10px solid transparent
    border-right 10px solid transparent
    border-top 10px solid $bgcolor
    content ''
    position absolute
    left 50%
    bottom -10px
    margin-left -10px

  &.top:after
    border-top-color transparent
    border-bottom 10px solid $bgcolor
    top -20px
    bottom auto

  &--show
    visibility visible
    opacity 1

.theTooltip-parent
  position relative
```

## Credit

| [![Thiago Lagden](http://gravatar.com/avatar/bfe5ce4cb209f3e4f4584e1f5aa209c6.png?s=144)](http://lagden.in) |
| :-----------: |
| [Thiago Lagden](http://lagden.in) (creator) |

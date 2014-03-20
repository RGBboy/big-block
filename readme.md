# Big Block

An javascript game engine designed to work in a browser and on a node.js 
server.

[![Browser Support](https://ci.testling.com/rgbboy/big-block.png)
](https://ci.testling.com/RGBboy/big-block)

[![Build Status](https://secure.travis-ci.org/RGBboy/big-block.png)](http://travis-ci.org/RGBboy/big-block)

Big Block is still very early in development. Expect API changes as we make it 
more simple, flexible and testable.

# Goals

## Simple

Big Block is simple. It does not impose how the game loop must work nor any 
other core functionality you get from other game engines.

## Flexible

Big Block has been made so you can compose your game with the Entities, Components and 
Systems that you need. There are already [a few on NPM to choose from](https://www.npmjs.org/search?q=%22big+block%22) 
or you can simply create your own.

## Testable

I don't like manual testing. I just want to know that my game will work across 
the browsers I want to support. Big Block has been built with automated 
testing at its core. Just write your tests once and know that your game is 
stable each time it passes.

# Example



# Install

With [npm](http://npmjs.org) do:

```
npm install big-block
```

# Entities



# Components



# Systems



# Dependency Injection

Big Block uses `di.js` for dependency injection. `di.js` relieves developers 
of having to maintain a main method to instantiate and pass around the systems 
(aka singletons). When you create a new game with Big Block you pass in an 
array of systems that have been registered with `di.js`. When one of these 
systems is requested, `di.js` instantiates and injects all dependencies into 
the system. The dependencies that are injected are singletons and are only 
instantiated once in the lifetime of a game.

# API

`var BigBlock = require('big-block');`

## BigBlock.di

Reference to the di.js module;

## BigBlock.EntitySystem

Reference to the EntitySystem class;

## var game = BigBlock([systems])

## game.get(token)

Get the instantiated system associated with `token`.

# To Do

# License 

(The MIT License)

Copyright (c) 2014 RGBboy &lt;l-_-l@rgbboy.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
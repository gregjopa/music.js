# music.plugin.js

## What is this?

This is a an audiolib.js plugin build of music.js. It allows music.js to be bundled with audiolib.js, and registers music.js as an audiolib.js plugin, giving access to many benefits such as being automatically included in audiolib.js' AudioWorkers and being easily pluggable in NodeJS.

Besides just plugging into the plugin architechture, this plugin also extends some functionality in audiolib.js to take advantage of music.js, for example it allows instances of Oscillators to set frequencies based on music.js Note instances.

## How to build?

Just run ```make``` in this directory, the only dependencies are that you have make installed, and a CAT-compatible command-line tool (you most probably do).

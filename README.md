# Roll 20 Sheet for the Black Sword Hack

Code for a custom character sheet for "THE BLACK SWORD HACK" system, for use in Roll20

There's some dev conveniences that mean you'll have to build the copy for roll20 on your own

I like to develop with a server, I've bundled http-server and nodemon as conveniences

To build code for roll20:

- clone repo
- npm i
- npm run build

This will yield you a dist folder, which has the 2 files you'll need to use for roll20:
**roll20.html** & **style.css**

(The other files in that folder are stuff generated to make development a little more seamless)

To serve, dev:

- npm run serve _# serves the dist folder (so make sure you have one) @ localhost:7777_
- npm run dev _# starts up nodemon_

## modifying

build.js, which _npm run dev_ and _npm run build_ both run, does a few things

- takes style.css and the images and moves them directly to the dist
- injects the contents of main.js into the `${INLINE_SCRIPT}` placeholder in index.html. This generates a file named "roll20.html"
- takes the contents of roll20.html and inserts them into the `${INSERT_HTML}` placeholder in template.html

Changing template.html will not yield any changes to the product you inserting into the roll20 environment.

The only changes that will actively do anything there are style.css, index.html, and main.js

main.js is blank now but I'm leaving it to make this easier to reuse as a template

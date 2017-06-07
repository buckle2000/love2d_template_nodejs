# LÖVE project template & build system

a nodejs version of [https://github.com/buckle2000/love_moonscript_template]

## Supported file formats

In order to build certain file **pattern**, corresponding **program** must be placed in `PATH`.

pattern|program|destination
-|-|-
*.tmx  | [tiled](http://www.mapeditor.org/) | *.lua
*.ase  | [aseprite](http://aseprite.org/) | *.png
*.moon | [moonc](http://moonscript.org/) | *.lua
\*.*   | N/A         | *as-is*

## What to do

```shell
git clone <this repo>
npm install 
gulp         # build
love build   # run
```

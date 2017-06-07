# LÖVE project template & build system

a nodejs version of [https://github.com/buckle2000/love_moonscript_template]

## Supported file formats

In order to build certain file **pattern**, corresponding **program** must be placed in `PATH`.

pattern|program|dest
-|-|-
*.tmx  | tiled       | *.lua
*.ase  | aseprite    | *.png
*.moon | moonc  | *.lua
\*.*   | N/A         | *as-is*

## What to do

```shell
git clone <this repo>
npm install 
gulp         # build
love build   # run
```

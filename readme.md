# LÖVE project template & build system

a nodejs version of [https://github.com/buckle2000/love2d_moonscript_template]

## Installation

```shell
git clone <this repo>
npm install 
```

## Usage

First, add some files in `src/`.

Then:
```shell
gulp         # build
love build   # run
```

## Supported file formats

In order to build certain file **pattern**, corresponding **program** must be placed in `PATH`.

If you choose *not* to use certain **pattern**, just do not put certain files in `src/`.

pattern|program|destination
-|-|-
*.tmx  | [tiled](http://www.mapeditor.org/) | *.lua
*.ase  | [aseprite](http://aseprite.org/) | *.png
*.moon | [moonc](http://moonscript.org/) | *.lua
\*.*   | N/A         | *as-is*

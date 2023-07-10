#!/bin/sh
root=$(pwd)
echo "current workspace - $root"
# api
cd "$root/api" || exit
rm -rf package-lock.json
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf node_modules
ncu -u
# cms
cd "$root/cms" || exit
rm -rf package-lock.json
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf node_modules
ncu -u
# builder
cd "$root/builder" || exit
rm -rf package-lock.json
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf node_modules
ncu -u
# site
cd "$root/site" || exit
rm -rf package-lock.json
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf node_modules
ncu -u
# root
cd "$root" || exit
rm -rf package-lock.json
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf .pnp.cjs
rm -rf .pnp.loader.mjs
rm -rf .yarn
rm -rf node_modules
ncu -u
#
npm install
#
npm run prettier
#
# npm run build:api
#
# npm run build:cms:pro
#
# npm run build:builder:pro

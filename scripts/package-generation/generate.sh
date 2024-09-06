node generate-package.js

cd ../../../package/full-version

yarn && yarn lint:fix && yarn format

wait

rm -rf node_modules

wait

cd ../../full-version/scripts/starter-kit-generation

sh generate.sh

wait

cd ../../../starter-kit

rm -rf node_modules

wait

cd ../

cp -r starter-kit package/

cp -r full-version/scripts/demo-generation/demo-configs package/

wait

zip -r package.zip package

wait

rm -rf package
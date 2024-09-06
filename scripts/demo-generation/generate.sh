set -e
for i in {1..6}
do
	node replace.js demo-$i
	cd ../../
	yarn build --base=https://pixinvent.com/demo/vuexy-react-admin-dashboard-template-old/demo-$i/
	mv dist demo-$i
	zip -r demo-$i.zip demo-$i
	rm -rf demo-$i
  cd scripts/demo-generation
  node reset.js
done

deploy : 
	git add -A .
	git ci -m "backup"

	node --harmony bin/deploy -m
	git co master

	rm -rf `ls | egrep -v '^(temp|node_modules)'`

	cp -rf temp/* ./
	rm -rf temp/
	git add -A .
	git ci -m "publish"
	git push
deploy : 
	node --harmony bin/deploy -m
	git co master

	rm -rf `ls | egrep -v '^(temp|node_modules)'`

	cp -rf built/* ./
	rm -rf built/
	git add -A .
	git ci -m "publish"
	git push
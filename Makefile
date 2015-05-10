deploy : 
	git add -A .
	git ci -m "dev save"
	git push
	node --harmony bin/deploy -m
	git co master
	cp -rf built/* ./
	rm -rf built/
	git add -A .
	git ci -m "publish"
	git push
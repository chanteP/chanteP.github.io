deploy : 
	node --harmony bin/deploy -m
	git co master
	cp -rf built/* ./
	rm -rf built/
	
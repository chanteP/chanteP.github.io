.IGNORE : save deploy

run : save deploy back

save : 
	git add -A .
	git ci -m "backup"
	git push

deploy : save
	node --harmony bin/deploy -m
	git co master
	git pull

	rm -rf `ls | egrep -v '^(temp|node_modules)'`

	cp -rf temp/* ./
	git add -A .
	git ci -m "publish"
	git push

back : 
	git co dev
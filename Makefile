.IGNORE : save deploy

run : save deploy back

save : 
	git add -A .
	git ci -m "deploy backup"
	git push

deploy : save
	NODE_ENV=production node build
	git co master
	git pull

	rm -rf `ls | egrep -v '^(temp|node_modules)'`

	cp -rf temp/* ./
	git add -A .
	git ci -m "publish"
	git push

back : 
	git co dev
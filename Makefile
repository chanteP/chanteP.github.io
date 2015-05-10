deploy : 
	node --harmony bin/deploy -m
	git co master

	rm -rf _layouts
	rm -rf _posts
	rm -rf static
	rm -rf pages
	rm -f *.html
	rm -f config.yaml
	rm -f CNAME

	cp -rf built/* ./
	rm -rf built/
	git add -A .
	git ci -m "publish"
	git push
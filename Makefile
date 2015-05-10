deploy : 
	node --harmony bin/deploy -m
	git co master
	cp built/* ./
	
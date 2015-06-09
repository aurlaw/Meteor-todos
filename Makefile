compass_watch:
	compass watch

compass_build:
	compass compile -e production --force

meteor:
	meteor	

dev: compass_watch meteor


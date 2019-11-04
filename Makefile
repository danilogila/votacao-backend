setup:
	npm install
	docker run --name mongonode -p 27017:27017 -d -t mongo
	docker run --name redisnode -p 6379:6379 -d -t redis:alpine
run:
	npm run start
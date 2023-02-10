.env:
	cp .env.dist .env

install: .env node_modules start_db public/dist
	pnpm prisma db push
	-make seed_db


start_db:
	docker compose up -d

stop_db:
	docker compose stop

seed_db:
	-npx ts-node prisma/seed.ts

public/dist:
	pnpm run build

node_modules:
	pnpm install

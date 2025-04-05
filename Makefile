buildui:
	rumious build:dev

start:
	@cd server && go run main.go

entgen:
	@cd server/pkg && go generate ./ent
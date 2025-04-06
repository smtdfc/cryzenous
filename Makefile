buildui:
	rumious build:dev

builduiprod:
	rumious build:prod

start:
	@cd server && go run main.go

entgen:
	@cd server/pkg && go generate ./ent
buildui:
	rumious build:dev

builduiprod:
	rumious build:prod

start:
	@cd server && go run -x main.go

entgen:
	@cd server/pkg && go generate ./ent
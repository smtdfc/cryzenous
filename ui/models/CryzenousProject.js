export class CryzenousProject {
	constructor(id, name, metadata = {}, createAt = '',mode, status) {
		this.id = id;
		this.name = name;
		this.metadata = metadata;
		this.tasks = [];
		this.createAt = createAt;
		this.mode = mode ?? 'Normal';
		this.status = status ?? 'Active';
	}
	
	
	static generate(raw = {}) {
		return new CryzenousProject(
			raw.id,
			raw.name,
			raw.metadata,
			raw.createAt,
			raw.mode,
			raw.status
		);
	}
}
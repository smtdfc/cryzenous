export class CryzenousTask {
	constructor(id, name,metadata={}, createAt = '', status, projectID) {
		this.id = id;
		this.name = name;
		this.metadata = metadata;
		this.createAt = createAt;
		this.status = status ?? 'Active';
		this.projectID = projectID;
	}
	
	static generate(raw = {}) {
		return new CryzenousTask(
			raw.id,
			raw.name,
			raw.metadata,
			raw.createAt,
			raw.mode,
			raw.status,
			raw.projectID
		);
	}
}
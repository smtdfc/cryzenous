
package schema

import(
  "time"
  "github.com/google/uuid"
  "entgo.io/ent"
  "entgo.io/ent/schema/field"
  "entgo.io/ent/schema/edge"
)

type Task struct {
    ent.Schema
}


func (Task) Fields() []ent.Field {
    return []ent.Field{
        field.UUID("id", uuid.UUID{}).Default(uuid.New),
        field.String("name"),
        field.String("status").Default("active"),
        field.String("metadata").Default("{}"),
        field.String("createAt").StorageKey("create_at").Default(time.Now().Format(time.RFC3339)).Immutable(),
        field.UUID("projectID",uuid.UUID{}).Default(uuid.New).StorageKey("project_tasks").Optional().Nillable(),
    }
}

func (Task) Edges() []ent.Edge {
    return []ent.Edge{
        edge.From("project", Project.Type).Ref("tasks").Field("projectID").Unique(),
    }
}
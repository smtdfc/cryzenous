
package schema

import(
  "time"
  "github.com/google/uuid"
  "entgo.io/ent"
  "entgo.io/ent/schema/field"
  "entgo.io/ent/schema/edge"
)

type Project struct {
    ent.Schema
}


func (Project) Fields() []ent.Field {
    return []ent.Field{
        field.UUID("id", uuid.UUID{}).Default(uuid.New),
        field.String("name"),
        field.String("status").Default("active"),
				field.String("mode").Default("normal"),
        field.String("metadata").Default("{}"),
        field.String("createAt").StorageKey("create_at").Default(time.Now().Format(time.RFC3339)).Immutable(),
        field.String("owner").Optional().Nillable(),
    }
}

func (Project) Edges() []ent.Edge {
    return []ent.Edge{
        edge.To("tasks", Task.Type),
    }
}
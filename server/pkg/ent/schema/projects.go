
package schema

import(
  "time"
  "github.com/google/uuid"
  "entgo.io/ent"
  "entgo.io/ent/schema/field"
)

type Projects struct {
    ent.Schema
}


func (Projects) Fields() []ent.Field {
    return []ent.Field{
        field.UUID("id", uuid.UUID{}).Default(uuid.New),
        field.String("name"),
        field.Time("createAt").StorageKey("create_at").Default(time.Now).Immutable(),
        field.String("owner").Optional().Nillable(),
    }
}

func (Projects) Edges() []ent.Edge {
    return nil
}

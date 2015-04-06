defmodule Chatter.User do
  use Ecto.Model

  schema "users" do
    field :username, :string, null: false
    field :first_name, :string, null: false
    field :last_name, :string, null: false
    timestamps
  end
end

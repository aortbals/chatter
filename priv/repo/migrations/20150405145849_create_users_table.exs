defmodule Chatter.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      timestamps
    end
  end
end

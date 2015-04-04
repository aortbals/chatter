defmodule Chatter.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    reply socket, "join", %{status: "connected"}
    broadcast! socket, "user:entered", %{user: message["user"]}
    {:ok, socket}
  end

  def leave(_reason, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", message, socket) do
    broadcast! socket, "new:msg", message
    {:ok, socket}
  end

  def handle_out(event, message, socket) do
    reply socket, event, message
    {:ok, socket}
  end
end

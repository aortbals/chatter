defmodule Chatter.PageController do
  use Chatter.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end

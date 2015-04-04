import {Socket} from "phoenix"

class App {
  static init() {
    var socket = new Socket("/ws")
    var $messages = $('.js-Messages')
    var $messageInput = $('.js-Messages-input')
    var $usernameInput = $('.js-Messages-username-input')

    var username = localStorage.getItem('username')
    $usernameInput.val(username);

    socket.join("rooms:lobby", {}, chan => {
      $messageInput.off('keypress').on('keypress', e => {
        if (e.keyCode === 13) {
          chan.send("new:msg", {
            user: $usernameInput.val(),
            body: $messageInput.val()
          })
          $messageInput.val("")
        }
      })

      chan.on("join", msg => {
        $messages.append(`<div class="Message Message--notification">
          You are now connected
        </div>`)
      })

      chan.on("new:msg", msg => {
        $messages.append(this.messageTemplate(msg, $usernameInput.val()))
      })
    })

    $usernameInput.on('keyup', e => {
      localStorage.setItem('username', $(e.target).val())
    })
  }

  static sanitize(html) {
    return $("<div/>").text(html).html()
  }

  static messageTemplate(msg, currentUsername) {
    let username = this.sanitize(msg.user || "anonymous")
    let body = this.sanitize(msg.body)
    let isMe = username === currentUsername
    let isMeClass = isMe ? 'Message--me' : '';

    return (`
      <div class="Message ${isMeClass}">
        <div class="Message-inner-container">
          <div class="Message-from">${username}</div>
          <div class="Message-body">
            ${body}
          </div>
        </div>
      </div>
    `)
  }
}

$(() => App.init())

export default App

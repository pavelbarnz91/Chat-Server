const databases = {
    html: {
        chatWindow: 
            `<div class="chat">
            <div class="chat__window">
                <div class="chat__messages-window">
                </div>
                <div class="chat__users">
                    <span class="chat__users__title">Онлайн</span>
                    <div class="chat__users-online"></div>
                </div>
            </div>


            <div class="chat__enter-message-box">

                <div class="enter-message-box__input-box">
                    <textarea class="input-box__input" placeholder="Start enter you message"></textarea>
                </div>

                <div class="enter-message-box__btn-box">
                    <button class="btn-box__send-btn" type="button" data-messageBtn="send">Отправить</button>
                    <button class="btn-box__clear-btn" type="button" data-messageBtn="clear">Очистить</button>
                </div>
            </div>

            <div class="chat__exit-btn-box">
                <button class="chat__exit-btn" type="button">Выход</button>
            </div>
        </div>`
    },
}

module.exports = databases;
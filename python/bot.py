import vk_api

from vk_api.longpoll import VkLongPoll, VkEventType
import json
import datetime

today = datetime.date.today()

week_day = today.weekday()

days_of_week = {
    0: "Понедельник",
    1: "Вторник",
    2: "Среда",
    3: "Четверг",
    4: "Пятница",
    5: "Суббота",
    6: "Воскресенье",
}


current_day = days_of_week[week_day]
delete_day = days_of_week[week_day - 1]
photo_url = f"{current_day}.jpg"


token = ""


bh = vk_api.VkApi(token=token)
give = bh.get_api()
longpoll = VkLongPoll(bh)


def blasthack(id, text, keyboard=None):
    if keyboard:
        keyboard = json.dumps(keyboard, ensure_ascii=False)
    bh.method(
        "messages.send",
        {"user_id": id, "message": text, "random_id": 0, "keyboard": keyboard},
    )


def uploadPhoto(photo_url):
    upload = vk_api.VkUpload(bh)
    photo = upload.photo_messages(photo_url)
    owner_id = photo[0]["owner_id"]
    photo_id = photo[0]["id"]
    access_key = photo[0]["access_key"]
    attachment = f"photo{owner_id}_{photo_id}_{access_key}"
    return attachment


uploadPhoto(photo_url)


for event in longpoll.listen():
    if event.type == VkEventType.MESSAGE_NEW:
        if event.to_me:

            message = event.text.lower()
            id = event.user_id

            keyboard = {
                "one_time": False,
                "inline": False,
                "buttons": [
                    [
                        {
                            "action": {
                                "type": "text",
                                "payload": '{"button": "1"}',
                                "label": "Получить меню",
                            },
                            "color": "secondary",
                        },
                        {
                            "action": {
                                "type": "text",
                                "payload": '{"button": "2"}',
                                "label": "Коллега",
                            },
                            "color": "secondary",
                        },
                        {
                            "action": {
                                "type": "text",
                                "payload": '{"button": "3"}',
                                "label": "О нас",
                            },
                            "color": "secondary",
                        },
                    ]
                ],
            }

            if message == "Здравствуйте":
                blasthack(id, "Привет, я бот!", keyboard)

            elif message == "начать":
                blasthack(
                    id,
                    "Здравствуй! Я - бот Хиринского пельменя. У меня ты можешь запросить меню на сегодня, пообщаться с моим коллегой, или узнать обо мне подробнее.\n"
                    "\n"
                    "Для этого нажми на одну из кнопок снизу",
                    keyboard,
                )

            elif message == "получить меню":
                bh.method('messages.send', {
                          'peer_id': id, 'random_id': '0', 'message': 'Ваше фото', 'attachment': attachment})

            elif message == "коллега":
                blasthack(id, "Переключаю чат на моего коллегу, ожидайте!")

            elif message == "о нас":
                blasthack(
                    id,
                    'Добро пожаловать в "Хиринский пельмень" - вашу новую любимую ланч-зону!'
                    "\n"
                    "\n"
                    "Мы создали для вас уютное и стильное пространство, где можно не только вкусно поесть, но и насладиться полноценным питанием из натуральных продуктов. Мы заботятимся о вашем здоровье и благополучии."
                    "\n"
                    "\n"
                    "В нашей ланч-зоне вы можете насладиться полноценным комплексным обедом, который включает в себя первое, второе, салат и наш фирменный напиток, приготовленный с любовью и заботой. Мы хотим, чтобы вы чувствовали себя как дома, поэтому мы приготовили для вас особые предложения и создали приятную атмосферу"
                    "\n"
                    "\n"
                    "Приходите к нам с понедельника по пятницу с 9:00 до 18:00 и насладитесь вкусной и здоровой едой в компании друзей, коллег или в одиночку. Мы ждем вас и готовы порадовать вас нашим гостеприимством!",
                )

            else:
                blasthack(
                    id,
                    "К сожалению, я вас не понял(. Попробуйте нажать на другую кнопку, либо позвать моего коллегу",
                )

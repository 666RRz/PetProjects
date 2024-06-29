import asyncio
import logging
import sys


from aiogram import Bot, Dispatcher, html, types
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.filters.command import Command
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.utils.callback_answer import CallbackAnswer, CallbackAnswerMiddleware


TOKEN = ''

dp = Dispatcher()
builder = InlineKeyboardBuilder()


for index in range(1):
    builder.button(text=f'Подтвердить', callback_data='confirm')
    builder.button(text=f'Отмена', callback_data=f'set:{1}')
    builder.button(text=f'Вернуться', callback_data=f'set:{1}')


builder.adjust(1, 1, 1)


@dp.message(Command('key'))
async def get_keyboard(message: Message):
    await message.reply('Клавиатура:', reply_markup=builder.as_markup())


@dp.message(Command('help'))
async def help_def(message: Message):
    await message.reply()


@dp.message(CommandStart())
async def command_start_handler(message: Message):
    await message.answer(f'Hello {html.bold(message.from_user.full_name)}, your id = {html.bold(message.from_user.id)}')


@dp.message(Command('hello'))
async def hello_handler(message: Message):
    await message.answer(f'Hello, {html.bold(message.from_user.full_name)}!')


@dp.message()
async def echo_handler(message: Message):
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer('Nice try!')


async def main():
    bot = Bot(token=TOKEN, default=DefaultBotProperties(
        parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

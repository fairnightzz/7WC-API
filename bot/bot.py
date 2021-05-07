from privatekeylmao import TOKEN,password

import discord
import os
import time
import random
import logging
from discord.ext import commands, tasks
import requests

started = False

client = commands.Bot(command_prefix=">")


@client.event
async def on_ready():
    global started
    await client.change_presence(activity = discord.Game(name = '> for a list of commands'))
    if not started:
        started = True
        #Before you run tasks take the text file


#-----Commands-----
class Commands(commands.Cog):
    def __init__(self, client):
        self.client = client
        
    @commands.command(help = "Gives you a code to use on the Workshop!")
    async def request(self,ctx):
        person = ctx.author
        channel  = await person.create_dm()
        
        lmao = requests.post('http://144.217.90.215:2000/user/'+str(ctx.author.id), json={\
        'id': str(ctx.author.id), 'name': str(ctx.author),\
        'avatar':str(ctx.author.avatar_url),'key':password})
        print(lmao)
        await channel.send(str(ctx.author.id))
        await channel.send("Now use the username for the api!")

client.add_cog(Commands(client))
client.run(TOKEN)

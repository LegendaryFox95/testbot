const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if (oldMember.id === `601682680756568084`) {
		if (oldMember.nickname != newMember.nickname) {
			if (newMember.nickname != ``) {
				newMember.setNickname(``)
			}
		}
	}
});

client.on('message', msg => {
	if (msg.content === `!blink`) {
		msg.channel.send(`<a:mfwgirldoesntsuckmypeesos:591234476953174037>`);
	}
});

client.on('message', msg => {
	if (msg.content === `!wink`) {
		msg.channel.send(`<a:pisosya:675805476549558343>`);
	}
});

client.on('message', msg => {
	if (msg.content === `!pog`) {
		msg.channel.send(`<a:ummmok:613456031808225300>`);
	}
});

client.on('message', msg => {
	if (msg.content === `!sans`) {
		msg.channel.send(`<a:pogchampsans:611583559274201098>`);
	}
});

client.on('message', msg => {
  if (msg.content === '!roll') {
    msg.reply(Math.floor(Math.random() * 1000));
  }
});

client.on('message', msg => {
  if (msg.content === '!case') {
	var rannum;
	rannum = Math.floor(Math.random() * 81);
	if (rannum < 10) {
		msg.reply(`Вам выпал обычный кот ${client.emojis.first(6)[5]}`);
  } else if (rannum < 20) {
		msg.reply(`Вам выпал обычный кот ${client.emojis.first(43)[42]}`);
  } else if (rannum < 30) {
		msg.reply(`Вам выпал обычный кот ${client.emojis.first(38)[37]}`);
  } else if (rannum < 40) {
		msg.reply(`Вам выпал обычный кот ${client.emojis.first(32)[31]}`);
  } else if (rannum < 50) {
		msg.reply(`Вам выпал обычный кот ${client.emojis.first(35)[34]}`);
  } else if (rannum < 55) {
		msg.reply(`Вам выпал редкий кот ${client.emojis.first(50)[49]}`);
  } else if (rannum < 60) {
		msg.reply(`Вам выпал редкий кот ${client.emojis.first(2)[1]} `);
  } else if (rannum < 65) {
		msg.reply(`Вам выпал редкий кот ${client.emojis.first(9)[8]} `);
  } else if (rannum < 70) {
		msg.reply(`Вам выпал редкий кот ${client.emojis.first(16)[15]} `);
  } else if (rannum < 73) {
		msg.reply(`Вам выпал эпический кот ${client.emojis.first()}`);
  } else if (rannum < 76) {
		msg.reply(`Вам выпал эпический кот ${client.emojis.first(17)[16]}`);
  } else if (rannum < 79) {
		msg.reply(`Вам выпал эпический кот ${client.emojis.first(26)[25]}`);
  } else if (rannum < 80) {
		msg.reply(`Вам выпал легендарный кот ${client.emojis.first(14)[13]}`);
  } else if (rannum < 81) {
		msg.reply(`Вам выпал легендарный кот ${client.emojis.first(36)[35]}`);
  } 
  }
});

client.on('message', msg => {
  if (msg.content.endsWith('нет')) {
    msg.channel.send(`пидора ответ`);
  }
});

client.on('message', msg => {
  if (msg.content.endsWith('да')) {
	if (msg.author.tag != "Девушка Фокса#4807") {
		msg.channel.send(`пизда`);
	}
  }
});

client.on('message', msg => {
	if (msg.content.startsWith(`!anon `)) {
		if (msg.channel.type === `dm`) {
			var args = msg.content.slice(6).split(/ +/);
			var cuschan = `${args[0]}`;
			var channeles = client.channels.find(ch => ch.name === `${cuschan}`);
			var idmentions
			for (var i = 1; i < args.length; i++) {
				var matches = args[i].match(/<@!?(\d+)>/);
				if (matches) {
					idmentions = 1;
				}
			}
			if (idmentions != 1) {
				if (msg.author.tag != "Девушка Фокса#4807") {
				    if (channeles) {
					    channeles.send(`Anon:${msg.content.slice(6+args[0].length)}`).then(() => {
							client.channels.find(chan => chan.id === `675731849858908186`).send(`${msg.author.tag}, ${msg.content}`);(`${msg.author.tag}, ${msg.content}`);
							}).catch(err => {
								msg.channel.send(`У меня нету прав отсылать сообщение туда, писос`);
								});
								} else {
									msg.channel.send(`Соси писос, неправильно введена комманда.`);
									}
		}
	} else {
		msg.channel.send(`Извините, но пинги пользователей запрещены.`)
	}
}
}
});

client.login(process.env.BOT_TOKEN);

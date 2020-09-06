const Discord = require('discord.js');
const Postgres = require('pg');
const client = new Discord.Client();
const postgres = new Postgres.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});
postgres.connect();
var counting = 0;
var feed = 0;
var hunTime;

function hunger() {
	if (feed > 0){
		feed -= 1;
		if (feed > 0) {
			clearTimeout(hunTime);
			hunTime = setTimeout(hunger, 1200000);
		}
	}
}

function getdb() {
	var na = client.users.array().filter(us => us.pcoins != undefined);
	client.channels.find(ch => ch.id === `693067909014224910`).send(`s`);
	for (let i = 0; i < na.length; i++) {
	client.channels.find(ch => ch.id === `693067909014224910`).send(`${na[i].id} ${na[i].pcoins} ${na[i].lastdaily}`);
	}
}

client.once('ready', () => {
});

client.on('message', msg => {
	if (msg.content === '!count') {
		postgres.query('SELECT  count.n FROM count;', (err, res) => {
			if (err) throw err;
			counting = parseInt(JSON.stringify(res.rows[0]).slice(5, -1));
		});
		counting += 1;
		postgres.query(`UPDATE count SET n=${counting}`, (err, res) => {
			if (err) throw err;
		});
		msg.channel.send(counting);
	}
});

client.on('message', msg => {
	if (msg.content === `!wash`) {
		if (msg.author.pcoins >= 1000) {
			msg.author.pcoins -= 1000;
			msg.member.removeRole('682691060748910663');
			msg.channel.send(`${msg.author} помылся и теперь приятно пахнет, мур.`);
			getdb();
		}
	}
});

client.on('message', msg => {
	if (msg.content.startsWith(`!vomit`)) {
		var args = msg.content.slice(7).split(` `);
		var anuser = msg.guild.members.find(us => us.id === `${args[0]}`);
		if (anuser) {
		} else {
			var anuser = msg.guild.members.find(us => us.id === `${args[0]}`);
			if (anuser) {
			} else {
				var anuser = msg.member;
			}
		}
		if (msg.author.pcoins >= 3000) {
			msg.author.pcoins -= 3000;
			clearTimeout(hunTime);
			msg.channel.send(`Ой! Что-то мне нехорошо...`);
			msg.channel.send(`*Ужин Кота Писос оказывается на ${anuser}!*`);
			anuser.addRole('682691060748910663');
			feed = 0;
			getdb();
		}
	}
});

client.on('message', msg => {
	if (msg.content.startsWith(`!gamble `)) {
		var args = msg.content.slice(8).split(` `);
		if (args[0] > 0) {
		if (msg.author.pcoins >= args[0]) {
			var ran = Math.floor(Math.random() * 2);
			if (ran === 1) {
				msg.author.pcoins += parseInt(args[0]);
				msg.reply(`Ого, поздравляю ты выиграл!`);
				getdb();
			} else {
				msg.author.pcoins -= parseInt(args[0]);
				msg.reply(`Соси писос.`);
				getdb();
			}
		}
		}
	}
});

client.on('message', msg => {
	if (msg.channel.id === `693090256832036886`) {
		var args = msg.content.replace(/\n/gi, ` `).split(` `);
		for (var i = 0; i < args.length; i += 3) {
			client.users.find(us => us.id === `${args[i]}`).pcoins = parseInt(args[i+1]);
			client.users.find(us => us.id === `${args[i]}`).lastdaily = parseInt(args[i+2]);
		}
	}
});

client.on('message', msg => {
	if (msg.content.startsWith(`!balance`)) {
		var args = msg.content.slice(9).split(` `);
		var anuser = client.users.find(us => us.tag === `${args[0]}`);
		if (anuser) {
		} else {
			var anuser = client.users.find(us => us.id === `${args[0]}`);
			if (anuser) {
			} else {
				var anuser = msg.author;
			}
		}
		if (anuser.pcoins === undefined) {
			msg.channel.send(`Баланс пользователя ${anuser} составляет 0 писос коинов`);
		} else msg.channel.send(`Баланс пользователя ${anuser} составляет ${anuser.pcoins} писос коинов`);
	}
});

client.on('message', msg => {
	if (msg.content === `!daily`) {
		var datra = new Date;
		var daydaily = datra.getDate();
		if (msg.author.pcoins === undefined) {
			msg.author.pcoins = 100;
			msg.author.lastdaily = daydaily;
			msg.reply(`вы получили ваши ежедневные писос коины и теперь ваш баланс составляет ${msg.author.pcoins}.`);
			getdb();
		} else {
			if (msg.author.lastdaily != daydaily) {
				msg.author.pcoins += 100;
				msg.author.lastdaily = daydaily;
				msg.reply(`вы получили ваши ежедневные писос коины и теперь ваш баланс составляет ${msg.author.pcoins}.`);
				getdb();
			} else {
				var h = 23 - datra.getHours();
				var m = 59 - datra.getMinutes();
				var s = 59 - datra.getSeconds();
				msg.reply(`вы уже получили ваши ежедневные писос коины сегодня. Приходите через ${h} часов, ${m} минут, ${s} секунд или пососите писос.`);
			}
		}
	}
});

client.on('message', msg => {
  if (msg.content === `!feed`) {
	  if (msg.channel.type === `text`) {
	  if (!msg.member.roles.find(ro => ro.id === `682691060748910663`)) {
	  feed += 1;
	  if (feed === 1) {
		  clearTimeout(hunTime);
		  hunTime = setTimeout(hunger, 1200000);
		  msg.channel.send(`*ням-ням*`);
		  if (msg.author.pcoins === undefined) {
			  msg.author.pcoins = 50;
		  } else { 
			  msg.author.pcoins += 50;
		  }
		  getdb();
		  var feeder = msg.author;
		  msg.channel.send(`Спасибо тебе, ${feeder}, мой желудок был полностью пуст!`);
	  }
	  if (feed === 2) {
		  clearTimeout(hunTime);
		  hunTime = setTimeout(hunger, 1200000);
		  msg.channel.send(`*ням-ням*`);
		  if (msg.author.pcoins === undefined) {
			  msg.author.pcoins = 50;
		  } else { 
			  msg.author.pcoins += 50;
		  }
		  getdb();
		  msg.channel.send(`Я начинаю наедаться.`);
	  }
	  if (feed === 3) {
		  clearTimeout(hunTime);
		  hunTime = setTimeout(hunger, 1200000);
		  msg.channel.send(`*ням-ням*`);
		  if (msg.author.pcoins === undefined) {
			  msg.author.pcoins = 50;
		  } else { 
			  msg.author.pcoins += 50;
		  }
		  getdb();
		  msg.channel.send(`Всё! Мой желудок забит дополна!`);
	  }
	  if (feed === 4) {
		  clearTimeout(hunTime);
		  msg.channel.send(`Ой! Что-то мне нехорошо...`);
		  var feeder = msg.author;
		  msg.channel.send(`*Ужин Кота Писос оказывается на ${feeder}!*`);
		  var rol = msg.guild.roles.find(ro => ro.name === `Облеванный`);
		  if (rol) {
			  msg.member.addRole(rol);
		  } else {
			  msg.guild.createRole({
				  name: 'Облеванный',
				  color: [128, 0, 0],
				  }).then(() => {
					  msg.member.addRole(msg.guild.roles.last());
				  });
		  }
		  feed = 0;
	  }
	  } else {
		  msg.reply(`Сори, но я не хочу есть еду от облеванного.`);
	  }
	  }
  }
});

client.on('message', msg => {
  if (msg.content === `!patch`) {
	  msg.channel.send(`Последний патчноут:\n-Добавлены писос коины.\n-Новая комнда !balance позволяющая чекать количество писос коинов.\n-Новая команда !daily позволяющая получать писос коины каждый денью\n-Новая команда !gamble позволяющая играть на писос коины.\n-За писос коины можно помыться (1000 писос коинов), тем самым избавиться от роли облеванного.\n-За писос коины можно заставить Кота Писоса облевать выбранного участника сервера(3000 писос коинов).\n-Теперь нельзя кормить Кота Писоса имея роль облеванного.\n-За кормежку Кота Писоса будут начисляться писос коины.\n-Исправлен баг при котором можно было кормить Кота Писоса в его лс.`)
  }
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
  if (msg.content.toLowerCase().endsWith('нет') || msg.content.toLowerCase().endsWith('нeт') || msg.content.toLowerCase().endsWith('net') || msg.content.toLowerCase().endsWith('nеt') || msg.content.toLowerCase().endsWith('нет.') || msg.content.toLowerCase().endsWith('нeт.') || msg.content.toLowerCase().endsWith('net.') || msg.content.toLowerCase().endsWith('nеt.')) {
    msg.channel.send(`пидора ответ`);
	  if (msg.content.toLowerCase().endsWith('нeт') || msg.content.toLowerCase().endsWith('net') || msg.content.toLowerCase().endsWith('nеt') || msg.content.toLowerCase().endsWith('нет.') || msg.content.toLowerCase().endsWith('нeт.') || msg.content.toLowerCase().endsWith('net.') || msg.content.toLowerCase().endsWith('nеt.')) {
		  msg.channel.send(`https://cdn.discordapp.com/attachments/675995373017235456/708979446530441256/23.png`);
	  }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase().endsWith('да') || msg.content.toLowerCase().endsWith('дa') || msg.content.toLowerCase().endsWith('da') || msg.content.toLowerCase().endsWith('dа') || msg.content.toLowerCase().endsWith('да.') || msg.content.toLowerCase().endsWith('дa.') || msg.content.toLowerCase().endsWith('da.') || msg.content.toLowerCase().endsWith('dа.')) {
	if (msg.author != client.user) {
		msg.channel.send(`пизда`);
		if (msg.content.toLowerCase().endsWith('дa') || msg.content.toLowerCase().endsWith('da') || msg.content.toLowerCase().endsWith('dа') || msg.content.toLowerCase().endsWith('да.') || msg.content.toLowerCase().endsWith('дa.') || msg.content.toLowerCase().endsWith('da.') || msg.content.toLowerCase().endsWith('dа.')) {
			msg.channel.send(`https://cdn.discordapp.com/attachments/675995373017235456/708979446530441256/23.png`);
		}
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
			if (msg.everyone === 0) {
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
}
});

client.login(process.env.BOT_TOKEN);

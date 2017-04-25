module.exports.run = (message, args) => {
  let times = 1;
  if (args.length > 1) {
    if (!isNaN(parseInt(args[1]))) {
      args[1] = parseInt(args[1]);
      const max = 10;
      if (args[1] > max) {
        times = max;
      } else if (args[1] < 1) {
        times = 1;
      } else {
        times = args[1];
      }
    }
  }
  
  let msg = new Array(times + 1).join('( ͡° ͜ʖ ͡°)');
  message.channel.sendMessage(msg);
};

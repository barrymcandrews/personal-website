function help(args, out) {
  out("Available commands:\n");
  for (let key of Object.keys(commands)) {
    out("  " + key + "\n")
  }
}

function open(args, out) {
  if (args.length !== 2) {
    out('Usage: open <url>\n');
    return;
  }

  if (!args[1].startsWith("http://") || !args[1].startsWith("https://")) {
    if (!args[1].startsWith("www.")) {
      args[1] = "www." + args[1];
    }
    args[1] = "http://" + args[1];
  }

  window.open(args[1], "_blank");
}

function mail(args, out) {
  if (args.length !== 2) {
    out('Usage: mail <email address>\n');
    return;
  }

  window.open("mailto:" + args[1], "_self");
}

function whoami(args, out) {
  out("barry\n");
}

export const commands = {
  'help': help,
  'open': open,
  'mail': mail,
  'whoami': whoami,
};


const util = require('util');
const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class Action extends EventEmitter {
  constructor(id, device, actiondef) {
    super();

    if (!id) throw new Error("no id provided");
    if (!device) throw new Error("no device provided");
    if (!actiondef) throw new Error("no definition provided");

    this[Sym.ID] = id;
    this[Sym.DEVICE] = device;
    this[Sym.ACTION_DEF] = actiondef;
  }

	get id() { return this[Sym.ID]; }
	get definition() { return this[Sym.ACTION_DEF]; }
  get device() { return this[Sym.DEVICE]; }
  get log() { return this.device.log; }
	exec() { return this[Sym.DEVICE][Sym.COORDINATOR].execAction(this, arguments); }

  [Sym.SETUP]() {
    let def = this[Sym.ACTION_DEF];
    this.log.debug('setup of action '+this+' with ('+JSON.stringify(def)+')...');

    // setup command binding
    if (def.command) {
      let commanddef = /^\W*((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W*$/gi.exec(def.command.id || ""+def.command)
      if (!commanddef) throw new Error("invalid attribue for action "+this.id+": command id = '"+(def.command.id || ""+def.command)+"'");
      def.command.endpointId = parseInt(attrdef[1]);
      def.command.clusterId = parseInt(attrdef[2]);
      def.command.commandId = parseInt(attrdef[3]);
    }
  }

  [Sym.DESTROY]() {

  }

  [Sym.EXEC_ACTION](args) {
    let ret;
    let action_cmd = this[Sym.ACTION_DEF].command;
    let action_exec = this[Sym.ACTION_DEF].exec;

    if (action_cmd) {
      let command = this.device.command(action_cmd.endpointId, action_cmd.endpointId, action_cmd.endpointId);
      if (command) {
        let ret = command.exec.apply(command, args);
      }
      else {
        ret = Promise.reject("bound command not found.");
      }
    }
    else if (action_exec) {
      ret = Promise.resolve().then(() => { return action_exec.apply(this, args); });
    }
    else {
      ret = Promise.reject('no action defined');
    }
    this.emit('action_exec', this, args, ret);
    this.log.debug(''+this.device+''+this+' action executed.');
    return ret;
  }

	toString() { return "[action_"+this.id+"]"; }
  [util.inspect.custom](depth, opts) { return ""+this+" ("+JSON.stringify(this.definition)+")"; }
}

module.exports = Action;

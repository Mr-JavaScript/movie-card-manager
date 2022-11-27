class Signaler {
  constructor (app_name) {

    this.app_name = app_name
    this.components = {}
    this._sender = new SignalSender (app_name, this.components)
    this._reciever = new SignalReciever (app_name, this.components)
    
  }
  connectComponent (comp, comp_name = comp.name) {

    this.components [comp_name] = comp

    comp.sendSignal = (signal_name, data, to)=> {
      let rsp = this._sender.signal (to || this.app_name, signal_name, data)
      let pass = comp.incomingSignal (signal_name, rsp)
      if (pass === null) return rsp
    }
    comp.onSignal   = (signal_name, cb)=> {
      return this._reciever.event (comp.name, signal_name, cb)
    }
    comp.incomingSignal = (signal_name, data)=> {
      if (this._reciever.hasEvent (comp.name, signal_name))
        return this._reciever.signal (comp.name, signal_name, data)
      else
        return null
    }
    comp.onSignal ("app-loaded", ()=> {})
    
    if (comp.signals) comp.signals ()

  }
}

class SignalReciever {
  constructor (app_name, components) {
    this.app_name = app_name
    this.comps = ()=> components
    this.events = {}
  }
  event (comp_name, name, func) {
    if (!this.events [comp_name]) this.events [comp_name] = {}
    this.events [comp_name] [name] = func
  }
  signal (comp_name, signal_name, data) {
    let event = this.events [comp_name] [signal_name]
    if (event) return event (data)
  }
  hasEvent (comp_name, signal_name) {
    let CBs = this.events [comp_name]
    return CBs && CBs [signal_name]
  }
}

class SignalSender {
  constructor (app_name, components) {
    this.app_name = app_name
    this.comps = ()=> components
  }
  signal (comp_name, name, data) {
    let comp = this.comps () [comp_name]
    if (comp) return comp.incomingSignal (name, data)
    else console.log ("signal not registered", comp_name, name)
  }
}
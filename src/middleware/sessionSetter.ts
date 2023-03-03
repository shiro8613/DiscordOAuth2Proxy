const session = require("express-session");

declare module 'express-session' {
    interface SessionData {
        beforePath? :string
        jwtToken? :string
    }
  }

export function SessionSetter() {
    
}
export default class PrismaError {

    P2000 = { message: "Too long", status: 400 }
    P2001 = { message: "Not found", status: 404 }
    P2002 = { message: "Already exists", status: 409 }
    P2003 = { message: "FK failed", status: 400 }
    P2004 = { message: "Constraint failed", status: 400 }

    P2005 = { message: "Invalid type", status: 400 }
    P2006 = { message: "Invalid value", status: 400 }
    P2007 = { message: "Validation error", status: 400 }

    P2011 = { message: "Null violation", status: 400 }
    P2012 = { message: "Missing value", status: 400 }
    P2015 = { message: "Relation not found", status: 404 }
    P2018 = { message: "Required records missing", status: 404 }
    P2025 = { message: "Dependent records not found",status: 404 }

    P1000 = { message: "Auth failed", status: 401 }
    P1001 = { message: "DB unreachable", status: 503 }
    P1008 = { message: "Timeout", status: 504 }
    P1017=  { message: "Connection closed", status: 503 }

}
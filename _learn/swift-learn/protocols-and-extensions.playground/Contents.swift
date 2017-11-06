protocol ExampleProtocol {
    var simpleDescription: String { get }
    mutating func adjust()
}

class SimpleClass: ExampleProtocol {
    var simpleDescription: String = "A very simple class."
    var anotherProperty: Int = 69105
    
    func adjust() {
        simpleDescription += "  Now 100% adjusted."
    }
}
var a = SimpleClass()
a.adjust()
let aDescription = a.simpleDescription

struct SimpleStructure: ExampleProtocol {
    var simpleDescription: String = "A simple structure"
    
    mutating func adjust() {
        simpleDescription += " (adjusted)"
    }
}
var b = SimpleStructure()
b.adjust()
let bDescription = b.simpleDescription

enum SimpleEnumeration: ExampleProtocol {
    case Base, Adjusted
    
    var simpleDescription: String {
        get {
            return self.getDescription()
        }
    }
    
    func getDescription() -> String {
        switch self {
        case .Base:
            return "A simple enum"
        case .Adjusted:
            return "An adjusted enum"
        }
    }
    
    mutating func adjust() {
        self = .Adjusted
    }
}
var c = SimpleEnumeration.Base
c.adjust()
let cDescription = c.simpleDescription


extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    
    mutating func adjust() {
        self += 42
    }
}
print(7.simpleDescription)


extension Double {
    var absoluteValue: Double {
        get {
            if self > 0.0 {
                return self
            } else {
                return -self
            }
        }
    }
}
3.4.absoluteValue
-3.4.absoluteValue

let protocolValue: ExampleProtocol = a
print(protocolValue.simpleDescription)

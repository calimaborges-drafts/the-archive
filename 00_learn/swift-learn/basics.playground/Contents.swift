//: Playground - noun: a place where people can play
print("Hello, world!")

let explicitFloat: Float = 4

let label = "The width is "
let width = 94

let widthLabel = label + String(width)

let sum = 124
let calc = "sum is: \(10.3 + 54)"
let name = "Carlos Augusto"
print("Hello \(name)")

var shoppingList = ["catfish", "water", "tulips", "blue paint"]
shoppingList[1] = "bottle of water"

var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic"
]

occupations["Jayne"] = "Public Relations"

print(occupations)

let emptyArray = [String]()
let emptyDictionary = [String: Float]()

let individualScores = [75, 43, 103, 87, 12]
var teamScore = 0

for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}

print(teamScore)

var optionalString: String? = "Hello"
print(optionalString == nil)

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"

optionalName = nil

if let name = optionalName {
    greeting = "Hello, \(name)"
} else {
    greeting = "Hello, John Doe"
}

let nickName: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \(nickName ?? fullName)"

let vegetable = "cucumber"

switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"):
    print("Is it a spicy \(x)")
default:
    print("Everything tastes good in soup.")
}

let interistingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25]
]

var largest = 0
var largestKind = "Undefined"

for (kind, numbers) in interistingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
            largestKind = kind
        }
    }
}

print("\(largest) \(largestKind)")

var n = 2

while n < 100 {
    n = n * 2
}

print(n)

var m = 2

repeat {
    m = m * 2
} while m < 100

print(m)

var total = 0
for i in 0..<4 {
    total += i
}

print(total)

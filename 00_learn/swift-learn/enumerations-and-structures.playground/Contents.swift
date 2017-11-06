enum Rank: Int {
    case Ace = 1
    case Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten
    case Jack, Queen, King
    
    func simpleDescription() -> String {
        switch self {
        case .Ace:
            return "ace"
        case .Jack:
            return "jack"
        case .Queen:
            return "queen"
        case .King:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
    
    func compare(other: Rank) -> Int {
        return self.rawValue - other.rawValue
    }
}
let ace = Rank.Ace
let aceRawValue = ace.rawValue
ace.compare(Rank.Jack)
if let convertedRank = Rank(rawValue: 3) {
    let threeDescription = convertedRank.simpleDescription()
}



enum Suit: Int {
    case Spades, Hearts, Diamonds, Clubs
    
    func simpleDescription() -> String {
        switch self {
        case .Spades:
            return "spades"
        case .Hearts:
            return "hearts"
        case .Diamonds:
            return "diamonds"
        case .Clubs:
            return "clubs"
        }
    }
    
    func color() -> String {
        switch self {
        case .Spades,.Clubs:
            return "black"
        case .Hearts,.Diamonds:
            return "red"
        }
    }
}
let hearts = Suit.Hearts
let heartsDescription = hearts.simpleDescription()
hearts.color()


struct Card {
    var rank: Rank
    var suit: Suit
    
    func simpleDescription() -> String {
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
    }
    
    func fullDeck() -> [Card] {
        var n = 1
        var deck: [Card] = [Card]()
        
        while let rank = Rank(rawValue: n) {
            var m = 0;
            while let suit = Suit(rawValue: m) {
                deck.append(Card(rank: rank, suit: suit))
                m += 1
            }
            n += 1
        }
        
        return deck
    }
}
let threeOfSpades = Card(rank: .Three, suit: .Spades)
let threeOfSpadesDescription = threeOfSpades.simpleDescription()
var cards: [Card] = threeOfSpades.fullDeck()
cards.count


enum ServerResponse {
    case Result(String, String)
    case Failure(String)
}

let success = ServerResponse.Result("6:00 am", "8:09 pm")
let failure = ServerResponse.Failure("Out of cheese.")

switch success {
case let .Result(sunrise, sunset):
    print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
case let .Failure(message):
    print("Failure... \(message)")
}






func repeatItem<Item>(item: Item, numberOfTimes: Int) -> [Item] {
    var result = [Item]()
    for _ in 0..<numberOfTimes {
        result.append(item)
    }
    
    return result
}
repeatItem("knock", numberOfTimes:4)


enum OptionalValue<Wrapped> {
    case None
    case Some(Wrapped)
}
var possibleInteger: OptionalValue<Int> = .None
possibleInteger = .Some(100)


func anyCommonElements <T: SequenceType, U: SequenceType where T.Generator.Element: Equatable,
    T.Generator.Element == U.Generator.Element> (lhs: T, _ rhs: U) -> Array<T.Generator.Element> {
    
    var common = Array<T.Generator.Element>()
    
    for lhsItem in lhs {
        for rhsItem in rhs {
            if lhsItem == rhsItem {
                common.append(lhsItem)
            }
        }
    }
    
    return common
}

anyCommonElements([1,2,3], [3,2])
